/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCRIPT — Aerospace Portfolio
   Stars canvas, SPA nav, scroll animations,
   project cards, full-page detail, mobile menu
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
    <h3>Technical Details</h3>
    <p>Add technical details, methodologies, and results here. This full page gives you plenty of room for lengthy descriptions, equations, and analysis details.</p>
    <h3>Results & Outcomes</h3>
    <p>Describe the results, any findings, performance metrics, and what you learned from this project.</p>`,
        pdfUrl: '#',
        featured: true,
        images: ['', '', '']
    },
    {
        id: 'project-2',
        title: 'Project Title Two',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your second project.</p><p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true,
        images: ['', '']
    },
    {
        id: 'project-3',
        title: 'Project Title Three',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your third project.</p><p>Add technical details, methodologies, and results here.</p>`,
        pdfUrl: '#',
        featured: true,
        images: ['', '']
    },
    {
        id: 'project-4',
        title: 'Project Title Four',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your fourth project.</p>`,
        pdfUrl: '#',
        featured: false,
        images: ['', '']
    },
    {
        id: 'project-5',
        title: 'Project Title Five',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your fifth project.</p>`,
        pdfUrl: '#',
        featured: false,
        images: ['']
    },
    {
        id: 'project-6',
        title: 'Project Title Six',
        subtitle: 'Category · Subcategory',
        thumbnail: '',
        heroImage: '',
        description: `<p>Placeholder description for your sixth project.</p>`,
        pdfUrl: '#',
        featured: false,
        images: ['']
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
const detailHero = document.getElementById('detail-hero');
const detailTitle = document.getElementById('detail-title');
const detailSub = document.getElementById('detail-subtitle');
const detailDesc = document.getElementById('detail-description');
const detailPdf = document.getElementById('detail-pdf');
const detailGallery = document.getElementById('detail-gallery');
const detailBack = document.getElementById('detail-back');
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

    // Highlight "Projects" tab when viewing project detail
    if (target === 'project-detail') {
        navLinks.forEach(t => {
            if (t.dataset.target === 'projects') t.classList.add('active');
        });
    }

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
    card.addEventListener('click', () => openProject(proj, i));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProject(proj, i); });
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
// Project Detail (Full Page)
// ═══════════════════════════════
function openProject(proj, i) {
    // Set hero background
    detailHero.style.background = proj.heroImage
        ? `url('${proj.heroImage}') center/cover`
        : gradients[i % gradients.length];

    detailTitle.textContent = proj.title;
    detailSub.textContent = proj.subtitle;
    detailDesc.innerHTML = proj.description;
    detailPdf.href = proj.pdfUrl;

    // Build gallery
    detailGallery.innerHTML = '';
    const images = proj.images || [];
    images.forEach((imgUrl, idx) => {
        const item = document.createElement('div');
        item.className = 'detail-gallery-item';
        if (imgUrl) {
            item.style.backgroundImage = `url('${imgUrl}')`;
        } else {
            item.innerHTML = `<div class="gallery-placeholder-inner">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span>Image ${idx + 1}</span>
      </div>`;
        }
        detailGallery.appendChild(item);
    });

    switchPage('project-detail');
}

// Back button
detailBack.addEventListener('click', () => switchPage('projects'));


// ═══════════════════════════════
// Init
// ═══════════════════════════════
renderFeatured();
renderProjects();
initScrollAnimations();

const initialHash = location.hash.replace('#', '') || 'home';
if (initialHash !== 'home') switchPage(initialHash);
