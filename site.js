/* ════════════════════════════════════════════════════════════════
   Dan Fletcher Studios — site.js  (Studio Bold / Direction C)
   ----------------------------------------------------------------
   • Injects the shared NAV and FOOTER into every page.
     Edit them ONCE here and every page updates.
   • Handles the mobile menu and the contact form.
   No build step, no framework. Just <script src="site.js">.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Edit nav links here (single source of truth) ── */
  var LINKS = [
    { href: 'index.html',    label: 'Home',     key: 'home',     num: '01' },
    { href: 'about.html',    label: 'Studio',   key: 'about',    num: '02' },
    { href: 'contact.html',  label: 'Contact',  key: 'contact',  num: '03' }
  ];

  var current = document.body.getAttribute('data-page') || '';

  /* ── NAV ── */
  function navHTML() {
    var desktop = LINKS.map(function (l) {
      var active = l.key === current ? ' nav__link--active' : '';
      return '<a href="' + l.href + '" class="nav__link' + active + '">' +
               '<span class="num">' + l.num + '</span><span>' + l.label + '</span>' +
             '</a>';
    }).join('');

    var mobile = LINKS.map(function (l) {
      return '<a href="' + l.href + '">' + l.num + ' &nbsp; ' + l.label + '</a>';
    }).join('');

    return (
      '<header class="nav">' +
        '<div class="container nav__inner">' +
          '<a href="index.html" class="nav__logo" aria-label="Dan Fletcher Studios, Home">' +
            '<img src="assets/logo-dark.png" alt="Dan Fletcher Studios" />' +
          '</a>' +
          '<nav class="nav__links" aria-label="Main navigation">' + desktop + '</nav>' +
          '<a href="contact.html" class="btn primary nav__cta">Start →</a>' +
          '<button class="nav__burger" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</header>' +
      '<div class="nav__mobile container" id="mobile-menu">' +
        mobile +
        '<a href="contact.html">→ &nbsp; Start a project</a>' +
      '</div>'
    );
  }

  /* ── FOOTER ── */
  function footerHTML() {
    var year = new Date().getFullYear();
    return (
      '<footer class="footer">' +
        '<div class="container footer__inner">' +
          '<div class="footer__cta">' +
            '<div class="footer__cta-text">' +
              '<span class="mono" style="color:var(--red)">Let\'s make something</span>' +
              '<h2>Have a project<br />in mind?</h2>' +
              '<a href="contact.html" class="btn primary">Start a project →</a>' +
            '</div>' +
            '<div class="footer__cta-mark">' +
              '<img src="assets/dfs_square_logo_red.png" alt="Dan Fletcher Studios mark" />' +
            '</div>' +
          '</div>' +
          '<div class="footer__cols">' +
            '<div>' +
              '<img src="assets/logo-white.png" alt="Dan Fletcher Studios" />' +
              '<p class="footer__about">A creative agency for photography, graphic design, and social content. Based in Wheaton, IL.</p>' +
            '</div>' +
            '<div class="footer__col">' +
              '<h4>/ Studio</h4>' +
              '<div class="footer__col-links">' +
                '<a class="lnk" href="about.html">About</a>' +
                '<a class="lnk" href="about.html">Process</a>' +
                '<a class="lnk" href="contact.html">Start a project</a>' +
              '</div>' +
            '</div>' +
            '<div class="footer__col">' +
              '<h4>/ Connect</h4>' +
              '<div class="footer__col-links">' +
                '<a class="lnk" href="contact.html">Contact</a>' +
                '<a class="lnk" href="mailto:dan@danfletcherstudios.com">dan@danfletcherstudios.com</a>' +
                '<span>@danfletcherstudios</span>' +
              '</div>' +
            '</div>' +
            '<div class="footer__col">' +
              '<h4>/ Location</h4>' +
              '<div class="footer__col-links">' +
                '<span>Wheaton &middot; IL</span>' +
                '<span>Chicago suburbs</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<span>&copy; ' + year + ' Dan Fletcher Studios</span>' +
            '<span>Now booking</span>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  var navMount = document.getElementById('site-nav');
  var footMount = document.getElementById('site-footer');
  if (navMount) navMount.innerHTML = navHTML();
  if (footMount) footMount.innerHTML = footerHTML();

  /* ── Mobile menu ── */
  var burger = document.querySelector('.nav__burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ── Contact form (only runs if a form exists) ── */
  var form = document.getElementById('contact-form');
  if (form) {
    var successEl = document.getElementById('form-success');
    var errorMsg = document.getElementById('form-error');
    var submitBtn = document.getElementById('submit-btn');

    if (new URLSearchParams(window.location.search).get('sent') === '1') {
      form.hidden = true;
      if (successEl) successEl.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      if (errorMsg) errorMsg.hidden = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else { throw new Error('Non-200'); }
      }).catch(function () {
        if (errorMsg) errorMsg.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send brief →';
      });
    });
  }
})();
