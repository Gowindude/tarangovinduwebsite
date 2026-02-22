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
        thumbnail: 'assets/project-1/rocketpostlaunch.jpg',
        heroImage: 'assets/project-1/openrocketsim.png',
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
            { url: 'assets/project-1/openrocketsim.png', caption: 'OpenRocket model showing CG and CP placement with predicted 117 ft apogee and 1.77 caliber stability margin.' },
            { url: 'assets/project-1/solidworkspayloadbay.png', caption: 'Custom 3D-printed payload bay designed for aerodynamic performance and altimeter integration.' },
            { url: 'assets/project-1/solidworksnosecone.png', caption: 'Ogive nose cone modeled in SolidWorks for optimal aerodynamic performance.' },
            { url: 'assets/project-1/solidworksfinholder.png', caption: 'SolidWorks fin holder component for structural mounting and alignment.' },
            { url: 'assets/project-1/masscgbreakdown.png', caption: 'Component-level mass property breakdown used to compute CG and validate stability requirements.' },
            { url: 'assets/project-1/rocketpostlaunch.jpg', caption: 'Fully assembled vehicle after flight test. Stable ascent and successful recovery were observed.' },
            { url: 'assets/project-1/rocketpostlaunch(disassembled).jpg', caption: 'Disassembled rocket showing internal payload bay, body tube, and recovery system components.' }
        ]
    },
    {
        id: 'project-2',
        title: 'Balsa Wood Glider Design',
        subtitle: 'Aerodynamics · Flight Vehicle Design',
        thumbnail: 'assets/project-2/early design.png',
        heroImage: 'assets/project-2/early design.png',
        description: `
      <p>Designed, built, and flight-tested a hand-launched balsa wood glider to maximize forward flight distance under strict geometric, structural, and aerodynamic constraints. The project required satisfying aspect ratio, wing loading, material composition, and size limits while achieving stable and efficient unpowered flight.</p>
      
      <p>The final glider achieved flights averaging 45–50 feet during testing, exceeding the 20-foot minimum requirement, with quantitative validation of wing loading, aspect ratio, and stability criteria.</p>

      <h3>Objectives</h3>
      <ul>
        <li>Maximize forward flight distance</li>
        <li>Meet strict size (16 in × 16 in) and structural constraints</li>
        <li>Maintain &gt;50% balsa wood by weight</li>
        <li>Achieve high aerodynamic efficiency while ensuring longitudinal stability</li>
        <li>Document full engineering design process</li>
      </ul>

      <h3>Key Design Decisions</h3>
      <h4>High Aspect Ratio Wing</h4>
      <ul>
        <li>Wingspan: 22 in</li>
        <li>Chord: 1.5 in</li>
        <li>Aspect Ratio: ~12.5</li>
        <li>Reduced induced drag to improve glide efficiency</li>
      </ul>

      <h4>Low Conventional Tail Configuration</h4>
      <ul>
        <li>Horizontal stabilizer mounted at slight downward incidence (~10° initial concept)</li>
        <li>Positioned CG approximately 0.25 in ahead of quarter-chord for longitudinal stability</li>
      </ul>

      <h4>Lightweight Construction Strategy</h4>
      <ul>
        <li>Total mass: 17 g</li>
        <li>Wing loading: 0.092 g/cm² (well below 0.5 g/cm² limit)</li>
        <li>Wood mass fraction: 52.9%</li>
      </ul>

      <h3>Aerodynamic Analysis</h3>
      <p>Estimated aerodynamic coefficients using first-order approximations:</p>
      <ul>
        <li>Lift coefficient (C<sub>L</sub>) ≈ 2.19</li>
        <li>Drag coefficient (C<sub>D</sub>) ≈ 0.176</li>
        <li>Zero-lift drag ≈ 0.03</li>
        <li>Induced drag calculated using AR = 12.5 and Oswald efficiency factor ≈ 0.85</li>
      </ul>
      <p>Wing loading and aspect ratio calculations were performed to validate compliance with performance constraints and predict glide efficiency.</p>

      <h3>Design Iterations</h3>
      <ul>
        <li>Adjusted wing placement along fuselage to optimize CG location</li>
        <li>Iteratively modified ballast mass (Play-Doh) for trim stability</li>
        <li>Evaluated dihedral implementation but avoided structural risk due to thin balsa</li>
        <li>Reinforced weak joints after structural failure during late-stage testing</li>
      </ul>
      <p>Structural failure of one wing and vertical stabilizer immediately prior to final trials negatively impacted measured performance but validated structural tradeoffs between weight and durability.</p>

      <h3>Results</h3>
      <ul>
        <li>Average test flight distance: 45–50 ft</li>
        <li>Official measured flights: 30–35 ft (post-damage condition)</li>
        <li>Stable longitudinal behavior with CG positioned ahead of quarter-chord</li>
        <li>Successful compliance with all geometric and mass constraints</li>
      </ul>`,
        pdfUrl: '#',
        featured: true,
        images: [
            { url: 'assets/project-2/early design.png', caption: 'Initial assembly of fuselage-wing joint with temporary rubber band constraint used to test alignment and structural fit prior to final bonding.' },
            { url: 'assets/project-2/center of gravity testing.png', caption: 'Fuselage marked for iterative CG positioning during longitudinal stability testing. Wing placement was adjusted incrementally to optimize glide performance.' },
            { url: 'assets/project-2/play-doh tuning.png', caption: 'Play-Doh ballast added and repositioned during flight testing to tune pitch stability and trim condition.' },
            { url: 'assets/project-2/finalized sketch.png', caption: 'Final planform geometry drafted to verify 16 in × 16 in constraint compliance and visualize wing aspect ratio and tail configuration.' },
            { url: 'assets/project-2/finalflightconfig.png', caption: 'Final trim setup with secured ballast used to tune center of gravity for stable, high-efficiency glide performance.' }
        ]
    },
    {
        id: 'project-3',
        title: 'Custom Conservation Surveillance Drone – Design & Systems Integration',
        subtitle: 'Autonomous Systems · UAV Design & Integration',
        thumbnail: 'assets/project-3/dronebuilt.jpg',
        heroImage: 'assets/project-3/dronebuilt.jpg',
        description: `
      <p>Led the end-to-end design, fabrication, assembly, and flight testing of a custom quadrotor platform intended for conservation surveillance applications. The vehicle was designed to carry a forward-facing camera system for environmental monitoring and wildlife observation while maintaining stable and efficient flight performance.</p>
      
      <p>The project emphasized full-stack vehicle development — from structural design and propulsion selection to electronics integration and flight controller tuning — resulting in a functional multirotor platform capable of stable, repeatable flight and onboard visual data collection.</p>

      <h3>Objectives</h3>
      <ul>
        <li>Design a lightweight, structurally efficient 3D-printable quadrotor frame</li>
        <li>Integrate a forward-facing camera system for conservation surveillance</li>
        <li>Select propulsion and avionics components within cost and weight constraints</li>
        <li>Teach and mentor students in CAD, electronics, and UAV systems</li>
        <li>Achieve stable and reliable flight suitable for environmental monitoring</li>
      </ul>

      <h3>Structural & CAD Design</h3>
      <p>Designed a custom 3D-printable frame in CAD with the following constraints:</p>
      <ul>
        <li>30.5 mm × 30.5 mm mounting pattern for flight controller stack</li>
        <li>20 mm × 20 mm mounting pattern for VTX</li>
        <li>Dedicated forward camera mounting holes</li>
        <li>35 mm × 79 mm top slot for battery placement</li>
        <li>All motor and structural interfaces designed for M3 screw integration</li>
      </ul>
      <p>The arm geometry was optimized for stiffness-to-weight ratio using truss-style reinforcement while maintaining manufacturability through standard FDM printing.</p>

      <h3>Systems Integration</h3>
      <p>Performed full component integration including:</p>
      <ul>
        <li>Brushless motors and propeller selection</li>
        <li>Electronic Speed Controller configuration</li>
        <li>Battery and power distribution layout</li>
        <li>Receiver and radio pairing</li>
        <li>Soldering and electrical routing</li>
        <li>ExpressLRS flight controller configuration and tuning</li>
      </ul>
      <p>Created a detailed component spreadsheet tracking cost, mass, dimensions, mounting requirements, and compatibility constraints. This ensured total system mass and power draw remained within safe operating limits.</p>

      <h3>Flight Testing & Validation</h3>
      <ul>
        <li>Configured and tuned flight controller parameters for stable hover and maneuverability</li>
        <li>Conducted initial test flights to validate thrust-to-weight ratio and control response</li>
        <li>Iterated on battery mounting and wire routing to improve CG balance and vibration isolation</li>
        <li>Achieved consistent, repeatable flight performance under manual and stabilized control modes</li>
      </ul>

      <h3>Leadership & Mentorship</h3>
      <ul>
        <li>Taught CAD modeling principles and parametric design</li>
        <li>Guided students through electronics soldering and integration</li>
        <li>Demonstrated systems-level thinking across mechanical, electrical, and software domains</li>
        <li>Managed component procurement and build sequencing</li>
      </ul>
      <p>This project demonstrated the ability to translate conceptual vehicle design into functional hardware while mentoring others through the process.</p>`,
        pdfUrl: '#',
        featured: true,
        images: [
            { url: 'assets/project-3/dronebuilt.jpg', caption: 'Completed quadrotor platform configured for conservation surveillance, featuring integrated propulsion, avionics stack, and forward-facing camera system for environmental monitoring applications.' },
            { url: 'assets/project-3/droneframeCAD.png', caption: 'Fully assembled CAD model illustrating arm truss geometry, battery slot placement, avionics mounting patterns, and structural reinforcement designed for stiffness-to-weight optimization.' },
            { url: 'assets/project-3/droneframePrint.png', caption: 'Separated frame components prepared for additive manufacturing, showing individual arms, base plate, and structural elements arranged for efficient 3D printing and M3 fastener integration.' }
        ]
    },
    {
        id: 'project-4',
        title: 'Analysis of Geometric Representations Used to Simplify Spacetime Curvature of Black Holes',
        subtitle: 'Physics Research · Theoretical Relativity & Science Communication',
        thumbnail: 'assets/project-4/Penrose DIagram.png',
        heroImage: 'assets/project-4/Penrose DIagram.png',
        description: `
      <p><strong>Independent Researcher</strong><br>
      Mentored by Dr. Marina David (Postdoctoral Researcher), KU Leuven<br>
      Published in The National High School Journal of Science (2024)<br>
      4,500+ Views</p>

      <h3>Overview</h3>
      <p>This research investigates how geometric spacetime diagrams can be used to simplify and improve conceptual understanding of black hole physics and General Relativity.</p>
      
      <p>Black holes are typically introduced through dense tensor equations and metric formulations that require advanced mathematical background. While mathematically rigorous, this approach often creates a barrier for early learners. This project explores whether visual geometric representations — specifically Penrose, Kruskal–Szekeres, and Eddington–Finkelstein diagrams — can preserve physical accuracy while improving accessibility.</p>

      <p>I independently authored the full manuscript, conducted the literature review, structured the theoretical analysis, and submitted the paper for publication. The work was accepted and published in 2024.</p>

      <h3>Research Question</h3>
      <p><em>Which geometric spacetime diagram most effectively balances physical accuracy and educational accessibility when teaching black hole curvature?</em></p>

      <h3>Technical Focus</h3>
      <p>The research integrates:</p>
      <ul>
        <li>Foundations of Special Relativity (Lorentz transformations, light cones, time dilation)</li>
        <li>General Relativity concepts (geodesics, spacetime curvature, event horizons)</li>
        <li>Coordinate systems for Schwarzschild black holes</li>
        <li>Analysis of coordinate singularities</li>
        <li>Pedagogical research on visualization-based physics instruction</li>
      </ul>

      <p>The study compares three major spacetime representations:</p>
      
      <h4>1. Penrose Diagrams</h4>
      <ul>
        <li>Compactify infinite spacetime into finite regions</li>
        <li>Show global causal structure</li>
        <li>Useful for understanding full spacetime regions</li>
        <li>More abstract and less intuitive for beginners</li>
      </ul>

      <h4>2. Kruskal–Szekeres Diagrams</h4>
      <ul>
        <li>Remove coordinate singularities</li>
        <li>Preserve geometric structure across regions</li>
        <li>Clearly show event horizons and singularities</li>
        <li>Require stronger mathematical maturity</li>
      </ul>

      <h4>3. Eddington–Finkelstein Diagrams</h4>
      <ul>
        <li>Eliminate coordinate singularities</li>
        <li>Emphasize ingoing/outgoing light geodesics</li>
        <li>Clearly illustrate behavior near event horizons</li>
        <li>Most accessible for early learners</li>
      </ul>

      <h3>Key Findings</h3>
      <ul>
        <li>The Eddington–Finkelstein diagram offers the strongest balance between physical fidelity and conceptual clarity.</li>
        <li>Penrose diagrams are powerful for showing global structure but are abstract.</li>
        <li>Kruskal–Szekeres diagrams provide strong geometric insight but demand more mathematical background.</li>
        <li>Visual models significantly outperform purely equation-based instruction in educational studies reviewed in the paper.</li>
        <li>Future physics education may rely more heavily on interactive simulations and computational visualization tools.</li>
      </ul>

      <h3>Impact & Contribution</h3>
      <ul>
        <li>Independently written and structured 10-page manuscript</li>
        <li>Accepted for publication with 4,500+ views</li>
        <li>Contributed to discussions on improving relativity education</li>
        <li>Mentored by a KU Leuven postdoctoral researcher</li>
        <li>Bridges advanced theoretical physics and science communication</li>
      </ul>

      <p>This project strengthened my ability to conduct structured literature reviews, analyze advanced theoretical physics frameworks, compare coordinate systems and geometric models, communicate complex ideas clearly and rigorously, and work independently at a near-undergraduate research level.</p>

      <h3>Link to Publication</h3>
      <p>Read the published version here: <br>
      <a href="https://nhsjs.com/2024/analysis-of-geometric-representations-used-to-simplify-spacetime-curvature-of-black-holes/" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent-light); text-decoration: underline;">The National High School Journal of Science</a></p>`,
        pdfUrl: '#',
        featured: false,
        images: []
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
let currentProject = null;

function openProject(proj, i) {
    // Set hero background
    detailHero.style.background = proj.heroImage
        ? `url('${proj.heroImage}') center/cover`
        : gradients[i % gradients.length];

    detailTitle.textContent = proj.title;
    detailSub.textContent = proj.subtitle;
    detailDesc.innerHTML = proj.description;

    currentProject = proj;
    detailPdf.onclick = (e) => {
        e.preventDefault();
        generateProjectPDF(currentProject);
    };

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

    switchPage('project-detail');
}

// Back button
detailBack.addEventListener('click', () => switchPage('projects'));


// ═══════════════════════════════
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
// PDF Generation
// ═══════════════════════════════
function generateProjectPDF(proj) {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.fontFamily = 'Inter, sans-serif';
    container.style.color = '#1e293b';
    container.style.background = '#ffffff';

    container.innerHTML = `
        <h1 style="color: #2563eb; margin-bottom: 5px; font-size: 28px;">${proj.title}</h1>
        <p style="color: #64748b; font-size: 16px; margin-bottom: 25px;">${proj.subtitle}</p>
        <div style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 30px;">
            ${proj.description}
        </div>
    `;

    if (proj.images && proj.images.length > 0 && typeof proj.images[0] !== 'string') {
        const imgSection = document.createElement('div');
        imgSection.innerHTML = '<h2 style="color: #2563eb; font-size: 22px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">Project Images</h2>';

        proj.images.forEach(img => {
            const imgUrl = typeof img === 'object' ? img.url : img;
            const caption = typeof img === 'object' ? img.caption : '';
            if (!imgUrl) return;

            imgSection.innerHTML += `
                <div style="margin-bottom: 30px; page-break-inside: avoid;">
                    <img src="${imgUrl}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #cbd5e1;" />
                    ${caption ? `<div style="color: #64748b; font-size: 13px; margin-top: 10px; text-align: center; font-style: italic;">${caption}</div>` : ''}
                </div>
            `;
        });
        container.appendChild(imgSection);
    }

    const opt = {
        margin: 0.5,
        filename: `${proj.title.replace(/\s+/g, '_')}_Overview.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save();
}

function generateAllProjectsPDF() {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.fontFamily = 'Inter, sans-serif';
    container.style.color = '#1e293b';
    container.style.background = '#ffffff';

    container.innerHTML = `
        <div style="height: 900px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <h1 style="color: #2563eb; font-size: 40px; margin-bottom: 15px;">Engineering Portfolio</h1>
            <p style="color: #64748b; font-size: 20px;">Taran Govindu</p>
        </div>
    `;

    projects.forEach((proj, idx) => {
        if (!proj.title || proj.title.includes('Title Three') || proj.title.includes('Title Four') || proj.title.includes('Title Five') || proj.title.includes('Title Six')) return;

        const projDiv = document.createElement('div');
        projDiv.style.pageBreakBefore = 'always';

        projDiv.innerHTML = `
            <h1 style="color: #2563eb; margin-bottom: 5px; font-size: 28px;">${proj.title}</h1>
            <p style="color: #64748b; font-size: 16px; margin-bottom: 25px;">${proj.subtitle}</p>
            <div style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 30px;">
                ${proj.description}
            </div>
        `;

        if (proj.images && proj.images.length > 0 && typeof proj.images[0] !== 'string') {
            const imgSection = document.createElement('div');
            imgSection.innerHTML = '<h2 style="color: #2563eb; font-size: 22px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">Project Images</h2>';

            proj.images.forEach(img => {
                const imgUrl = typeof img === 'object' ? img.url : img;
                const caption = typeof img === 'object' ? img.caption : '';
                if (!imgUrl) return;

                imgSection.innerHTML += `
                    <div style="margin-bottom: 30px; page-break-inside: avoid;">
                        <img src="${imgUrl}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #cbd5e1;" />
                        ${caption ? `<div style="color: #64748b; font-size: 13px; margin-top: 10px; text-align: center; font-style: italic;">${caption}</div>` : ''}
                    </div>
                `;
            });
            projDiv.appendChild(imgSection);
        }
        container.appendChild(projDiv);
    });

    const opt = {
        margin: 0.5,
        filename: 'Taran_Govindu_Portfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save();
}

const downloadAllBtn = document.getElementById('download-all-projects');
if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateAllProjectsPDF();
    });
}

// ═══════════════════════════════
// Init
// ═══════════════════════════════
renderFeatured();
renderProjects();
initScrollAnimations();

const initialHash = location.hash.replace('#', '') || 'home';
if (initialHash !== 'home') switchPage(initialHash);
