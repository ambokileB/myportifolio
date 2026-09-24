// router.js
// Simple client-side router for portfolio

(function() {
  'use strict';

  // ====== ROUTES ======
  const routes = {
    '/': renderHome,
    '/home': renderHome,
    '/about': renderHome,      // scroll to section
    '/services': renderHome,
    '/portfolio': renderHome,
    '/skills': renderHome,
    '/contact': renderHome,
    '/project/:id': renderProjectDetail
  };

  let currentProjectId = null;

  // ====== INIT ======
  function init() {
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
    handleRoute();
  }

  // ====== HANDLE ROUTE ======
  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    const parts = path.split('/').filter(Boolean);

    // Close any open project detail
    closeProjectDetail();

    // Match route
    const route = matchRoute(parts);

    if (route) {
      route.handler(route.params);
    } else {
      renderHome();
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ====== MATCH ROUTE ======
  function matchRoute(parts) {
    // Handle /project/:id
    if (parts[0] === 'project' && parts[1]) {
      return {
        handler: renderProjectDetail,
        params: { id: parts[1] }
      };
    }

    // Handle simple routes
    const path = '/' + parts.join('/');
    if (routes[path]) {
      return { handler: routes[path], params: {} };
    }

    return null;
  }

  // ====== RENDER HOME ======
  function renderHome() {
    // Show all sections
    document.querySelectorAll('section').forEach(s => {
      s.style.display = '';
    });
    document.body.classList.remove('project-open');
  }

  // ====== RENDER PROJECT DETAIL ======
  function renderProjectDetail(params) {
    const projectId = params.id;
    const project = PROJECTS[projectId];

    if (!project) {
      // Project not found - go home
      window.location.hash = '#/';
      return;
    }

    currentProjectId = projectId;

    // Hide all sections
    document.querySelectorAll('section').forEach(s => {
      s.style.display = 'none';
    });

    // Check if project detail container exists, if not create it
    let container = document.getElementById('project-detail-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'project-detail-container';
      document.body.appendChild(container);
    }

    // Render project detail
    container.innerHTML = renderProjectHTML(project);
    container.style.display = 'block';

    // Update page title
    document.title = project.title + ' | Baraka H Ambokile';

    // Re-init any animations/icons
    if (window.lucide) window.lucide.createIcons();
  }

  // ====== CLOSE PROJECT DETAIL ======
  function closeProjectDetail() {
    const container = document.getElementById('project-detail-container');
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
    document.title = 'Baraka H Ambokile - Software Developer & Data Engineer';
    currentProjectId = null;
  }

  // ====== PROJECT DETAIL HTML ======
  function renderProjectHTML(project) {
    const techBadges = project.tech.map(t => 
      `<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">${t}</span>`
    ).join('');

    const modulesList = project.modules.map((m, i) => `
      <div class="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-primary transition-all">
        <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
          ${i + 1}
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-1">${m.name}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">${m.desc}</p>
        </div>
      </div>
    `).join('');

    const featuresList = project.features.map(f => `
      <li class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
        <i class="fas fa-check-circle text-accent mt-1 flex-shrink-0"></i>
        <span>${f}</span>
      </li>
    `).join('');

    const screenshots = project.screenshots && project.screenshots.length > 0
      ? project.screenshots.map(s => `
          <div class="rounded-xl overflow-hidden shadow-lg">
            <img src="${s.img}" alt="${s.title}" class="w-full h-auto">
            <p class="text-center text-sm text-gray-500 dark:text-gray-400 py-3 bg-white dark:bg-slate-800">${s.title}</p>
          </div>
        `).join('')
      : `<div class="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700">
          <i class="fas fa-image text-4xl text-gray-300 dark:text-slate-600 mb-3"></i>
          <p class="text-gray-500 dark:text-gray-400">Screenshots zinakuja hivi karibuni</p>
         </div>`;

    const demoBtn = project.demo
      ? `<a href="${project.demo}" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <i class="fas fa-external-link-alt"></i>
          <span>Live Demo</span>
         </a>`
      : `<span class="inline-flex items-center gap-2 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
          <i class="fas fa-lock"></i>
          <span>Demo Not Public</span>
         </span>`;

    return `
      <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
        <div class="max-w-6xl mx-auto px-5">

          <!-- Back Button -->
          <a href="#/portfolio" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mb-8 group">
            <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span>Back to Portfolio</span>
          </a>

          <!-- Hero -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <i class="fas fa-folder-open"></i>
                <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project</span>
              </div>
              <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                ${project.title}
              </h1>
              <p class="text-lg text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                ${project.shortDesc}
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                ${techBadges}
              </div>
              <div class="flex flex-wrap gap-4">
                <a href="${project.github}" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  <i class="fab fa-github"></i>
                  <span>View Code</span>
                </a>
                ${demoBtn}
              </div>
            </div>
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="${project.image}" alt="${project.title}" class="w-full h-auto">
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
              <div class="text-3xl font-bold text-primary mb-1">${project.pages}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Pages / Modules</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
              <div class="text-3xl font-bold text-primary mb-1">${project.tech.length}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Technologies</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
              <div class="text-3xl font-bold text-primary mb-1">${project.features.length}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Features</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 text-center">
              <div class="text-3xl font-bold ${project.status === 'Completed' ? 'text-accent' : 'text-secondary'} mb-1">
                <i class="fas ${project.status === 'Completed' ? 'fa-check-circle' : 'fa-spinner'}"></i>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">${project.status}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-info-circle text-primary mr-2"></i>Maelezo ya Mfumo
            </h2>
            <div class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              ${project.longDesc}
            </div>
          </div>

          <!-- Project Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-2">
                <i class="fas fa-user-tie text-primary"></i>
                <span class="text-sm text-gray-500 dark:text-gray-400">Role</span>
              </div>
              <p class="font-semibold text-gray-900 dark:text-white">${project.role}</p>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-2">
                <i class="fas fa-clock text-primary"></i>
                <span class="text-sm text-gray-500 dark:text-gray-400">Duration</span>
              </div>
              <p class="font-semibold text-gray-900 dark:text-white">${project.duration}</p>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-2">
                <i class="fas fa-flag-checkered text-primary"></i>
                <span class="text-sm text-gray-500 dark:text-gray-400">Status</span>
              </div>
              <p class="font-semibold ${project.status === 'Completed' ? 'text-accent' : 'text-secondary'}">${project.status}</p>
            </div>
          </div>

          <!-- Modules / Pages -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              <i class="fas fa-th-large text-primary mr-2"></i>Pages & Modules (${project.pages})
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Mfumo huu una pages/modules zifuatazo:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${modulesList}
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <i class="fas fa-star text-primary mr-2"></i>Key Features
            </h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${featuresList}
            </ul>
          </div>

          <!-- Challenges & Solution -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-900/50">
              <h3 class="text-lg font-bold text-red-700 dark:text-red-400 mb-3">
                <i class="fas fa-exclamation-triangle mr-2"></i>Challenges
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${project.challenges}</p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-900/50">
              <h3 class="text-lg font-bold text-green-700 dark:text-green-400 mb-3">
                <i class="fas fa-lightbulb mr-2"></i>Solution
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${project.solution}</p>
            </div>
          </div>

          <!-- Screenshots -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <i class="fas fa-images text-primary mr-2"></i>Screenshots
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${screenshots}
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <i class="fas fa-code text-primary mr-2"></i>Tech Stack
            </h2>
            <div class="flex flex-wrap gap-3">
              ${techBadges}
            </div>
          </div>


        </div>
      </div>
    `;
  }

  // ====== EXPORT ======
  window.PortfolioRouter = {
    init,
    navigate: (path) => { window.location.hash = '#' + path; },
    getCurrentProject: () => currentProjectId
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();