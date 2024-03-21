// import { Transition } from "@unseenco/taxi";
import gsap from "gsap";

// export default class DefaultTransition extends Transition {
//   onLeave({ from, trigger, done }) {
//     // do something ...

//     gsap.to(from, {
//       opacity: 0,
//       scale: 0.95,
//       //y: "-=100vh",
//       duration: 0.45,
//       ease: "sine.inOut",
//       onComplete: done,
//     });

//     // done();
//   }

//   onEnter({ to, trigger, done }) {
//     // do something else ...

//     gsap.from(to, {
//       y: "100vh",
//       duration: 1.2,
//       opacity: 0,
//       ease: "expo.out",
//       onComplete: done,
//     });
//     // done();
//   }
// }

export const enterTransition = (to, done) => {
  // console.log(to);
  gsap.from(to, {
    y: "100vh",
    duration: 1.2,
    // opacity: 0,
    ease: "expo.out",
    onComplete: done,
  });
};

export const leaveTransition = (from, done) => {
  gsap.to(from, {
    opacity: 0,
    scale: 0.95,
    //y: "-=100vh",
    duration: 0.45,
    ease: "sine.inOut",
    onComplete: done,
  });
};
