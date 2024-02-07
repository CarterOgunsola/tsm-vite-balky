import { Plane, Curtains } from "curtainsjs";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { lerp, clamp } from "../utils/math";

export default function setupCurtains() {
  const curtains = new Curtains({
    container: "canvas",
    pixelRatio: Math.min(1.5, window.devicePixelRatio), // Limit pixel ratio for performance
  });

  let planesDeformations = 0; // Track the planes' deformation
  let lastScrollTop = 0; // Track the last scroll position to determine scroll direction
  let targetDistortion = 0.0; // Target value for distortion effect

  curtains
    .onRender(() => {
      planesDeformations = lerp(planesDeformations, 0, 0.075);
      // Smoothly interpolate the distortion effect for each plane
      planes.forEach((plane) => {
        const currentDistortion = plane.uniforms.uDistortionAmount.value;
        plane.uniforms.uDistortionAmount.value = lerp(
          currentDistortion,
          targetDistortion,
          0.1,
        );
      });
    })
    .onError(() => {
      document.body.classList.add("no-curtains", "planes-loaded");
    })
    .onContextLost(() => {
      curtains.restoreContext();
    });

  const planeElements = document.querySelectorAll("[data-plane]");

  const params = {
    vertexShader: vertex,
    fragmentShader: fragment,
    widthSegments: 10,
    heightSegments: 10,
    fov: 45,
    uniforms: {
      planeDeformation: {
        name: "uPlaneDeformation",
        type: "1f",
        value: 0,
      },
      uTime: {
        name: "uTime",
        type: "1f",
        value: 0,
      },
      uDistortionAmount: {
        name: "uDistortionAmount",
        type: "1f",
        value: 0.0, // Initially no distortion
      },
    },
  };

  const planes = Array.from(planeElements).map((planeElement) => {
    const plane = new Plane(curtains, planeElement, params);

    plane
      .onReady(() => {
        document.body.classList.add("planes-loaded");
      })
      .onRender(() => {
        plane.uniforms.planeDeformation.value = planesDeformations;
        plane.uniforms.uTime.value += 0.01; // Increment time
      });

    return plane;
  });

  window.addEventListener(
    "scroll",
    () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      // Determine the scroll direction
      targetDistortion = st > lastScrollTop ? 0.005 : 0.0; // Apply distortion when scrolling down
      lastScrollTop = st <= 0 ? 0 : st; // Update last scroll position for next event

      // Existing logic for plane deformations based on scroll
      const delta = curtains.getScrollDeltas();
      delta.y = -delta.y;

      if (delta.y > 60) delta.y = 60;
      else if (delta.y < -60) delta.y = -60;

      if (Math.abs(delta.y) > Math.abs(planesDeformations)) {
        planesDeformations = lerp(planesDeformations, delta.y, 0.3);
      }
    },
    {
      passive: true,
    },
  );
}
