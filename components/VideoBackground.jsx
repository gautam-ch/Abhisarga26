"use client";

export default function VideoBackground() {
  return (
    <video id="bg-video" autoPlay muted loop playsInline>
      <source src="/video/background.mp4" type="video/mp4" />
    </video>
  );
}
