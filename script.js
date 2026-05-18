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
        title: 'Model Rocket: Design, Simulation & Flight Validation',
        subtitle: 'Flight Dynamics · Simulation · Rapid Prototyping · Experimental Validation',
        thumbnail: 'assets/project-1/rocketpostlaunch.jpg',
        heroImage: 'assets/project-1/openrocketsim.png',
        featured: true,
        description: `<h3>What?</h3><ul><li>Full lifecycle design, simulation, manufacturing, and launch of a single-stage model rocket targeting 125 ft apogee with an onboard altimeter</li><li>Core goal was validating how closely simulation predictions matched real flight performance</li></ul><h3>How?</h3><ul><li>Designed vehicle iteratively in OpenRocket with a motor trade study across three candidates</li><li>Designed and 3D printed payload bay and nose cone in SolidWorks across multiple tolerance iterations</li><li>Performed mass property and CG analysis to validate 1.77 caliber stability margin</li></ul><h3>Results?</h3><ul><li>Predicted 117 ft | Measured 81 ft | Stability margin 1.77 cal</li><li>Stable ascent, successful recovery, altimeter protected</li><li>31% deviation quantified and attributed to launch friction, wind, and streamer packing</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/project-1/openrocketsim.png', caption: 'OpenRocket simulation of rocket.' },
            { url: 'assets/project-1/solidworkspayloadbay.png', caption: 'CAD models of payload bay, nose cone, fin holder.' },
            { url: 'assets/project-1/solidworksnosecone.png', caption: 'CAD models of payload bay, nose cone, fin holder.' },
            { url: 'assets/project-1/solidworksfinholder.png', caption: 'CAD models of payload bay, nose cone, fin holder.' },
            { url: 'assets/project-1/masscgbreakdown.png', caption: 'Mass and CG breakdown used to validate stability margin.' },
            { url: 'assets/project-1/rocketpostlaunch.jpg', caption: 'Disassembled rocket post-launch, showing recovery mechanism.' },
            { url: 'assets/project-1/rocketpostlaunch(disassembled).jpg', caption: 'Final assembled rocket before launch.' }
        ]
    },
    {
        id: 'project-2',
        title: 'Balsa Wood Glider',
        subtitle: 'Aerodynamics · Flight Vehicle Design · Iterative Testing',
        thumbnail: 'assets/project-2/early design.png',
        heroImage: 'assets/project-2/early design.png',
        featured: true,
        description: `<h3>What?</h3><ul><li>Designed, built, and flight-tested a hand-launched balsa glider to maximize flight distance under strict size, mass, and material constraints</li><li>Iterative engineering: continuously refining design, trim, and structure based on test results</li></ul><h3>How?</h3><ul><li>Selected AR ~12.5 wing to minimize induced drag; placed CG 0.25 in ahead of quarter-chord for longitudinal stability</li><li>Iterated ballast placement for trim, reinforced joints during late-stage testing</li><li>Manufactured with laser cutter on balsa wood</li></ul><h3>Results?</h3><ul><li>Test flights averaged 45-50 ft, exceeding the 20 ft minimum by over 2x</li><li>All geometric, mass, and material constraints satisfied</li><li>Co-authored a full technical design report</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/project-2/early design.png', caption: 'Early glider, testing out different masses and positions of clay.' },
            { url: 'assets/project-2/center of gravity testing.png', caption: 'Markings and rubber band to test position and alignment of wing.' },
            { url: 'assets/project-2/play-doh tuning.png', caption: 'Tape repairs after test flights, ensuring consistent results.' },
            { url: 'assets/project-2/finalized sketch.png', caption: 'Glider sketch in Adobe.' },
            { url: 'assets/project-2/finalflightconfig.png', caption: 'Final glider complete with modifications.' }
        ]
    },
    {
        id: 'project-3',
        title: 'Conservation Surveillance Drone',
        subtitle: 'UAV Design · Systems Integration · Flight Testing',
        thumbnail: 'assets/project-3/dronebuilt.jpg',
        heroImage: 'assets/project-3/dronebuilt.jpg',
        featured: true,
        description: `<h3>What?</h3><ul><li>Designed, built, and flight-tested a custom quadrotor for environmental monitoring</li><li>Full-stack build: frame design, propulsion selection, avionics integration, and flight controller tuning</li></ul><h3>How?</h3><ul><li>Designed a custom 3D-printable frame with truss-style arms optimized for stiffness-to-weight</li><li>Integrated full avionics stack including ESCs, ExpressLRS flight controller, and receiver; performed all soldering</li><li>Tuned flight controller through iterative test flights</li></ul><h3>Results?</h3><ul><li>Stable, repeatable flight achieved under manual and stabilized control modes</li><li>All mass, power, and structural constraints met within budget</li><li>Donation to local regional park for continued use</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/project-3/dronebuilt.jpg', caption: 'Completed drone configured for conservation surveillance, featuring integrated propulsion, avionics stack, and camera system for environmental monitoring.' },
            { url: 'assets/project-3/droneframeCAD.png', caption: 'Drone frame CAD model in SolidWorks.' },
            { url: 'assets/project-3/droneframePrint.png', caption: 'Drone parts layout for 3D printing.' }
        ]
    },
    {
        id: 'project-4',
        title: 'Published Research: Visually Representing Black Holes',
        subtitle: 'Theoretical Physics · Science Communication · Peer-Reviewed Publication',
        thumbnail: 'assets/project-4/Penrose DIagram.png',
        heroImage: 'assets/project-4/Penrose DIagram.png',
        featured: false,
        description: `<h3>What?</h3><ul><li>Independently authored and published a peer-reviewed paper on geometric spacetime diagrams as educational tools for teaching black hole physics</li><li>Mentored by Dr. Marina David (Postdoctoral Researcher, KU Leuven); published in The National High School Journal of Science with 4,500+ views</li></ul><h3>How?</h3><ul><li>Conducted full literature review and comparative analysis of Penrose, Kruskal-Szekeres, and Eddington-Finkelstein diagrams</li><li>Evaluated each representation for physical accuracy and accessibility to early learners</li><li>Independently structured and wrote the full 10-page manuscript through submission</li></ul><h3>Results?</h3><ul><li>Accepted for publication with 4,500+ views</li><li>Found Eddington-Finkelstein diagrams offer the strongest balance between physical fidelity and conceptual clarity</li><li>Contributed to discussions on improving relativity education at the high school level</li></ul><p style="margin-top:1.5rem;">Read the published paper: <a href="https://nhsjs.com/2024/analysis-of-geometric-representations-used-to-simplify-spacetime-curvature-of-black-holes/" target="_blank" rel="noopener noreferrer" style="color:var(--color-accent-light);text-decoration:underline;">The National High School Journal of Science</a></p>`,
        pdfUrl: '#',
        images: []
    },
    {
        id: 'project-5',
        title: 'Eagle Scout Project: Sundial Restoration',
        subtitle: 'Structural Redesign · Project Leadership · Community Infrastructure',
        thumbnail: 'assets/project-5/eagle final.png',
        heroImage: 'assets/project-5/eagle final.png',
        featured: true,
        description: `<h3>What?</h3><ul><li>Led full restoration and structural redesign of an outdoor educational sundial installation at Mattos Elementary School</li><li>Managed end-to-end: structural assessment, fabrication, volunteer coordination, budgeting, and on-site installation</li></ul><h3>How?</h3><ul><li>Reverse-engineered existing geometry to verify correct angular alignment of the gnomon; redesigned base for improved load distribution</li><li>Recruited and coordinated volunteers, managed materials budget, and operated saws, drills, and sanders for full structural rebuild</li><li>Pivoted design approach mid-fabrication when tooling tolerances failed; redistributed tasks to meet deadline</li></ul><h3>Results?</h3><ul><li>Fully restored sundial delivered to school administrators before campus construction deadline</li><li>Reinforced structure, repainted hour lines, and sealed for long-term outdoor durability</li><li>Earned Eagle Scout rank</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/project-5/eaglebeforevsafter.png', caption: 'Front-facing comparison showing restored hour markings and reinforced support structure.' },
            { url: 'assets/project-5/eagle final.png', caption: 'Completed sundial installation following full structural restoration and repainting.' }
        ]
    },
    {
        id: 'project-6',
        title: 'Servo-Actuated Ball Valve Assembly',
        subtitle: 'Propulsion Systems · Mechanical Design · SolidWorks',
        thumbnail: 'assets/IMG_3584.png',
        heroImage: 'assets/IMG_3584.png',
        featured: true,
        description: `<h3>What?</h3><ul><li>Designing a custom servo-actuated ball valve assembly for a rocket club propulsion feed system</li><li>Replacing existing actuation solution with a new setup, working under a strict 5.5 lb mass budget</li></ul><h3>How?</h3><ul><li>Sized servo from first principles using torque requirements derived from valve geometry</li><li>Modeled three design iterations in SolidWorks, incorporating feedback from structures and propulsion leads</li><li>Managing full project lifecycle from constraints analysis through 3D printing and assembly</li></ul><h3>Results?</h3><ul><li>~85% mass reduction per actuator, saving ~16 lbs across all 4 PFS valves</li><li>Final configuration selected for implementation; hardware testing in progress</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/IMG_3584.png', caption: 'Servo mount iteration with direct mounting to valve: custom stand and connection to valve.' },
            { url: 'assets/IMG_3587.png', caption: 'Direct mounting iteration with servo using metal hardware.' },
            { url: 'assets/IMG_3585.png', caption: 'Iteration using gears to reduce required torque from servo: custom gears, hex mount, and plates with metal adapters.' }
        ]
    },
    {
        id: 'project-7',
        title: 'Acoustic Drone Detection System',
        subtitle: 'Embedded Systems · Machine Learning · CAD · 36-Hour Hackathon',
        thumbnail: 'assets/IMG_3588.jpeg',
        heroImage: 'assets/IMG_3588.jpeg',
        featured: true,
        description: `<h3>What?</h3><ul><li>Self-contained drone detection system built in under 36 hours for under $25, no WiFi or external dependencies</li><li>Processes audio in real time and outputs a confidence score for drone presence</li></ul><h3>How?</h3><ul><li>Reverse-engineered a speaker as a microphone using acoustic reciprocity after no reliable mic was available</li><li>3D printed a mathematically calculated parabolic dish to maximize signal capture</li><li>Trained a deep learning model on 20,000+ audio samples in Python, ported to C++ to run entirely on an ESP32 microcontroller</li></ul><h3>Results?</h3><ul><li>Over 80% classification accuracy, fully functional on-device with no external compute</li><li>Drone audio detected from 15-20 ft using a makeshift microphone</li><li>Full inference pipeline running on a single ESP32 microcontroller</li></ul>`,
        pdfUrl: '#',
        images: [
            { url: 'assets/IMG_3590.jpeg', caption: 'Detection system and optional display reacting to drone audio.' },
            { url: 'assets/IMG_3588.jpeg', caption: 'Fully assembled detection system with printed dish and electronics.' },
            { url: 'assets/IMG_3592.png', caption: 'Solar panel power source for detection system.' },
            { url: 'assets/IMG_3586.png', caption: 'Parabolic dish modeled in SolidWorks.' }
        ]
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
// ═══���═══════════════════════════
let currentProject = null;

function openProject(proj, i) {
    // Set hero background
    detailHero.style.background = proj.heroImage
        ? `url('${proj.heroImage}') center / cover`
        : gradients[i % gradients.length];

    detailTitle.textContent = proj.title;
    detailSub.textContent = proj.subtitle;
    detailDesc.innerHTML = proj.description;

    currentProject = proj;

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
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
                <span>${caption || 'Image ' + (idx + 1)}</span>
            </div>`;
        }

        // Click to open lightbox
        if (imgUrl) {
            item.addEventListener('click', () => openLightbox(imgUrl, caption));
        }

        detailGallery.appendChild(item);
    });

    // Append Full Manuscript PDF for Project 4 at the very bottom
    if (proj.id === 'project-4') {
        const manuscriptDiv = document.createElement('div');
        manuscriptDiv.style.width = '100%';
        manuscriptDiv.style.marginTop = '40px';
        manuscriptDiv.style.gridColumn = '1 / -1';
        manuscriptDiv.innerHTML = `
            <h3 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--color-text);">Full Manuscript</h3>
            <div style="width: 100%; border-radius: var(--radius); overflow: hidden; background: #fff; border: 1px solid var(--glass-border);">
                <iframe src="assets/project-4/Paper Manuscript.pdf" width="100%" height="800px" style="border: none; display: block;"></iframe>
            </div>
        `;
        detailGallery.appendChild(manuscriptDiv);
    }

    // Append Workbook PDF for Project 5
    if (proj.id === 'project-5') {
        const workbookDiv = document.createElement('div');
        workbookDiv.style.width = '100%';
        workbookDiv.style.marginTop = '40px';
        workbookDiv.style.gridColumn = '1 / -1';
        workbookDiv.innerHTML = `
            <h3 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--color-text);">Eagle Scout Project Workbook</h3>
            <div style="width: 100%; border-radius: var(--radius); overflow: hidden; background: #fff; border: 1px solid var(--glass-border);">
                <iframe src="assets/project-5/EagleProjectWorkbook2024 _TaranG154.pdf" width="100%" height="800px" style="border: none; display: block;"></iframe>
            </div>
        `;
        detailGallery.appendChild(workbookDiv);
    }

    switchPage('project-detail');
}

// Back button
detailBack.addEventListener('click', () => switchPage('projects'));


// ═══════════════════��═══════════
// Lightbox
// ═══════════════════════════════
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});



// ═══════════════════════════════
// Init
// ═══════════════════════════════
renderFeatured();
renderProjects();
initScrollAnimations();

const initialHash = location.hash.replace('#', '') || 'home';
if (initialHash !== 'home') switchPage(initialHash);
