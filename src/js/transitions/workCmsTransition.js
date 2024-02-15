import { gsap } from "gsap";

export const workCmsTransition = {
  leave(data) {
    return gsap.to(data.current.container, {
      opacity: 0,
    });
  },
  enter(data) {
    return gsap.from(data.next.container, {
      opacity: 0,
    });
  },
};