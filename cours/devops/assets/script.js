/**
 * BMIS Academy - DevOps Course Script
 * Sidebar navigation, code highlighting, copy buttons, progress bar
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

  // --- Back-to-top ---
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Copy buttons on code blocks ---
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
        });
      } else {
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

  // --- Active sidebar link based on current page ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.docs-sidebar .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      // Expand parent section if collapsed
      var section = link.closest('.nav-section');
      if (section) section.classList.add('expanded');
    }
  });

  // --- Mobile sidebar toggle ---
  var sidebarToggle  = document.getElementById('sidebar-toggle');
  var sidebar        = document.getElementById('docs-sidebar');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    function openSidebar() {
      sidebar.classList.add('visible');
      sidebarOverlay.classList.add('visible');
      sidebarToggle.textContent = '✕';
    }

    function closeSidebar() {
      sidebar.classList.remove('visible');
      sidebarOverlay.classList.remove('visible');
      sidebarToggle.textContent = '☰';
    }

    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.contains('visible') ? closeSidebar() : openSidebar();
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) closeSidebar();
      });
    });
  }

  // --- Scroll-spy for in-page sections ---
  var pageSections = document.querySelectorAll('section[id], .ch-header[id]');
  var sidebarLinks = document.querySelectorAll('.docs-sidebar .nav-link[href^="#"]');
  if (pageSections.length > 0 && sidebarLinks.length > 0 && 'IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sidebarLinks.forEach(function (link) {
            link.classList.toggle('active',
              link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    pageSections.forEach(function (s) { scrollObserver.observe(s); });
  }
});
