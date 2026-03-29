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

  /* Form submit — simple client-side feedback */
  var form = document.getElementById('ctForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstName = document.getElementById('firstName').value.trim();
      var email     = document.getElementById('email').value.trim();

      if (!firstName || !email) {
        /* Highlight empty required fields */
        ['firstName', 'email'].forEach(function (id) {
          var el = document.getElementById(id);
          if (!el.value.trim()) {
            el.style.borderColor = '#e55';
            el.addEventListener('input', function () {
              el.style.borderColor = '';
            }, { once: true });
          }
        });
        return;
      }

      /* Show success state */
      form.style.opacity = '0';
      form.style.transform = 'translateY(10px)';
      form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(function () {
        form.style.display = 'none';
        var success = document.createElement('div');
        success.className = 'ct-success visible';
        success.innerHTML =
          '<p class="ct-success-title">Message Sent.</p>' +
          '<p class="ct-success-sub">Thank you for reaching out. We\'ll be in touch shortly.</p>';
        form.parentNode.insertBefore(success, form.nextSibling);
      }, 400);
    });
  }
});
