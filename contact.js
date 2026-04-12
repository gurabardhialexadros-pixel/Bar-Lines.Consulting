/* ── CONTACT PAGE ── */
window.addEventListener('load', function () {

  /* Fade in on load */
  var inner = document.querySelector('.ct-inner');
  if (inner) setTimeout(function () { inner.classList.add('visible'); }, 100);

  /* Footer lockup */
  function onScroll() {
    var lockup = document.getElementById('footerLockup');
    if (lockup && lockup.getBoundingClientRect().top < window.innerHeight * 0.88) {
      lockup.classList.add('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


});
