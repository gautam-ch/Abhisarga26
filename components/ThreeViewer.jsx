"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeViewer({ model }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // rely on CSS responsive heights; fallbacks handled below

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.3, 4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    // Initial renderer size from container; renderer will be updated by ResizeObserver
    const width = container.clientWidth || container.getBoundingClientRect().width || 800;
    const height = container.clientHeight || container.getBoundingClientRect().height || 520;
    renderer.setSize(width, height);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08; // smooth damping
    controls.enablePan = false;
    controls.screenSpacePanning = false;
    controls.rotateSpeed = 0.8;

    const loader = new GLTFLoader();
    let meshRef = null;
    let reqId = null;

    loader.load(
      model,
      (gltf) => {
        const mesh = gltf.scene;
        meshRef = mesh;

        // gentle default scale
        mesh.scale.set(4.2, 4.2, 4.2);
        mesh.rotation.y = Math.PI;

        // center model and adjust camera based on bounding box
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // recenter mesh to origin
        mesh.position.x -= center.x;
        mesh.position.y -= center.y;
        mesh.position.z -= center.z;

        // raise slightly so it's not clipping into floor
        mesh.position.y += size.y * 0.25;

        scene.add(mesh);

        // adjust camera to fit model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.6; // back off a little
        camera.position.set(0, size.y * 0.6, cameraZ + 1);
        camera.lookAt(0, 0, 0);

        // Lock vertical rotation completely (no tilt) so users can only rotate horizontally
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;

        // Limit zoom to a small range relative to the computed camera distance
        const camDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
        controls.minDistance = camDistance * 0.85; // slight zoom in
        controls.maxDistance = camDistance * 1.35; // slight zoom out

        function animate() {
          reqId = requestAnimationFrame(animate);
          if (meshRef) meshRef.rotation.y += 0.003;
          controls.update();
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("GLTF load error:", error);
        const err = document.createElement("div");
        err.style.color = "#ff6b6b";
        err.style.padding = "12px";
        err.innerText = "Model failed to load";
        container.appendChild(err);
      }
    );

    // Use ResizeObserver to react to container size changes (better for responsive layouts)
    const resize = () => {
      const w = container.clientWidth || container.getBoundingClientRect().width || width;
      const h = container.clientHeight || container.getBoundingClientRect().height || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    };

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      if (reqId) cancelAnimationFrame(reqId);
      controls.dispose();
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [model]);

  return <div ref={mountRef} className="viewer-container h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] w-full overflow-hidden"></div>;
}
