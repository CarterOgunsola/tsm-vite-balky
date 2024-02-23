import { Transition } from "@unseenco/taxi";
import gsap from "gsap";

export default class DefaultTransition extends Transition {
  onLeave({ from, trigger, done }) {
    // do something ...

    gsap.to(from, {
      opacity: 0,
      onComplete: done,
    });

    // done();
  }

  onEnter({ to, trigger, done }) {
    // do something else ...

    gsap.from(to, {
      y: "100vh",
      duration: 1,
      onComplete: done,
    });
    // done();
  }
}
