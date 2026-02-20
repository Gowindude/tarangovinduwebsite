/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCRIPT — Aerospace Portfolio
   SPA nav, project cards, modal, mobile menu
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ── Project Data (placeholders) ──
const projects = [
    {
        id: 'project-1',
        title: 'Project Title One',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your first project. Describe the objectives, your role, tools used, and key outcomes.</p>
    <p>Add technical details, methodologies, and results here. This will appear in the project modal when a visitor clicks the card.</p>`,
        pdfUrl: '#',
        featured: true
    },
    {
        id: 'project-2',
        title: 'Project Title Two',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your second project. Describe the objectives, your role, tools used, and key outcomes.</p>
    <p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true
    },
    {
        id: 'project-3',
        title: 'Project Title Three',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your third project. Describe the objectives, your role, tools used, and key outcomes.</p>
    <p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true
    },
    {
        id: 'project-4',
        title: 'Project Title Four',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your fourth project. Describe the objectives, your role, tools used, and key outcomes.</p>
    <p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: false
    },
    {
        id: 'project-5',
        title: 'Project Title Five',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your fifth project.</p>`,
        pdfUrl: '#',
        featured: false
    },
    {
        id: 'project-6',
        title: 'Project Title Six',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your sixth project.</p>`,
        pdfUrl: '#',
        featured: false
    }
];

// ── Gradient placeholders ──
const gradients = [
    'linear-gradient(135deg, #0d1b3e 0%, #1a2d5a 50%, #0f1f44 100%)',
    'linear-gradient(135deg, #112240 0%, #1d3461 50%, #152a50 100%)',
    'linear-gradient(135deg, #0a1929 0%, #16304d 50%, #0d1f38 100%)',
    'linear-gradient(135deg, #142850 0%, #1f3c6e 50%, #183460 100%)',
    'linear-gradient(135deg, #0b1a30 0%, #1a3050 50%, #0e2040 100%)',
    'linear-gradient(135deg, #101d35 0%, #1b2f55 50%, #132545 100%)'
];

// ── DOM References ──
const navLinks = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.nav-logo');
const pages = document.querySelectorAll('.page');
const featuredGrid = document.getElementById('featured-grid');
const projectsGrid = document.getElementById('projects-grid');
const modal = document.getElementById('project-modal');
const modalHero = document.getElementById('modal-hero');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDesc = document.getElementById('modal-description');
const modalPdf = document.getElementById('modal-pdf');
const modalClose = document.getElementById('modal-close');
const hamburger = document.getElementById('nav-hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// ── SPA Navigation ──
function switchPage(target) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(t => t.classList.remove('active'));

    const page = document.getElementById(target);
    if (page) page.classList.add('active');

    navLinks.forEach(t => {
        if (t.dataset.target === target) t.classList.add('active');
    });

    // Close mobile menu
    navLinksContainer.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#' + target);
}

// Nav tab clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => switchPage(link.dataset.target));
});

// Logo click
if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage('home');
    });
}

// Any button with data-target (hero buttons, etc.)
document.querySelectorAll('[data-target]').forEach(btn => {
    if (!btn.classList.contains('nav-link') && !btn.classList.contains('nav-logo')) {
        btn.addEventListener('click', () => switchPage(btn.dataset.target));
    }
});

// Hamburger toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
    });
}

// Hash navigation
window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '') || 'home';
    switchPage(hash);
});

// ── Create a project card DOM element ──
function createCard(proj, i) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View project: ${proj.title}`);
    card.innerHTML = `
    <div class="project-card-thumb" style="background: ${proj.thumbnail ? `url('${proj.thumbnail}') center/cover` : gradients[i % gradients.length]}"></div>
    <div class="project-card-body">
      <h3>${proj.title}</h3>
      <p>${proj.subtitle}</p>
    </div>
  `;
    card.addEventListener('click', () => openModal(proj, i));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModal(proj, i); });
    return card;
}

// ── Render Featured (Home) ──
function renderFeatured() {
    featuredGrid.innerHTML = '';
    projects.filter(p => p.featured).forEach((proj, i) => {
        featuredGrid.appendChild(createCard(proj, i));
    });
}

// ── Render All Projects ──
function renderProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((proj, i) => {
        projectsGrid.appendChild(createCard(proj, i));
    });
}

// ── Modal ──
function openModal(proj, i) {
    modalHero.style.background = proj.heroImage
        ? `url('${proj.heroImage}') center/cover`
        : gradients[i % gradients.length];
    modalTitle.textContent = proj.title;
    modalSubtitle.textContent = proj.subtitle;
    modalDesc.innerHTML = proj.description;
    modalPdf.href = proj.pdfUrl;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// ── Init ──
renderFeatured();
renderProjects();

// Handle initial hash
const initialHash = location.hash.replace('#', '') || 'home';
if (initialHash !== 'home') switchPage(initialHash);
