/* exhibit.js — museum UI enhancements */
document.addEventListener('DOMContentLoaded', () => {

    // ── INJECT PROGRESS BAR ──
    const bar = document.createElement('div');
    bar.id = 'progress-bar';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
    }, { passive: true });

    // ── INJECT LIGHTBOX ──
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = '<button id="lightbox-close" aria-label="Close">✕</button><img id="lightbox-img" src="" alt="">';
    document.body.appendChild(lb);

    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.artifact-image-wrapper').forEach(w => {
        w.addEventListener('click', () => {
            const img = w.querySelector('.artifact-image');
            if (img) {
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lb.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

    // ── NAVBAR SHRINK ──
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        reveals.forEach(el => obs.observe(el));
    }

    // ── TYPEWRITER — index page only ──
    const heading = document.querySelector('.introduction h2');
    if (heading) {
        const text = heading.textContent.trim();
        heading.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                heading.textContent += text[i++];
                setTimeout(type, 42);
            } else {
                heading.classList.add('cursor-done');
            }
        };
        setTimeout(type, 400);
    }

    // ── HERO STAGGER ENTRANCE ──
    const heroEls = document.querySelectorAll('.hero-inner > *');
    heroEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s ease ${0.2 + i * 0.12}s, transform 0.8s ease ${0.2 + i * 0.12}s`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    });

});
