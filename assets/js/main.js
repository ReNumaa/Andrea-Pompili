/* ═══════════════════════════════════════════════════════
   MAIN.JS — Nav, scroll reveal, form handling
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── NAV: Scroll background ─── */
    var header = document.getElementById('site-header');
    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();


    /* ─── NAV: Mobile toggle ─── */
    var navToggle    = document.getElementById('nav-toggle');
    var mobileNav    = document.getElementById('mobile-nav');
    var mobileClose  = document.getElementById('mobile-nav-close');

    function openNav() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Hamburger apre
    navToggle.addEventListener('click', openNav);

    // X dentro l'overlay chiude
    mobileClose.addEventListener('click', closeNav);

    // Chiudi quando si clicca un link nel menu mobile
    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // Chiudi con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeNav();
        }
    });

    // Chiudi tappando lo sfondo (non i link)
    mobileNav.addEventListener('click', function (e) {
        if (e.target === mobileNav) {
            closeNav();
        }
    });


    /* ─── SCROLL REVEAL ─── */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('revealed'); });
    }


    /* ─── SMOOTH SCROLL ─── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ─── CONTACT FORM ─── */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name    = document.getElementById('contact-name').value.trim();
            var email   = document.getElementById('contact-email').value.trim();
            var message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !message) return;

            /* Fallback mailto — sostituibile con un endpoint server-side */

            var subject = encodeURIComponent('Contatto dal sito — ' + name);
            var body    = encodeURIComponent(
                'Nome: ' + name + '\n' +
                'Email: ' + email + '\n\n' +
                message
            );
            window.location.href = 'mailto:info@andreapompili.it?subject=' + subject + '&body=' + body;

            showFormStatus('Grazie! Si aprirà il tuo client email per inviare il messaggio.', 'success');
        });
    }

    function showFormStatus(text, type) {
        var old = contactForm.querySelector('.form-status');
        if (old) old.remove();

        var el = document.createElement('p');
        el.className = 'form-status form-status--' + type;
        el.textContent = text;
        contactForm.appendChild(el);

        setTimeout(function () { el.remove(); }, 6000);
    }


    /* ─── ACTIVE NAV LINK on scroll (desktop only) ─── */
    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            var top    = section.offsetTop;
            var height = section.offsetHeight;
            var id     = section.getAttribute('id');
            var link   = document.querySelector('.nav__desktop a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('is-active');
                } else {
                    link.classList.remove('is-active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
