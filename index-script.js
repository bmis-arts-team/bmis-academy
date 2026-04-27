/**
 * BMIS Academy - Index / Catalogue page script
 * Sidebar accordion + mobile toggle
 */
document.addEventListener('DOMContentLoaded', function () {

  // ── Accordion ─────────────────────────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var panel    = document.getElementById(targetId);
      if (!panel) return;

      var isOpen = btn.classList.contains('open');

      // Close all others
      document.querySelectorAll('.accordion-trigger.open').forEach(function (other) {
        if (other !== btn) {
          other.classList.remove('open');
          other.setAttribute('aria-expanded', 'false');
          var otherId    = other.getAttribute('data-target');
          var otherPanel = document.getElementById(otherId);
          if (otherPanel) otherPanel.classList.remove('open');
        }
      });

      // Toggle this one
      if (isOpen) {
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
      } else {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('open');
      }
    });
  });

  // ── Mobile sidebar toggle ──────────────────────────────────────
  var sidebarToggle  = document.getElementById('sidebar-toggle');
  var sidebar        = document.getElementById('sidebar');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('visible');
    sidebarOverlay.classList.add('visible');
    sidebarToggle.textContent = '✕';
    sidebarToggle.setAttribute('aria-label', 'Fermer la navigation');
  }

  function closeSidebar() {
    sidebar.classList.remove('visible');
    sidebarOverlay.classList.remove('visible');
    sidebarToggle.textContent = '☰';
    sidebarToggle.setAttribute('aria-label', 'Ouvrir la navigation');
  }

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.contains('visible') ? closeSidebar() : openSidebar();
  });

  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking a link on mobile
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 860) closeSidebar();
    });
  });

});
