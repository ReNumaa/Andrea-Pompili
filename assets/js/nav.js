/* ═══════════════════════════════════════════════════════
   NAV.JS — Mobile nav toggle (usato nelle pagine secondarie)
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    var toggle      = document.getElementById('nav-toggle');
    var mobileNav   = document.getElementById('mobile-nav');
    var mobileClose = document.getElementById('mobile-nav-close');
    if (!toggle || !mobileNav || !mobileClose) return;

    function openNav() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openNav);
    mobileClose.addEventListener('click', closeNav);

    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeNav();
        }
    });

    mobileNav.addEventListener('click', function (e) {
        if (e.target === mobileNav) closeNav();
    });
})();
