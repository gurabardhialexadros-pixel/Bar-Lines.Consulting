/* ── NAV SCROLL ── */
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ── HAMBURGER ── */
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
var mobClose   = document.getElementById('mobClose');
function openMenu()  { mobileMenu.classList.add('open');    mobileMenu.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true');  document.body.style.overflow=''; }
if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobClose)  mobClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link, .mob-cta').forEach(function(a){ a.addEventListener('click', closeMenu); });

/* ── SERVICE ACCORDIONS ── */
document.querySelectorAll('.service-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var isActive = item.classList.contains('active');
    document.querySelectorAll('.service-item').forEach(function(i){ i.classList.remove('active'); });
    if (!isActive) item.classList.add('active');
  });
});

/* ── SERVICE IMAGE SWAP ── */
document.querySelectorAll('.service-item[data-img]').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    var idx = item.getAttribute('data-img');
    document.querySelectorAll('.service-img').forEach(function(img){ img.classList.remove('active'); });
    var target = document.getElementById('serviceImg' + idx);
    if (target) target.classList.add('active');
  });
});

/* ── WORD FILL ── */
function updateWordFill(el) {
  if (!el) return;
  var rect     = el.getBoundingClientRect();
  var words    = el.querySelectorAll('.word');
  if (!words.length) return;
  var start    = window.innerHeight * 0.85;
  var end      = window.innerHeight * 0.15;
  var progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
  var active   = Math.floor(progress * words.length);
  words.forEach(function(w, i){ w.style.color = i < active ? '#111' : '#d0d0d0'; });
}

/* ── INFINITE CAROUSELS ── */
window.addEventListener('load', function () {

  var photoTrack = document.getElementById('photoTrack');
  var testTrack  = document.getElementById('testTrack');

  /* --- Helper: fill a track with enough clones so it never runs out ---
     We clone the ORIGINAL children repeatedly until the track is
     at least 4× the viewport width. We do this BEFORE reading setWidth
     so offsetWidth values are stable. */
  function fillTrack(track, childSelector) {
    var originals = Array.from(track.querySelectorAll(childSelector));
    if (!originals.length) return;
    var safety = 0;
    while (track.scrollWidth < window.innerWidth * 4 && safety < 20) {
      originals.forEach(function(el) {
        track.appendChild(el.cloneNode(true));
      });
      safety++;
    }
  }

  /* --- Helper: measure the pixel width of exactly ONE original set ---
     We count the originals, then measure that many items from the start. */
  function measureSetWidth(track, childSelector, gap) {
    var all      = track.querySelectorAll(childSelector);
    /* originals = half of all items because we cloned at least once above */
    var origCount = Math.round(all.length / Math.ceil(all.length / (all.length / 2)));
    /* Safer: just divide total width by number of clone rounds */
    var totalW = 0;
    Array.from(all).forEach(function(el){ totalW += el.offsetWidth + gap; });
    /* How many full copies are in the track? */
    var copies = Math.round(track.scrollWidth / (totalW / all.length) / all.length * all.length);
    return totalW / Math.round(track.scrollWidth / (totalW / all.length / all.length));
  }

  /* Simpler & reliable: measure the first N original items directly */
  function measureOriginals(track, childSelector, gap, origCount) {
    var all = track.querySelectorAll(childSelector);
    var w   = 0;
    for (var i = 0; i < origCount && i < all.length; i++) {
      w += all[i].offsetWidth + gap;
    }
    return w;
  }

  /* ── PHOTO TRACK ──
     Original HTML: 2 × .photo-loop-group  */
  var photoSetWidth = 0;
  var photoX        = 0;

  if (photoTrack) {
    fillTrack(photoTrack, '.photo-loop-group');
    /* Measure the first 2 groups (= one original set) */
    photoSetWidth = measureOriginals(photoTrack, '.photo-loop-group', 16, 2);
  }

  /* ── TESTIMONIAL TRACK ──
     Original HTML: 18 × .test-card  */
  var testSetWidth = 0;
  var testX        = 0;

  if (testTrack) {
    fillTrack(testTrack, '.test-card');
    /* Measure the first 18 cards (= one original set) */
    testSetWidth = measureOriginals(testTrack, '.test-card', 20, 18);
  }

  /* BOTTOM ROW (testimonials): */
  var lastScrollY = window.scrollY;

  function onScroll() {
    var scrollY = window.scrollY;
    var delta   = scrollY - lastScrollY; /* positive = scrolling DOWN, negative = scrolling UP */
    lastScrollY = scrollY;

    /* Word fill */
    updateWordFill(document.getElementById('fillText1'));
    updateWordFill(document.getElementById('fillText2'));

    /*
      TOP ROW (photos):
        scroll DOWN (delta > 0) → images move LEFT  → photoX decreases
        scroll UP   (delta < 0) → images move RIGHT → photoX increases
    */
    if (photoTrack && photoSetWidth > 0) {
      photoX -= delta * 0.35;
      /* Keep photoX inside one set width so the jump is invisible */
      photoX = ((photoX % photoSetWidth) - photoSetWidth) % photoSetWidth;
      photoTrack.style.transform = 'translateX(' + photoX + 'px)';
    }

    /*
      BOTTOM ROW (testimonials):
        scroll DOWN (delta > 0) → images move RIGHT → testX increases
        scroll UP   (delta < 0) → images move LEFT  → testX decreases
    */
    if (testTrack && testSetWidth > 0) {
      testX += delta * 0.35;
      testX = ((testX % testSetWidth) - testSetWidth) % testSetWidth;
      testTrack.style.transform = 'translateX(' + testX + 'px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

/* ── FOOTER LOCKUP ANIMATION ── */
(function () {
  var lockup = document.getElementById('footerLockup');
  if (!lockup) return;

  function checkLockup() {
    var rect = lockup.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      lockup.classList.add('visible');
      window.removeEventListener('scroll', checkLockup);
    }
  }

  window.addEventListener('scroll', checkLockup, { passive: true });
  checkLockup(); /* run once on load in case already in view */
})();
