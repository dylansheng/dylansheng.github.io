/**
 * Homepage navigation behavior.
 */
(function () {
  /* Quiet, translucent leaf field behind the page. */
  var leafCanvas = document.getElementById("leaf-field");
  if (leafCanvas) {
    var leafContext = leafCanvas.getContext("2d");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var leafPalette = [
      "rgba(64, 112, 87, 0.13)",
      "rgba(49, 93, 128, 0.10)",
      "rgba(151, 118, 62, 0.09)",
    ];
    var leaves = [];
    var leafWidth = 0;
    var leafHeight = 0;
    var lastLeafFrame = 0;

    function makeLeaf(initial) {
      var size = 6 + Math.random() * 8;
      return {
        x: Math.random() * leafWidth,
        y: initial ? Math.random() * leafHeight : -size * 2,
        size: size,
        speed: 0.12 + Math.random() * 0.16,
        wind: -0.025 + Math.random() * 0.05,
        drift: 8 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        spin: (-0.004 + Math.random() * 0.008),
        color: leafPalette[Math.floor(Math.random() * leafPalette.length)],
      };
    }

    function resizeLeafField() {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      leafWidth = window.innerWidth;
      leafHeight = window.innerHeight;
      leafCanvas.width = Math.round(leafWidth * ratio);
      leafCanvas.height = Math.round(leafHeight * ratio);
      leafContext.setTransform(ratio, 0, 0, ratio, 0, 0);

      var leafCount = Math.max(8, Math.min(18, Math.round(leafWidth / 90)));
      leaves = [];
      for (var i = 0; i < leafCount; i++) leaves.push(makeLeaf(true));
    }

    function paintLeaf(leaf) {
      var drawX = leaf.x + Math.sin(leaf.phase) * leaf.drift;
      var size = leaf.size;

      leafContext.save();
      leafContext.translate(drawX, leaf.y);
      leafContext.rotate(leaf.rotation);
      leafContext.scale(0.62, 1);
      leafContext.fillStyle = leaf.color;
      leafContext.beginPath();
      leafContext.moveTo(0, -size);
      leafContext.bezierCurveTo(size * 0.9, -size * 0.45, size * 0.8, size * 0.5, 0, size);
      leafContext.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.9, -size * 0.45, 0, -size);
      leafContext.fill();
      leafContext.strokeStyle = leaf.color;
      leafContext.lineWidth = 0.65;
      leafContext.beginPath();
      leafContext.moveTo(0, -size * 0.72);
      leafContext.lineTo(0, size * 0.76);
      leafContext.stroke();
      leafContext.restore();
    }

    function renderLeafField(time) {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      leafContext.setTransform(1, 0, 0, 1, 0, 0);
      leafContext.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
      leafContext.setTransform(ratio, 0, 0, ratio, 0, 0);

      var step = lastLeafFrame ? Math.min((time - lastLeafFrame) / 16.67, 2) : 1;
      lastLeafFrame = time;

      leaves.forEach(function (leaf) {
        if (!reducedMotion) {
          leaf.y += leaf.speed * step;
          leaf.x += leaf.wind * step;
          leaf.phase += 0.008 * step;
          leaf.rotation += leaf.spin * step;

          if (leaf.y > leafHeight + leaf.size * 2 || leaf.x < -50 || leaf.x > leafWidth + 50) {
            Object.assign(leaf, makeLeaf(false));
          }
        }
        paintLeaf(leaf);
      });

      if (!reducedMotion) window.requestAnimationFrame(renderLeafField);
    }

    resizeLeafField();
    window.addEventListener("resize", resizeLeafField, { passive: true });
    window.requestAnimationFrame(renderLeafField);
  }

  /* Nav scroll-spy */
  var nav = document.querySelector(".site-nav");
  if (!nav) return;

  var MORE_IDS = {
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

  /* Publications filtering */
  var filter = document.querySelector(".publication-filter");
  if (filter) {
    var filterButtons = filter.querySelectorAll("[data-publication-filter]");
    var publicationItems = document.querySelectorAll(".publication-item[data-paper-role]");

    function applyPublicationFilter(role) {
      publicationItems.forEach(function (item) {
        item.hidden = role !== "all" && item.getAttribute("data-paper-role") !== role;
      });

      filterButtons.forEach(function (button) {
        var active = button.getAttribute("data-publication-filter") === role;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyPublicationFilter(button.getAttribute("data-publication-filter"));
      });
    });
  }
})();
