/**
 * BMIS Academy - Shared Course Script
 * Fonctionnalités communes à tous les cours
 */
document.addEventListener('DOMContentLoaded', function () {
  // --- Syntax highlighting ---
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // --- Reading progress bar ---
  var progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct.toFixed(1) + '%';
    }, { passive: true });
  }

  // --- Back-to-top visibility ---
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Copy buttons on every code block ---
  document.querySelectorAll('.code-block').forEach(function (block) {
    var header = block.querySelector('.code-block-header');
    var codeEl = block.querySelector('code');
    if (!header || !codeEl) return;
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copier';
    btn.addEventListener('click', function () {
      var text = codeEl.innerText;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copié !';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = 'Copier';
            btn.classList.remove('copied');
          }, 2000);
        }).catch(function () {
          btn.textContent = 'Erreur';
          setTimeout(function () { btn.textContent = 'Copier'; }, 2000);
        });
      } else {
        // Fallback for non-HTTPS
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copié !';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copier';
          btn.classList.remove('copied');
        }, 2000);
      }
    });
    header.appendChild(btn);
  });

  // --- Active nav link highlight on scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('#sticky-nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active',
              link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

    // --- OS Tabs (Windows / Linux / macOS) ---
    document.querySelectorAll('.os-tabs').forEach(function (container) {
      container.querySelectorAll('.os-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var os = btn.getAttribute('data-os');

          // Update button states
          container.querySelectorAll('.os-tab').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });

          // Update panel visibility
          container.querySelectorAll('.os-tab-panel').forEach(function (panel) {
            panel.classList.toggle('active', panel.getAttribute('data-os') === os);
          });
        });
      });
    });

});

