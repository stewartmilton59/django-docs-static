// Search functionality for static documentation
class DocumentationSearch {
    constructor() {
        this.searchIndex = [];
        this.init();
    }

    async init() {
        await this.loadSearchIndex();
        this.setupEventListeners();
    }

    async loadSearchIndex() {
        // This would typically load from a JSON file
        // For now, we'll use a hardcoded index
        this.searchIndex = [
            {
                title: "Installation Guide",
                content: "How to install Django using pip and set up your development environment",
                url: "categories/getting-started/installation.html",
                category: "Getting Started"
            },
            {
                title: "Writing Your First Django App",
                content: "Step-by-step guide to creating your first Django application with models, views, and templates",
                url: "categories/getting-started/first-project.html",
                category: "Getting Started"
            },
            {
                title: "Models and Fields",
                content: "Learn about Django models, fields, relationships, and model methods",
                url: "categories/models-orm/models.html",
                category: "Models & ORM"
            },
            {
                title: "Making Queries",
                content: "How to make database queries using Django's ORM with filter, exclude, and Q objects",
                url: "categories/models-orm/queries.html",
                category: "Models & ORM"
            },
            {
                title: "Class-based and Function Views",
                content: "Understanding Django views, both function-based and class-based views",
                url: "categories/views-templates/views.html",
                category: "Views & Templates"
            },
            {
                title: "Template Language",
                content: "Django template language syntax, tags, filters, and template inheritance",
                url: "categories/views-templates/templates.html",
                category: "Views & Templates"
            },
            {
                title: "Deployment Checklist",
                content: "Complete checklist for deploying Django applications to production",
                url: "categories/deployment/production.html",
                category: "Deployment"
            }
        ];
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('focus', () => {
                this.showSearchResults();
            });

            // Hide results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchResults();
                }
            });
        }
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = this.searchDocuments(query);
        this.displayResults(results);
        this.showSearchResults();
    }

    searchDocuments(query) {
        const searchTerms = query.toLowerCase().split(' ');
        
        return this.searchIndex.filter(doc => {
            const searchableText = (
                doc.title + ' ' + doc.content + ' ' + doc.category
            ).toLowerCase();
            
            return searchTerms.every(term => 
                searchableText.includes(term)
            );
        }).slice(0, 5); // Limit to 5 results
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-result-item text-muted">
                    No results found
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(doc => `
            <a href="${doc.url}" class="search-result-item">
                <div class="fw-bold">${this.highlightText(doc.title, doc.title)}</div>
                <small class="text-muted">${doc.category} • ${this.highlightText(doc.content, doc.content.substring(0, 60))}...</small>
            </a>
        `).join('');
    }

    highlightText(query, text) {
        const searchTerms = query.toLowerCase().split(' ');
        let highlighted = text;
        
        searchTerms.forEach(term => {
            if (term.length < 2) return;
            const regex = new RegExp(`(${term})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });
        
        return highlighted;
    }

    showSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
        }
    }

    hideSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocumentationSearch();
});
