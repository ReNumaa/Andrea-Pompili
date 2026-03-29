/* ═══════════════════════════════════════════════════════
   BLOG.JS — Dati articoli e rendering card

   PER AGGIUNGERE UN NUOVO ARTICOLO:
   1. Crea il file HTML in blog/articles/ (copia il template)
   2. Aggiungi un oggetto all'array 'articles' qui sotto
   Le card vengono generate automaticamente.
   ═══════════════════════════════════════════════════════ */

var articles = [
    {
        title:    'Come un sistema di prenotazione ti fa risparmiare ore ogni settimana',
        date:     '2026-03-20',
        category: 'Automazione',
        excerpt:  'Se gestisci appuntamenti via WhatsApp o telefono, stai spendendo tempo su qualcosa che un software può fare meglio di te. Ecco come funziona nella pratica.',
        slug:     'sistema-prenotazione-risparmio-tempo'
    }
    // ── Aggiungi nuovi articoli qui ──
    // {
    //     title:    'Titolo articolo',
    //     date:     '2026-04-10',
    //     category: 'Categoria',
    //     excerpt:  'Breve descrizione...',
    //     slug:     'nome-file-senza-html'
    // }
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
    list.forEach(function (a) {
        html += '' +
            '<article class="blog-card reveal">' +
                '<div class="blog-card__meta">' +
                    '<time datetime="' + a.date + '">' + formatDate(a.date) + '</time>' +
                    '<span class="blog-card__cat">' + a.category + '</span>' +
                '</div>' +
                '<h3 class="blog-card__title">' +
                    '<a href="' + (grid.closest('.blog-page') ? '' : 'blog/') + 'articles/' + a.slug + '.html">' + a.title + '</a>' +
                '</h3>' +
                '<p class="blog-card__excerpt">' + a.excerpt + '</p>' +
                '<a href="' + (grid.closest('.blog-page') ? '' : 'blog/') + 'articles/' + a.slug + '.html" class="blog-card__link">' +
                    'Leggi tutto' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
                '</a>' +
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
