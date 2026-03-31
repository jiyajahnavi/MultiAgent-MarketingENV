document.addEventListener("DOMContentLoaded", () => {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      background: {
        color: { value: "transparent" },
      },
      particles: {
        color: { value: "#22d3ee" },
        links: {
          color: "#22d3ee",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: { enable: true, area: 1000 },
          value: 50,
        },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    });
});
