/* ── SERVICES PAGE ── */
window.addEventListener('load', function () {

  /* ── Hero ── */
  var hero = document.querySelector('.srv-hero');
  if (hero) setTimeout(function () { hero.classList.add('visible'); }, 100);

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Overview cards scroll fill ──
     Section enters view → cards fill left to right, staggered */
  var ovCards   = Array.from(document.querySelectorAll('.srv-ov-card'));
  var ovSection = document.getElementById('srvOverview');
  var ovFired   = [false, false, false];

  function updateOverview () {
    if (!ovSection) return;
    var rect    = ovSection.getBoundingClientRect();
    var viewH   = window.innerHeight;

    /* Progress 0→1 as section scrolls from bottom of viewport to centre */
    var progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH * 0.65)));

    /* Thresholds: card fills when progress passes its threshold */
    var thresholds = [0.15, 0.45, 0.75];

    ovCards.forEach(function (card, i) {
      if (progress >= thresholds[i]) {
        card.classList.add('filled');
      } else {
        card.classList.remove('filled');
      }
    });
  }

  /* ── General scroll reveals ── */
  function onScroll () {

    /* Overview cards */
    updateOverview();

    /* Expanded step sections */
    document.querySelectorAll('.srv-exp-inner').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });

    /* Package cards — staggered via CSS transition-delay */
    document.querySelectorAll('.srv-card').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });

    /* FAQ items — staggered manually */
    document.querySelectorAll('.faq-item').forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        (function (index, element) {
          setTimeout(function () { element.classList.add('visible'); }, index * 60);
        })(i, el);
      }
    });

    /* Footer lockup */
    var lockup = document.getElementById('footerLockup');
    if (lockup && lockup.getBoundingClientRect().top < window.innerHeight * 0.88) {
      lockup.classList.add('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
