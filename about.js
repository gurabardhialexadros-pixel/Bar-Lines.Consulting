/* ── ABOUT PAGE SCRIPTS ── */
window.addEventListener('load', function () {

  /* ── Hero animate in immediately ── */
  var hero = document.querySelector('.about-hero');
  if (hero) {
    setTimeout(function () { hero.classList.add('visible'); }, 100);
  }

  /* ── Scroll-triggered reveals ── */
  function onScroll() {

    /* Team members fade up */
    document.querySelectorAll('.team-member').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });

    /* Footer lockup */
    var lockup = document.getElementById('footerLockup');
    if (lockup && lockup.getBoundingClientRect().top < window.innerHeight * 0.88) {
      lockup.classList.add('visible');
    }

    /* Word fill */
    updateWordFill(document.getElementById('fillTextAbout'));
  }

  /* ── Stats count-up ── */
  var statsDone = false;
  function tryCountUp() {
    var statsEl = document.getElementById('aboutStats');
    if (!statsEl || statsDone) return;
    if (statsEl.getBoundingClientRect().top < window.innerHeight * 0.85) {
      statsDone = true;
      document.querySelectorAll('.stat-number').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (target === 0) return; /* "0 Compromises" stays at 0 */
        var start = 0;
        var duration = 1400;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }
  }

  window.addEventListener('scroll', function () {
    onScroll();
    tryCountUp();
  }, { passive: true });

  onScroll();
  tryCountUp();
});
