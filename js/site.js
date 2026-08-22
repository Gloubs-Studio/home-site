document.addEventListener("DOMContentLoaded", () => {
    // 1. Load component inclusions
    const loadComponent = (selector, filePath) => {
        const container = document.querySelector(selector);
        if (!container) return Promise.resolve();

        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => console.error(err));
    };

    // Load both sidebar and topbar asynchronously
    Promise.all([
        loadComponent('#sidebar-container', 'components/sidebar.html'),
        loadComponent('#topbar-container', 'components/topbar.html')
    ]).then(() => {
        highlightActiveNav();
    });

    // 2. Set active nav dynamic state
    function highlightActiveNav() {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".sidebar-nav a");

        navLinks.forEach(link => {
            const page = link.getAttribute("data-page");
            if (page === currentPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // 3. Attach hover handlers to video cards
    document.querySelectorAll('.card').forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;
        
        card.addEventListener('mouseenter', () => video.play().catch(() => {}));
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
    
});

function showImage(thumb) {
    // Update main image source
    document.getElementById('current').src = thumb.src;
    // Remove 'active' class from all thumbnails
    document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
    // Highlight the clicked thumbnail
    thumb.classList.add('active');
    }