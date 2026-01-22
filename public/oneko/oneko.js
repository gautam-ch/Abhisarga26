// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let isManualSleep = false;
  let sleepStartTime = null;
  let tooltipAutoShowInterval = null;

  const nekoSpeed = 26;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function init() {
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    // Create custom tooltip - pure text only
    const tooltipEl = document.createElement("div");
    tooltipEl.id = "oneko-tooltip";
    tooltipEl.style.position = "fixed";
    tooltipEl.style.background = "none";
    tooltipEl.style.color = "rgba(255, 255, 255, 0.85)";
    tooltipEl.style.padding = "0";
    tooltipEl.style.fontSize = "12px";
    tooltipEl.style.fontFamily = "Arial, sans-serif";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "2147483648";
    tooltipEl.style.display = "none";
    tooltipEl.style.whiteSpace = "nowrap";
    tooltipEl.style.textTransform = "lowercase";
    tooltipEl.style.letterSpacing = "0";
    tooltipEl.style.fontWeight = "200";
    tooltipEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    tooltipEl.style.opacity = "0";
    tooltipEl.textContent = "Click me";

    document.body.appendChild(tooltipEl);

    let nekoFile = "./oneko.gif"
    const curScript = document.currentScript
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat
    }
    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    // Add hover handlers for tooltip
    nekoEl.addEventListener('mouseenter', () => {
      tooltipEl.style.display = "block";
      setTimeout(() => {
        tooltipEl.style.opacity = "1";
        tooltipEl.style.transform = "translateY(-5px)";
      }, 10);
    });

    nekoEl.addEventListener('mouseleave', () => {
      tooltipEl.style.opacity = "0";
      tooltipEl.style.transform = "translateY(0px)";
      setTimeout(() => {
        tooltipEl.style.display = "none";
      }, 300);
    });

    // Function to show tooltip automatically
    function showTooltipAuto() {
      tooltipEl.style.display = "block";
      setTimeout(() => {
        tooltipEl.style.opacity = "1";
        tooltipEl.style.transform = "translateY(-5px)";
      }, 10);
      
      // Hide after 3 seconds
      setTimeout(() => {
        tooltipEl.style.opacity = "0";
        tooltipEl.style.transform = "translateY(0px)";
        setTimeout(() => {
          tooltipEl.style.display = "none";
        }, 300);
      }, 3000);
    }

    // Add click handler for sleep toggle
    nekoEl.addEventListener('click', () => {
      isManualSleep = !isManualSleep;
      if (isManualSleep) {
        idleAnimation = 'sleeping';
        idleAnimationFrame = 8; // Start directly at sleeping animation
        idleTime = 0;
        tooltipEl.textContent = "Wake me up";
        sleepStartTime = Date.now();
        
        // Clear any existing interval
        if (tooltipAutoShowInterval) {
          clearInterval(tooltipAutoShowInterval);
        }
        
        // Show tooltip every minute when sleeping
        tooltipAutoShowInterval = setInterval(() => {
          if (isManualSleep) {
            showTooltipAuto();
          }
        }, 60000); // 60 seconds
        
      } else {
        idleAnimation = null;
        idleAnimationFrame = 0;
        idleTime = 0;
        tooltipEl.textContent = "Click me";
        sleepStartTime = null;
        
        // Clear the auto-show interval
        if (tooltipAutoShowInterval) {
          clearInterval(tooltipAutoShowInterval);
          tooltipAutoShowInterval = null;
        }
      }
    });

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      const tooltipEl = document.getElementById('oneko-tooltip');
      if (tooltipEl) {
        document.body.removeChild(tooltipEl);
      }
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp
      frame()
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function updateTooltipPosition() {
    const tooltipEl = document.getElementById('oneko-tooltip');
    if (tooltipEl && tooltipEl.style.opacity !== '0' && tooltipEl.style.display !== 'none') {
      const tooltipWidth = tooltipEl.offsetWidth || 100;
      const tooltipHeight = tooltipEl.offsetHeight || 35;
      
      let tooltipX = nekoPosX - tooltipWidth / 2;
      let tooltipY = nekoPosY - 16 - tooltipHeight - 10;
      
      // Keep tooltip on screen
      tooltipX = Math.max(10, Math.min(tooltipX, window.innerWidth - tooltipWidth - 10));
      tooltipY = Math.max(10, tooltipY);
      
      tooltipEl.style.left = `${tooltipX}px`;
      tooltipEl.style.top = `${tooltipY}px`;
    }
  }

  function idle() {
    idleTime += 1;

    // Update tooltip position when idle/sleeping
    updateTooltipPosition();

    // If manually set to sleeping, stay sleeping indefinitely
    if (isManualSleep && idleAnimation === 'sleeping') {
      setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
      idleAnimationFrame += 1;
      if (idleAnimationFrame > 100) {
        idleAnimationFrame = 8; // Loop the sleeping animation
      }
      return;
    }

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // If manually sleeping, don't follow mouse
    if (isManualSleep) {
      idle();
      return;
    }

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    // Update tooltip position
    updateTooltipPosition();
  }

  init();
})();
