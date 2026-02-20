/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCRIPT — Aerospace Portfolio
   Stars canvas, SPA nav, scroll animations,
   project cards, modal, mobile menu
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ═══════════════════════════════
// Animated Star Field (Canvas)
// ═══════════════════════════════
(function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 140;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.4 + 0.3,
            alpha: Math.random() * 0.6 + 0.2,
            twinkleSpeed: Math.random() * 0.008 + 0.002,
            twinkleOffset: Math.random() * Math.PI * 2,
        });
    }

    function draw(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            const flicker = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 210, 255, ${s.alpha * flicker})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();


// ═══════════════════════════════
// Scroll-triggered Fade-Up
// ═══════════════════════════════
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}


// ═══════════════════════════════
// Nav scroll shrink
// ═══════════════════════════════
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


// ═══════════════════════════════
// Project Data (placeholders)
// ═══════════════════════════════
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
        description: `<p>Placeholder description for your second project.</p><p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true
    },
    {
        id: 'project-3',
        title: 'Project Title Three',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your third project.</p><p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true
    },
    {
        id: 'project-4',
        title: 'Project Title Four',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your fourth project.</p>`,
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

// Gradient placeholders
const gradients = [
    'linear-gradient(135deg, #0c1a3a 0%, #162c58 50%, #0a1530 100%)',
    'linear-gradient(135deg, #0e1f42 0%, #1a3565 50%, #0d1a38 100%)',
    'linear-gradient(135deg, #081428 0%, #14284e 50%, #0b1c35 100%)',
    'linear-gradient(135deg, #101e3c 0%, #1d3866 50%, #112550 100%)',
    'linear-gradient(135deg, #091830 0%, #162e52 50%, #0c2040 100%)',
    'linear-gradient(135deg, #0d1b38 0%, #183258 50%, #102248 100%)'
];


// ═══════════════════════════════
// DOM References
// ═══════════════════════════════
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
const navLinksContainer = document.getElementById('nav-links');


// ═══════════════════════════════
// SPA Navigation
// ═══════════════════════════════
function switchPage(target) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(t => t.classList.remove('active'));

    const page = document.getElementById(target);
    if (page) page.classList.add('active');

    navLinks.forEach(t => {
        if (t.dataset.target === target) t.classList.add('active');
    });

    navLinksContainer.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'instant' });
    history.replaceState(null, '', '#' + target);

    // Re-trigger scroll animations for new page
    setTimeout(initScrollAnimations, 50);
}

// Nav clicks
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

// data-target buttons (hero CTAs, view all, etc.)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-target]');
    if (btn && !btn.classList.contains('nav-link') && !btn.classList.contains('nav-logo')) {
        switchPage(btn.dataset.target);
    }
});

// Hamburger
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
    });
}

// Hash change
window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '') || 'home';
    switchPage(hash);
});


// ═══════════════════════════════
// Project Cards
// ═══════════════════════════════
function createCard(proj, i) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View project: ${proj.title}`);
    card.style.animationDelay = `${i * 0.1}s`;
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

function renderFeatured() {
    featuredGrid.innerHTML = '';
    projects.filter(p => p.featured).forEach((proj, i) => {
        featuredGrid.appendChild(createCard(proj, i));
    });
}

function renderProjects() {
    projectsGrid.innerHTML = '';
    projects.forEach((proj, i) => {
        projectsGrid.appendChild(createCard(proj, i));
    });
}


// ═══════════════════════════════
// Modal
// ═══════════════════════════════
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
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});


// ═══════════════════════════════
// Init
// ═══════════════════════════════
renderFeatured();
renderProjects();
initScrollAnimations();

const initialHash = location.hash.replace('#', '') || 'home';
if (initialHash !== 'home') switchPage(initialHash);
