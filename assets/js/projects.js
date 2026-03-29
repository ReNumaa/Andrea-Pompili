/* ═══════════════════════════════════════════════════════
   PROJECTS.JS — Dati progetti e rendering card

   PER AGGIUNGERE UN NUOVO PROGETTO:
   Aggiungi un oggetto all'array 'projects' qui sotto.
   La card viene generata automaticamente.
   ═══════════════════════════════════════════════════════ */

var projects = [
    {
        title:       'Thomas Bresciani — Personal Trainer',
        url:         'https://thomasbresciani.com',
        image:       'assets/img/projects/thomas-bresciani.png',
        description: 'Web app di gestione prenotazioni per personal trainer. Il cliente gestisce sessioni, disponibilità e clienti senza strumenti esterni. PWA installabile con notifiche push per promemoria e conferme.',
        result:      'Elimina la gestione manuale via messaggi e fogli — risparmio concreto di tempo sulla parte amministrativa.'
    }
    // ── Aggiungi nuovi progetti qui ──
    // {
    //     title:       'Nome Cliente — Settore',
    //     url:         'https://...',
    //     image:       'assets/img/projects/nome-file.png',  (opzionale)
    //     description: 'Descrizione del progetto...',
    //     result:      'Risultato ottenuto...'
    // }
];


/* ─── RENDERING ─── */
(function () {
    'use strict';

    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    var html = '';
    projects.forEach(function (p) {
        html += '' +
            '<article class="project-card reveal">' +
                (p.image
                    ? '<div class="project-card__image">' +
                        '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
                      '</div>'
                    : '') +
                '<div class="project-card__header">' +
                    '<h3 class="project-card__title">' + p.title + '</h3>' +
                    (p.url
                        ? '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer" class="project-card__link" aria-label="Visita ' + p.title + '">' +
                            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                                '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>' +
                                '<polyline points="15 3 21 3 21 9"></polyline>' +
                                '<line x1="10" y1="14" x2="21" y2="3"></line>' +
                            '</svg>' +
                          '</a>'
                        : '') +
                '</div>' +
                '<div class="project-card__body">' +
                    '<p class="project-card__desc">' + p.description + '</p>' +
                    '<p class="project-card__result"><strong>Risultato:</strong> ' + p.result + '</p>' +
                '</div>' +
            '</article>';
    });

    grid.innerHTML = html;

    // Re-observe per scroll reveal
    if ('IntersectionObserver' in window) {
        grid.querySelectorAll('.reveal').forEach(function (el) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            observer.observe(el);
        });
    }

})();
