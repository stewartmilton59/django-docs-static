// Main JavaScript functionality for Django documentation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add copy to clipboard functionality for code blocks
    initCodeCopyButtons();

    // Add smooth scrolling for anchor links
    initSmoothScrolling();

    // Add back to top button
    initBackToTop();

    // Add active state to current page in sidebar
    highlightCurrentPage();
});

function initCodeCopyButtons() {
    // Add copy buttons to code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-secondary copy-btn';
        button.innerHTML = '<i class="fas fa-copy me-1"></i>Copy';
        button.type = 'button';
        
        block.style.position = 'relative';
        block.appendChild(button);
        
        button.addEventListener('click', async () => {
            const code = block.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy me-1"></i>Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
            }
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initBackToTop() {
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
           (currentPage === 'index.html' && linkHref === 'index.html') ||
           (currentPath.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
