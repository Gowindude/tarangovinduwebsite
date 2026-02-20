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
        title: 'Single-Stage Model Rocket: Design, Simulation & Flight Validation',
        subtitle: 'Flight Dynamics · Simulation · Rapid Prototyping · Experimental Validation',
        thumbnail: 'assets/project-1/rocket-post-launch.jpg',
        heroImage: 'assets/project-1/rocket-post-launch.jpg',
        description: `
      <h3>Overview</h3>
      <p>This project involved the full lifecycle design, simulation, manufacturing, and launch of a single-stage model rocket with a target apogee of <strong>125 ft</strong> while carrying a PerfectFlite Pnut altimeter payload. The objective was not only to reach a target altitude, but to validate how closely simulation predictions matched real-world performance.</p>
      <p>The project combined <strong>OpenRocket</strong> aerodynamic and flight simulation, <strong>SolidWorks</strong> CAD modeling, <strong>3D printing</strong> and rapid iteration, mass property analysis and CG validation, and experimental flight testing with performance comparison.</p>

      <h3>Objectives</h3>
      <p>• Reach a target apogee of 125 ft<br>
      • Maintain a stability margin between 1.0–2.0 calibers<br>
      • Successfully integrate and protect an onboard altimeter<br>
      • Compare predicted flight performance to measured flight data</p>

      <h3>My Role</h3>
      <p>I was the <strong>primary designer of the payload bay</strong> and led its development from simulation constraints to physical implementation. Responsibilities included designing and dimensioning the payload bay in SolidWorks, integrating altimeter geometry and retention constraints, iterating fit tolerances across multiple print cycles, performing mass and CG calculations to validate stability margins, and contributing to post-flight performance analysis.</p>

      <h3>Simulation & Design</h3>
      <p>The vehicle was iteratively modified in OpenRocket to approach the 125 ft target while maintaining stable flight. Design variables included nose cone geometry (ogive selected), payload bay dimensions, body tube length, fin height/count, and motor selection.</p>
      <p>A motor trade study evaluated the <strong>1/2A3T</strong>, <strong>1/2A6-2</strong>, and <strong>A8-3</strong>. The 1/2A6-2 was selected based on predicted apogee and stability tradeoffs.</p>
      <p><strong>Final simulated performance:</strong> Predicted apogee ~117 ft | Stability margin: 1.77 calibers</p>

      <h3>Vehicle Configuration</h3>
      <p>Total height: 28 cm | Payload bay: 21 mm ID, 1.2 mm wall thickness | 3 fins at 2.2 cm height | Measured mass (with motor): 34.45 g | Measured CG: ~14.5 cm from nose tip</p>

      <h3>Manufacturing & Iteration</h3>
      <p>The payload bay and nose cone were modeled in SolidWorks and 3D printed. The development process required multiple design iterations: adjusted shoulder diameters, modified tab geometry, and transitioned from loose fit to standard fit after testing.</p>
      <p><em>Engineering loop: Simulation → CAD → Print → Fit Test → Modify → Reprint</em></p>

      <h3>Flight Test & Validation</h3>
      <p><strong>Predicted apogee:</strong> 117 ft<br>
      <strong>Measured apogee:</strong> 81 ft<br>
      <strong>Deviation:</strong> ~31% lower than predicted</p>
      <p>Despite the altitude deviation, the rocket maintained stable, linear ascent, achieved proper recovery deployment, and successfully protected the altimeter. Contributors to the performance gap included launch rod friction, wind conditions, minor mass discrepancies, and streamer packing inefficiencies.</p>

      <h3>Key Takeaways</h3>
      <p>• Small geometric changes significantly affect stability margin and drag<br>
      • Launch boundary conditions can meaningfully alter predicted apogee<br>
      • Manufacturing tolerances influence aerodynamic performance<br>
      • Experimental validation is critical for closing the sim-to-flight gap<br>
      • Iterative engineering is essential when moving from simulation to hardware</p>`,
        pdfUrl: '#',
        featured: true,
        images: [
            { url: 'assets/project-1/solidworks-payload-bay.jpg', caption: 'Custom 3D-printed payload bay designed for aerodynamic performance and altimeter integration.' },
            { url: 'assets/project-1/solidworks-nosecone.jpg', caption: 'Ogive nose cone modeled in SolidWorks for optimal aerodynamic performance.' },
            { url: 'assets/project-1/mass-cg-breakdown.jpg', caption: 'Component-level mass property breakdown used to compute CG and validate stability requirements.' },
            { url: 'assets/project-1/rocket-post-launch.jpg', caption: 'Fully assembled vehicle after flight test. Stable ascent and successful recovery were observed.' }
        ]
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
    images.forEach((img, idx) => {
        const isObj = typeof img === 'object';
        const imgUrl = isObj ? img.url : img;
        const caption = isObj ? img.caption : '';

        const item = document.createElement('div');
        item.className = 'detail-gallery-item';
        if (imgUrl) {
            item.style.backgroundImage = `url('${imgUrl}')`;
            if (caption) {
                item.innerHTML = `<div class="gallery-caption">${caption}</div>`;
            }
        } else {
            item.innerHTML = `<div class="gallery-placeholder-inner">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span>${caption || 'Image ' + (idx + 1)}</span>
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
