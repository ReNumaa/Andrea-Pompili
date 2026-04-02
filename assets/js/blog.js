/* ═══════════════════════════════════════════════════════
   BLOG.JS — Dati articoli e rendering card

   PER AGGIUNGERE UN NUOVO ARTICOLO:
   1. Crea il file HTML in blog/articles/ (copia il template)
   2. Aggiungi un oggetto all'array 'articles' qui sotto
   Le card vengono generate automaticamente.
   ═══════════════════════════════════════════════════════ */

var articles = [
    {
        title:    'Zaino in Spalla',
        date:     '2025-04-14',
        category: 'Viaggi',
        excerpt:  'Quest\'anno ho scelto la lentezza e lo zaino in spalla: Interrail in Europa centrale e del Nord e il Cammino degli Dei tra Bologna e Firenze.',
        slug:     'zaino-in-spalla',
        cover:    'assets/img/blog/04-Zaino-in-spalla-header.png'
    },
    {
        title:    'Correre: Più di uno Sport, un Viaggio',
        date:     '2025-03-14',
        category: 'Sport',
        excerpt:  'La corsa è molto più di un semplice sport. Per molti è una sfida, un rituale quotidiano, un momento di libertà. Ogni passo ha una storia da raccontare.',
        slug:     'correre',
        cover:    'assets/img/blog/03-Correre-header.png'
    },
    {
        title:    'Budgeting',
        date:     '2025-02-17',
        category: 'Finanza Personale',
        excerpt:  'Gestire le proprie finanze personali è fondamentale. Rilevare con precisione entrate e uscite permette di avere una visione chiara della propria situazione economica.',
        slug:     'budgeting',
        cover:    'assets/img/blog/02-BUDGETING-header.png'
    },
    {
        title:    'WHY?',
        date:     '2025-01-14',
        category: 'Crescita Personale',
        excerpt:  'Benvenuti! Mi chiamo Andrea Pompili e sono una persona appassionata di crescita personale, tecnologia, finanza, sport e viaggi. Ecco perché ho creato questo blog.',
        slug:     'why',
        cover:    'assets/img/blog/01-WHY-header.png'
    }
    // ── Aggiungi nuovi articoli qui ──
];


/* ─── UTILITÀ ─── */
function formatDate(dateStr) {
    var months = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
    var parts = dateStr.split('-');
    return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
}


/* ─── RENDERING ─── */
(function () {
    'use strict';

    var grid = document.getElementById('blog-grid');
    if (!grid) return;

    // Ordina per data decrescente
    var sorted = articles.slice().sort(function (a, b) {
        return b.date.localeCompare(a.date);
    });

    // Limita se siamo nella home (attributo data-limit)
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    var list  = limit ? sorted.slice(0, limit) : sorted;

    if (list.length === 0) {
        grid.innerHTML = '<p class="blog-empty">Nessun articolo ancora. Torna a trovarmi!</p>';
        return;
    }

    var html = '';
    var isSubfolder = grid.closest('.blog-page');
    var prefix = isSubfolder ? '' : 'blog/';
    var imgPrefix = isSubfolder ? '../' : '';

    list.forEach(function (a) {
        html += '' +
            '<article class="blog-card reveal">' +
                '<div class="blog-card__body">' +
                    '<div class="blog-card__meta">' +
                        '<time datetime="' + a.date + '">' + formatDate(a.date) + '</time>' +
                        '<span class="blog-card__cat">' + a.category + '</span>' +
                    '</div>' +
                    '<h3 class="blog-card__title">' +
                        '<a href="' + prefix + 'articles/' + a.slug + '.html">' + a.title + '</a>' +
                    '</h3>' +
                    '<p class="blog-card__excerpt">' + a.excerpt + '</p>' +
                    '<a href="' + prefix + 'articles/' + a.slug + '.html" class="blog-card__link">' +
                        'Leggi tutto' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
                    '</a>' +
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
