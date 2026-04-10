/**
 * Starfield background + scroll-reveal + nav active state (homepage only).
 */
(function () {
  /* Fluorescent particle field (canvas, optional) */
  var canvas = document.getElementById("starfield");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ctx = canvas.getContext("2d");
    var stars = [];
    var w = 0;
    var h = 0;

    function prefersDark() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function makeStar() {
      var t = Math.random();
      var sizeClass = t < 0.5 ? "fine" : t < 0.88 ? "mid" : "glow";
      var base =
        sizeClass === "fine"
          ? 0.4 + Math.random() * 0.55
          : sizeClass === "mid"
            ? 0.85 + Math.random() * 0.75
            : 1.35 + Math.random() * 1.25;
      var hue = Math.random();
      var u = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: base,
        vx: (Math.random() - 0.5) * (sizeClass === "fine" ? 0.14 : 0.09),
        vy: (Math.random() - 0.5) * (sizeClass === "fine" ? 0.14 : 0.09),
        tw: Math.random() * Math.PI * 2,
        sp: 0.01 + Math.random() * 0.022,
        hue: hue,
        sizeClass: sizeClass,
        alphaBase: 0.12 + Math.pow(u, 1.35) * 0.78,
        twPhase: Math.random() * Math.PI * 2,
        twSpeed: 0.75 + Math.random() * 0.65,
      };
    }

    function rgbFor(s, dark) {
      var u = s.hue;
      if (dark) {
        return {
          r: Math.floor(70 + u * 80),
          g: Math.floor(190 + u * 55),
          b: 255,
        };
      }
      return {
        r: Math.floor(6 + u * 25),
        g: Math.floor(115 + u * 55),
        b: Math.floor(155 + u * 45),
      };
    }

    function drawFluorescent(s, dark) {
      var c = rgbFor(s, dark);
      var rgb = c.r + ", " + c.g + ", " + c.b;
      var t = s.tw * s.twSpeed + s.twPhase;
      var twinkle = 0.38 + 0.62 * (0.5 + 0.5 * Math.sin(t));
      var shimmer = 0.92 + 0.08 * Math.sin(t * 1.7 + s.hue * 3);
      var amp = s.alphaBase * twinkle * shimmer;
      var pulse2 = 0.88 + 0.12 * Math.sin(t * 1.1 + s.hue * 4);
      var glowMul = s.sizeClass === "glow" ? 6.5 : s.sizeClass === "mid" ? 4.6 : 3;
      var glowR = s.r * glowMul * pulse2;
      var x = s.x;
      var y = s.y;

      var g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      var baseGlow = dark ? 0.52 : 0.4;
      var baseHalo = dark ? 0.16 : 0.11;
      var a0 = baseGlow * amp;
      var a1 = baseHalo * amp;
      g.addColorStop(0, "rgba(" + rgb + "," + a0 + ")");
      g.addColorStop(0.38, "rgba(" + rgb + "," + a1 + ")");
      g.addColorStop(0.68, "rgba(" + rgb + "," + (a1 * 0.32) + ")");
      g.addColorStop(1, "rgba(" + rgb + ",0)");

      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      var coreR = s.r * (s.sizeClass === "fine" ? 0.72 : 0.62);
      var coreA = (dark ? 0.88 : 0.75) * amp * (0.55 + 0.45 * twinkle);
      ctx.beginPath();
      ctx.arc(x, y, coreR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + rgb + "," + coreA + ")";
      ctx.fill();
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      var cap = Math.min(300, Math.floor((w * h) / 3000));
      if (stars.length !== cap) {
        stars = [];
        for (var i = 0; i < cap; i++) {
          stars.push(makeStar());
        }
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      var dark = prefersDark();
      for (var j = 0; j < stars.length; j++) {
        var s = stars[j];
        s.x += s.vx;
        s.y += s.vy;
        s.tw += s.sp;
        if (s.x < -20) s.x += w + 40;
        if (s.x > w + 20) s.x -= w + 40;
        if (s.y < -20) s.y += h + 40;
        if (s.y > h + 20) s.y -= h + 40;
        drawFluorescent(s, dark);
      }
      requestAnimationFrame(step);
    }

    window.addEventListener("resize", function () {
      resize();
    });
    resize();
    step();
  } else if (canvas) {
    canvas.style.display = "none";
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(
    ".academic-home section h2, .academic-home section .publications, .academic-home ul.news-timeline"
  );
  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add("home-reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("home-reveal--visible");
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* Nav scroll-spy */
  var nav = document.querySelector(".site-nav");
  if (!nav) return;

  var MORE_IDS = {
    "ongoing-work": true,
    "upcoming-publications": true,
    "up-publications": true,
    collaborations: true,
    projects: true,
    services: true,
  };

  var links = nav.querySelectorAll('a[href^="#"]');
  var ids = [];
  links.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (id) ids.push(id);
  });

  var moreEl = nav.querySelector(".site-nav-more");
  if (moreEl) {
    var panelLinks = moreEl.querySelectorAll(".site-nav-more-panel a[href^='#']");
    panelLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        moreEl.removeAttribute("open");
      });
    });
  }

  function current() {
    var y = window.scrollY + 110;
    var best = null;
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      var top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= y) best = ids[i];
    }
    return best || ids[0] || null;
  }

  function paint() {
    var cur = current();
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      a.classList.toggle("is-active", id === cur);
    });
    if (moreEl) {
      moreEl.classList.toggle("has-active-child", !!(cur && MORE_IDS[cur]));
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          paint();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  paint();
})();
