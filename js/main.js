// Main JavaScript functionality for Django documentation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add copy to clipboard functionality for code blocks
    initCodeCopyButtons();

    // Add table of contents for documentation pages
    initTableOfContents();

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
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        
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

function initTableOfContents() {
    const content = document.querySelector('.doc-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    const toc = document.createElement('div');
    toc.className = 'card toc-sidebar';
    toc.innerHTML = `
        <div class="card-header">
            <h6 class="mb-0">Table of Contents</h6>
        </div>
        <div class="card-body">
            <nav id="table-of-contents"></nav>
        </div>
    `;

    const mainContent = document.querySelector('.main-content');
    if (mainContent.querySelector('.row .col-lg-9')) {
        const sidebarCol = mainContent.querySelector('.row .col-lg-3');
        if (sidebarCol) {
            sidebarCol.insertBefore(toc, sidebarCol.firstChild);
        }
    }

    const tocNav = document.getElementById('table-of-contents');
    let currentList = tocNav;

    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.className = `toc-link toc-${heading.tagName.toLowerCase()}`;
        link.textContent = heading.textContent;

        if (heading.tagName === 'H2') {
            const item = document.createElement('div');
            item.className = 'toc-item';
            item.appendChild(link);
            tocNav.appendChild(item);
            currentList = item;
        } else if (heading.tagName === 'H3' && currentList) {
            const subList = currentList.querySelector('.toc-subitems') || document.createElement('div');
            subList.className = 'toc-subitems ms-3';
            const subItem = document.createElement('div');
            subItem.className = 'toc-subitem';
            subItem.appendChild(link);
            subList.appendChild(subItem);
            currentList.appendChild(subList);
        }
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || 
            link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
