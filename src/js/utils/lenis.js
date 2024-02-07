(() => {
  function M() {
    return (
      (M = Object.assign
        ? Object.assign.bind()
        : function (n) {
            for (var t = 1; t < arguments.length; t++) {
              var e = arguments[t];
              for (var i in e)
                Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
            }
            return n;
          }),
      M.apply(this, arguments)
    );
  }

  function b(n, t, e) {
    return Math.max(n, Math.min(t, e));
  }
  var L = class {
      advance(t) {
        var e;
        if (!this.isRunning) return;
        let i = !1;
        if (this.lerp)
          (this.value =
            ((o = this.value),
            (s = this.to),
            (1 - (l = 1 - Math.exp(-60 * this.lerp * t))) * o + l * s)),
            Math.round(this.value) === this.to &&
              ((this.value = this.to), (i = !0));
        else {
          this.currentTime += t;
          let r = b(0, this.currentTime / this.duration, 1);
          i = r >= 1;
          let h = i ? 1 : this.easing(r);
          this.value = this.from + (this.to - this.from) * h;
        }
        var o, s, l;
        (e = this.onUpdate) == null || e.call(this, this.value, i),
          i && this.stop();
      }
      stop() {
        this.isRunning = !1;
      }
      fromTo(
        t,
        e,
        {
          lerp: i = 0.1,
          duration: o = 1,
          easing: s = (h) => h,
          onStart: l,
          onUpdate: r,
        },
      ) {
        (this.from = this.value = t),
          (this.to = e),
          (this.lerp = i),
          (this.duration = o),
          (this.easing = s),
          (this.currentTime = 0),
          (this.isRunning = !0),
          l == null || l(),
          (this.onUpdate = r);
      }
    },
    _ = class {
      constructor({ wrapper: t, content: e, autoResize: i = !0 } = {}) {
        if (
          ((this.resize = () => {
            this.onWrapperResize(), this.onContentResize();
          }),
          (this.onWrapperResize = () => {
            this.wrapper === window
              ? ((this.width = window.innerWidth),
                (this.height = window.innerHeight))
              : ((this.width = this.wrapper.clientWidth),
                (this.height = this.wrapper.clientHeight));
          }),
          (this.onContentResize = () => {
            (this.scrollHeight = this.content.scrollHeight),
              (this.scrollWidth = this.content.scrollWidth);
          }),
          (this.wrapper = t),
          (this.content = e),
          i)
        ) {
          let o = (function (s, l) {
            let r;
            return function () {
              let h = arguments,
                u = this;
              clearTimeout(r),
                (r = setTimeout(function () {
                  s.apply(u, h);
                }, 250));
            };
          })(this.resize);
          this.wrapper !== window &&
            ((this.wrapperResizeObserver = new ResizeObserver(o)),
            this.wrapperResizeObserver.observe(this.wrapper)),
            (this.contentResizeObserver = new ResizeObserver(o)),
            this.contentResizeObserver.observe(this.content);
        }
        this.resize();
      }
      destroy() {
        var t, e;
        (t = this.wrapperResizeObserver) == null || t.disconnect(),
          (e = this.contentResizeObserver) == null || e.disconnect();
      }
      get limit() {
        return {
          x: this.scrollWidth - this.width,
          y: this.scrollHeight - this.height,
        };
      }
    },
    z = class {
      constructor() {
        this.events = {};
      }
      emit(t, ...e) {
        let i = this.events[t] || [];
        for (let o = 0, s = i.length; o < s; o++) i[o](...e);
      }
      on(t, e) {
        var i;
        return (
          ((i = this.events[t]) != null && i.push(e)) || (this.events[t] = [e]),
          () => {
            var o;
            this.events[t] =
              (o = this.events[t]) == null ? void 0 : o.filter((s) => e !== s);
          }
        );
      }
      off(t, e) {
        var i;
        this.events[t] =
          (i = this.events[t]) == null ? void 0 : i.filter((o) => e !== o);
      }
      destroy() {
        this.events = {};
      }
    },
    R = class {
      constructor(
        t,
        {
          wheelMultiplier: e = 1,
          touchMultiplier: i = 2,
          normalizeWheel: o = !1,
        },
      ) {
        (this.onTouchStart = (s) => {
          let { clientX: l, clientY: r } = s.targetTouches
            ? s.targetTouches[0]
            : s;
          (this.touchStart.x = l),
            (this.touchStart.y = r),
            (this.lastDelta = {
              x: 0,
              y: 0,
            });
        }),
          (this.onTouchMove = (s) => {
            let { clientX: l, clientY: r } = s.targetTouches
                ? s.targetTouches[0]
                : s,
              h = -(l - this.touchStart.x) * this.touchMultiplier,
              u = -(r - this.touchStart.y) * this.touchMultiplier;
            (this.touchStart.x = l),
              (this.touchStart.y = r),
              (this.lastDelta = {
                x: h,
                y: u,
              }),
              this.emitter.emit("scroll", {
                deltaX: h,
                deltaY: u,
                event: s,
              });
          }),
          (this.onTouchEnd = (s) => {
            this.emitter.emit("scroll", {
              deltaX: this.lastDelta.x,
              deltaY: this.lastDelta.y,
              event: s,
            });
          }),
          (this.onWheel = (s) => {
            let { deltaX: l, deltaY: r } = s;
            this.normalizeWheel &&
              ((l = b(-100, l, 100)), (r = b(-100, r, 100))),
              (l *= this.wheelMultiplier),
              (r *= this.wheelMultiplier),
              this.emitter.emit("scroll", {
                deltaX: l,
                deltaY: r,
                event: s,
              });
          }),
          (this.element = t),
          (this.wheelMultiplier = e),
          (this.touchMultiplier = i),
          (this.normalizeWheel = o),
          (this.touchStart = {
            x: null,
            y: null,
          }),
          (this.emitter = new z()),
          this.element.addEventListener("wheel", this.onWheel, {
            passive: !1,
          }),
          this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1,
          }),
          this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1,
          }),
          this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1,
          });
      }
      on(t, e) {
        return this.emitter.on(t, e);
      }
      destroy() {
        this.emitter.destroy(),
          this.element.removeEventListener("wheel", this.onWheel, {
            passive: !1,
          }),
          this.element.removeEventListener("touchstart", this.onTouchStart, {
            passive: !1,
          }),
          this.element.removeEventListener("touchmove", this.onTouchMove, {
            passive: !1,
          }),
          this.element.removeEventListener("touchend", this.onTouchEnd, {
            passive: !1,
          });
      }
    },
    E = class {
      constructor({
        wrapper: t = window,
        content: e = document.documentElement,
        wheelEventsTarget: i = t,
        eventsTarget: o = i,
        smoothWheel: s = !0,
        smoothTouch: l = !1,
        syncTouch: r = !1,
        syncTouchLerp: h = 0.1,
        __iosNoInertiaSyncTouchLerp: u = 0.4,
        touchInertiaMultiplier: v = 35,
        duration: f,
        easing: a = (c) => Math.min(1, 1.001 - Math.pow(2, -10 * c)),
        lerp: p = !f && 0.1,
        infinite: y = !1,
        orientation: N = "vertical",
        gestureOrientation: X = "vertical",
        touchMultiplier: A = 1,
        wheelMultiplier: C = 1,
        normalizeWheel: O = !1,
        autoResize: W = !0,
      } = {}) {
        (this.onVirtualScroll = ({ deltaX: c, deltaY: g, event: d }) => {
          if (d.ctrlKey) return;
          let S = d.type.includes("touch"),
            k = d.type.includes("wheel");
          if (
            (this.options.gestureOrientation === "both" &&
              c === 0 &&
              g === 0) ||
            (this.options.gestureOrientation === "vertical" && g === 0) ||
            (this.options.gestureOrientation === "horizontal" && c === 0) ||
            (S &&
              this.options.gestureOrientation === "vertical" &&
              this.scroll === 0 &&
              !this.options.infinite &&
              g <= 0)
          )
            return;
          let T = d.composedPath();
          if (
            ((T = T.slice(0, T.indexOf(this.rootElement))),
            T.find((m) => {
              var q;
              return (
                (m.hasAttribute == null
                  ? void 0
                  : m.hasAttribute("data-lenis-prevent")) ||
                (S &&
                  (m.hasAttribute == null
                    ? void 0
                    : m.hasAttribute("data-lenis-prevent-touch"))) ||
                (k &&
                  (m.hasAttribute == null
                    ? void 0
                    : m.hasAttribute("data-lenis-prevent-wheel"))) ||
                ((q = m.classList) == null ? void 0 : q.contains("lenis"))
              );
            }))
          )
            return;
          if (this.isStopped || this.isLocked) return void d.preventDefault();
          if (
            ((this.isSmooth =
              ((this.options.smoothTouch || this.options.syncTouch) && S) ||
              (this.options.smoothWheel && k)),
            !this.isSmooth)
          )
            return (this.isScrolling = !1), void this.animate.stop();
          d.preventDefault();
          let w = g;
          this.options.gestureOrientation === "both"
            ? (w = Math.abs(g) > Math.abs(c) ? g : c)
            : this.options.gestureOrientation === "horizontal" && (w = c);
          let F = S && this.options.syncTouch,
            H = S && d.type === "touchend" && Math.abs(w) > 1;
          H && (w = this.velocity * this.options.touchInertiaMultiplier),
            this.scrollTo(
              this.targetScroll + w,
              M(
                {
                  programmatic: !1,
                },
                F && {
                  lerp: H
                    ? this.syncTouchLerp
                    : this.options.__iosNoInertiaSyncTouchLerp,
                },
              ),
            );
        }),
          (this.onScroll = () => {
            if (!this.isScrolling) {
              let c = this.animatedScroll;
              (this.animatedScroll = this.targetScroll = this.actualScroll),
                (this.velocity = 0),
                (this.direction = Math.sign(this.animatedScroll - c)),
                this.emit();
            }
          }),
          (window.lenisVersion = "1.0.27"),
          (t !== document.documentElement && t !== document.body) ||
            (t = window),
          (this.options = {
            wrapper: t,
            content: e,
            wheelEventsTarget: i,
            eventsTarget: o,
            smoothWheel: s,
            smoothTouch: l,
            syncTouch: r,
            syncTouchLerp: h,
            __iosNoInertiaSyncTouchLerp: u,
            touchInertiaMultiplier: v,
            duration: f,
            easing: a,
            lerp: p,
            infinite: y,
            gestureOrientation: X,
            orientation: N,
            touchMultiplier: A,
            wheelMultiplier: C,
            normalizeWheel: O,
            autoResize: W,
          }),
          (this.animate = new L()),
          (this.emitter = new z()),
          (this.dimensions = new _({
            wrapper: t,
            content: e,
            autoResize: W,
          })),
          this.toggleClass("lenis", !0),
          (this.velocity = 0),
          (this.isLocked = !1),
          (this.isStopped = !1),
          (this.isSmooth = r || s || l),
          (this.isScrolling = !1),
          (this.targetScroll = this.animatedScroll = this.actualScroll),
          this.options.wrapper.addEventListener("scroll", this.onScroll, {
            passive: !1,
          }),
          (this.virtualScroll = new R(o, {
            touchMultiplier: A,
            wheelMultiplier: C,
            normalizeWheel: O,
          })),
          this.virtualScroll.on("scroll", this.onVirtualScroll);
      }
      destroy() {
        this.emitter.destroy(),
          this.options.wrapper.removeEventListener("scroll", this.onScroll, {
            passive: !1,
          }),
          this.virtualScroll.destroy(),
          this.dimensions.destroy(),
          this.toggleClass("lenis", !1),
          this.toggleClass("lenis-smooth", !1),
          this.toggleClass("lenis-scrolling", !1),
          this.toggleClass("lenis-stopped", !1),
          this.toggleClass("lenis-locked", !1);
      }
      on(t, e) {
        return this.emitter.on(t, e);
      }
      off(t, e) {
        return this.emitter.off(t, e);
      }
      setScroll(t) {
        this.isHorizontal
          ? (this.rootElement.scrollLeft = t)
          : (this.rootElement.scrollTop = t);
      }
      resize() {
        this.dimensions.resize();
      }
      emit() {
        this.emitter.emit("scroll", this);
      }
      reset() {
        (this.isLocked = !1),
          (this.isScrolling = !1),
          (this.velocity = 0),
          this.animate.stop();
      }
      start() {
        (this.isStopped = !1), this.reset();
      }
      stop() {
        (this.isStopped = !0), this.animate.stop(), this.reset();
      }
      raf(t) {
        let e = t - (this.time || t);
        (this.time = t), this.animate.advance(0.001 * e);
      }
      scrollTo(
        t,
        {
          offset: e = 0,
          immediate: i = !1,
          lock: o = !1,
          duration: s = this.options.duration,
          easing: l = this.options.easing,
          lerp: r = !s && this.options.lerp,
          onComplete: h = null,
          force: u = !1,
          programmatic: v = !0,
        } = {},
      ) {
        if ((!this.isStopped && !this.isLocked) || u) {
          if (["top", "left", "start"].includes(t)) t = 0;
          else if (["bottom", "right", "end"].includes(t)) t = this.limit;
          else {
            var f;
            let a;
            if (
              (typeof t == "string"
                ? (a = document.querySelector(t))
                : (f = t) != null && f.nodeType && (a = t),
              a)
            ) {
              if (this.options.wrapper !== window) {
                let y = this.options.wrapper.getBoundingClientRect();
                e -= this.isHorizontal ? y.left : y.top;
              }
              let p = a.getBoundingClientRect();
              t = (this.isHorizontal ? p.left : p.top) + this.animatedScroll;
            }
          }
          if (typeof t == "number") {
            if (
              ((t += e),
              (t = Math.round(t)),
              this.options.infinite
                ? v && (this.targetScroll = this.animatedScroll = this.scroll)
                : (t = b(0, t, this.limit)),
              i)
            )
              return (
                (this.animatedScroll = this.targetScroll = t),
                this.setScroll(this.scroll),
                this.reset(),
                void (h == null || h(this))
              );
            if (!v) {
              if (t === this.targetScroll) return;
              this.targetScroll = t;
            }
            this.animate.fromTo(this.animatedScroll, t, {
              duration: s,
              easing: l,
              lerp: r,
              onStart: () => {
                o && (this.isLocked = !0), (this.isScrolling = !0);
              },
              onUpdate: (a, p) => {
                (this.isScrolling = !0),
                  (this.velocity = a - this.animatedScroll),
                  (this.direction = Math.sign(this.velocity)),
                  (this.animatedScroll = a),
                  this.setScroll(this.scroll),
                  v && (this.targetScroll = a),
                  p || this.emit(),
                  p &&
                    requestAnimationFrame(() => {
                      this.reset(), this.emit(), h == null || h(this);
                    });
              },
            });
          }
        }
      }
      get rootElement() {
        return this.options.wrapper === window
          ? this.options.content
          : this.options.wrapper;
      }
      get limit() {
        return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
      }
      get isHorizontal() {
        return this.options.orientation === "horizontal";
      }
      get actualScroll() {
        return this.isHorizontal
          ? this.rootElement.scrollLeft
          : this.rootElement.scrollTop;
      }
      get scroll() {
        return this.options.infinite
          ? ((this.animatedScroll % (t = this.limit)) + t) % t
          : this.animatedScroll;
        var t;
      }
      get progress() {
        return this.limit === 0 ? 1 : this.scroll / this.limit;
      }
      get isSmooth() {
        return this.__isSmooth;
      }
      set isSmooth(t) {
        this.__isSmooth !== t &&
          ((this.__isSmooth = t), this.toggleClass("lenis-smooth", t));
      }
      get isScrolling() {
        return this.__isScrolling;
      }
      set isScrolling(t) {
        this.__isScrolling !== t &&
          ((this.__isScrolling = t), this.toggleClass("lenis-scrolling", t));
      }
      get isStopped() {
        return this.__isStopped;
      }
      set isStopped(t) {
        this.__isStopped !== t &&
          ((this.__isStopped = t), this.toggleClass("lenis-stopped", t));
      }
      get isLocked() {
        return this.__isLocked;
      }
      set isLocked(t) {
        this.__isLocked !== t &&
          ((this.__isLocked = t), this.toggleClass("lenis-locked", t));
      }
      get className() {
        let t = "lenis";
        return (
          this.isStopped && (t += " lenis-stopped"),
          this.isLocked && (t += " lenis-locked"),
          this.isScrolling && (t += " lenis-scrolling"),
          this.isSmooth && (t += " lenis-smooth"),
          t
        );
      }
      toggleClass(t, e) {
        this.rootElement.classList.toggle(t, e),
          this.emitter.emit("className change", this);
      }
    };

  function Y(n) {
    let t = document.createElement("style");
    (t.textContent = n), document.head.append(t);
  }

  function D(n = null) {
    return Webflow.env("editor") !== void 0
      ? (n !== null && n(), console.log("Webflow Editor View"), !0)
      : !1;
  }

  function j(n) {
    return /^(\s*[(]?[a-zA-Z0-9\s,]*[)]?\s*=>\s*{?\s*[\s\S]*}?)/.test(n);
  }

  function I(n, t = {}) {
    let e = document.querySelector(n);
    if (!e) return { ...t };
    let i = { ...e.dataset };
    for (let o in i) {
      let s = i[o];
      s === "" ||
        s === " " ||
        (isNaN(s)
          ? s === "true" || s === "false"
            ? s === "true"
              ? (i[o] = !0)
              : (i[o] = !1)
            : j(s)
              ? (i[o] = new Function(`return ${s};`)())
              : (i[o] = s)
          : (i[o] = +s));
    }
    return { ...t, ...i };
  }
  var Q = Y(`
  .lenis.lenis-smooth {
    scroll-behavior: auto;  
  }
  html.lenis {
    height: auto;
  }
`),
    x = class extends E {
      constructor(t) {
        t.selector &&
          ((t.wrapper = document.querySelector(t.selector)),
          t.wrapper && (t.content = t.wrapper.children[0])),
          console.log(t),
          super(t),
          (this.params = t),
          (this.isActive = !0),
          this.init(),
          (this.call = {
            stop: () => this.stop(),
            start: () => this.start(),
          });
      }
      init() {
        this.config(),
          this.render(),
          this.params.useRaf &&
            ((this.y = window.scrollY),
            (this.max = window.innerHeight),
            (this.speed = 0),
            (this.percent =
              this.y / (document.body.scrollHeight - window.innerHeight)),
            (this.direction = 0),
            this.on("scroll", (t) => this.outScroll(t))),
          D(this.destroy.bind(this));
      }
      config() {
        this.params.useAnchor &&
          [...document.querySelectorAll("[data-scrolllink]")].forEach((t) => {
            let e = document.querySelector(t.dataset.scrolllink);
            e &&
              t.addEventListener(
                "click",
                (i) => {
                  i.preventDefault(), this.scrollTo(e);
                },
                {
                  passive: !1,
                },
              );
          }),
          this.params.useOverscroll &&
            [
              ...document.querySelectorAll('[data-scroll="overscroll"]'),
            ].forEach((t) =>
              t.setAttribute("onwheel", "event.stopPropagation()"),
            ),
          this.params.useControls &&
            ([...document.querySelectorAll('[data-scroll="stop"]')].forEach(
              (t) => {
                t.onclick = () => {
                  this.stop(), (this.isActive = !1);
                };
              },
            ),
            [...document.querySelectorAll('[data-scroll="start"]')].forEach(
              (t) => {
                t.onclick = () => {
                  this.start(), (this.isActive = !0);
                };
              },
            ),
            [...document.querySelectorAll('[data-scroll="toggle"]')].forEach(
              (t) => {
                t.onclick = () => {
                  this.isActive
                    ? (this.stop(), (this.isActive = !1))
                    : (this.start(), (this.isActive = !0));
                };
              },
            ));
      }
      render(t) {
        this.raf(t), window.requestAnimationFrame(this.render.bind(this));
      }
      outScroll({
        scroll: t,
        limit: e,
        velocity: i,
        progress: o,
        direction: s,
      }) {
        (this.y = t || 0),
          (this.max = e || window.innerHeight),
          (this.speed = i || 0),
          (this.percent = o || 0),
          (this.direction = 0),
          this.params.useRaf &&
            window.dispatchEvent(
              new CustomEvent("sscroll", {
                detail: {
                  y: this.y,
                  max: this.max,
                  speed: this.speed,
                  percent: this.percent,
                  direction: this.direction,
                },
              }),
            );
      }
      renderWebflow(t) {}
    },
    U = I("[data-id-scroll]", {
      wrapper: window,
      duration: 1.5,
      easing: (n) => (n === 1 ? 1 : 1 - Math.pow(2, -10 * n)),
      orientation: "vertical",
      smoothWheel: !0,
      smoothTouch: !1,
      touchMultiplier: 1.5,
      infinite: !1,
      useOverscroll: !0,
      useControls: !0,
      useAnchor: !0,
      useRaf: !0,
    });
  window.SScroll = new x(U);
})();

export const SScroll = window.SScroll;
