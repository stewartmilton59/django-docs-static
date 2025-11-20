// Simple search functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (searchQuery) {
        performSearch(searchQuery);
    }
});

function performSearch(query) {
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
        searchInput.value = query;
    }
    
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    // Simple search data - in a real implementation, this would be a comprehensive index
    const searchData = [
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
            title: "Complete Tutorial",
            content: "Comprehensive 7-part tutorial covering all aspects of Django development",
            url: "categories/getting-started/tutorial.html",
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
            title: "Database Migrations",
            content: "Understanding and working with Django migrations for database schema changes",
            url: "categories/models-orm/migrations.html",
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
            title: "Forms and Validation",
            content: "Creating forms, handling form submissions, and implementing validation",
            url: "categories/views-templates/forms.html",
            category: "Views & Templates"
        },
        {
            title: "Deployment Checklist",
            content: "Complete checklist for deploying Django applications to production",
            url: "categories/deployment/production.html",
            category: "Deployment"
        },
        {
            title: "Performance Optimization",
            content: "Techniques for optimizing Django application performance and scalability",
            url: "categories/deployment/performance.html",
            category: "Deployment"
        },
        {
            title: "Security Best Practices",
            content: "Security considerations and best practices for Django applications",
            url: "categories/deployment/security.html",
            category: "Deployment"
        },
        {
            title: "Quick Start Guide",
            content: "Get up and running with Django in 15 minutes with this quick start guide",
            url: "quick-start.html",
            category: "Getting Started"
        }
    ];
    
    const results = searchData.filter(item => {
        const searchText = (item.title + ' ' + item.content + ' ' + item.category).toLowerCase();
        return searchText.includes(query.toLowerCase());
    });
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="alert alert-warning">
                <h4>No results found for "${query}"</h4>
                <p class="mb-0">Try searching with different keywords or browse the categories in the sidebar.</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = `
            <h3>Search Results for "${query}"</h3>
            <p class="text-muted mb-4">Found ${results.length} result(s)</p>
            ${results.map(item => `
                <div class="search-result-item">
                    <h5><a href="${item.url}">${highlightText(item.title, query)}</a></h5>
                    <p class="text-muted mb-1">${item.category}</p>
                    <p class="mb-0">${highlightText(item.content, query)}</p>
                </div>
            `).join('')}
        `;
    }
}

function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}
