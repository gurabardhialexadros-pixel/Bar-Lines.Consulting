/* ── TECHNIQUES PAGE ── */
window.addEventListener('load', function () {

  /* Hero animate in */
  var hero = document.querySelector('.tq-hero');
  if (hero) setTimeout(function () { hero.classList.add('visible'); }, 100);

  /* Scroll reveals for each technique section */
  function onScroll() {

    /* Technique inner sections fade up */
    document.querySelectorAll('.tq-technique-inner').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });

    /* Method cards stagger in */
    document.querySelectorAll('.tq-method').forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i % 4 * 80);
      }
    });

    /* Footer lockup */
    var lockup = document.getElementById('footerLockup');
    if (lockup && lockup.getBoundingClientRect().top < window.innerHeight * 0.88) {
      lockup.classList.add('visible');
    }
  }

  /* Set method cards initial state for stagger */
  document.querySelectorAll('.tq-method').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.25s';
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
