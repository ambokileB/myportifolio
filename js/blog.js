// ===== BLOG PAGE FUNCTIONALITY =====

// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===== BLOG CATEGORY FILTERING =====
const categoryBtns = document.querySelectorAll('.category-btn');
const blogPosts = document.querySelectorAll('.blog-post');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filter = this.getAttribute('data-category');
        
        // Filter blog posts with animation
        blogPosts.forEach(post => {
            const category = post.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                post.style.display = 'block';
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 100);
            } else {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
        
        // Update URL hash for bookmarking
        if (filter !== 'all') {
            window.location.hash = `category=${filter}`;
        } else {
            window.location.hash = '';
        }
    });
});

// ===== LOAD MORE FUNCTIONALITY =====
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 1;
const postsPerPage = 6;

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        // Simulate loading more posts
        setTimeout(() => {
            // Add more blog posts (in a real app, this would fetch from an API)
            const blogGrid = document.querySelector('.blog-grid');
            
            // Example of additional posts
            const additionalPosts = [
                {
                    category: 'software',
                    image: 'images/blog/microservices.jpg',
                    alt: 'Microservices Architecture',
                    categoryText: 'Software Development',
                    date: 'February 10, 2024',
                    readTime: '7 min read',
                    title: 'Microservices Architecture Best Practices',
                    excerpt: 'Learn how to design and implement scalable microservices architecture. This guide covers service discovery, load balancing, and distributed systems.',
                    tags: ['Microservices', 'Architecture', 'Scalability']
                },
                {
                    category: 'ai',
                    image: 'images/blog/nlp-applications.jpg',
                    alt: 'NLP Applications',
                    categoryText: 'Machine Learning',
                    date: 'February 5, 2024',
                    readTime: '13 min read',
                    title: 'Natural Language Processing Applications',
                    excerpt: 'Explore practical applications of NLP in real-world scenarios. From chatbots to sentiment analysis, discover how NLP is transforming industries.',
                    tags: ['NLP', 'Machine Learning', 'AI']
                }
            ];
            
            // Create and append new blog posts
            additionalPosts.forEach((post, index) => {
                const postElement = createBlogPost(post, currentPage * postsPerPage + index + 1);
                blogGrid.appendChild(postElement);
            });
            
            currentPage++;
            
            // Hide load more button if no more posts
            if (currentPage >= 3) { // Assuming we have 3 pages of content
                this.style.display = 'none';
            }
            
            // Reset button
            this.innerHTML = originalText;
            this.disabled = false;
            
        }, 1500);
    });
}

// ===== CREATE BLOG POST ELEMENT =====
function createBlogPost(postData, delay) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.setAttribute('data-category', postData.category);
    article.setAttribute('data-aos', 'fade-up');
    article.setAttribute('data-aos-delay', delay * 100);
    
    article.innerHTML = `
        <div class="blog-image">
            <img src="${postData.image}" alt="${postData.alt}">
            <div class="blog-category">${postData.categoryText}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date"><i class="fas fa-calendar"></i> ${postData.date}</span>
                <span class="blog-read-time"><i class="fas fa-clock"></i> ${postData.readTime}</span>
            </div>
            <h2><a href="blog-post.html">${postData.title}</a></h2>
            <p>${postData.excerpt}</p>
            <div class="blog-tags">
                ${postData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="blog-post.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return article;
}

// ===== NEWSLETTER SUBSCRIPTION =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate subscription (replace with actual API call)
        setTimeout(() => {
            // Store subscription in localStorage
            const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
            if (!subscriptions.includes(email)) {
                subscriptions.push(email);
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            }
            
            // Show success message
            showNotification('Successfully subscribed to the newsletter!', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, 1500);
    });
}

// ===== BLOG POST INTERACTIONS =====
const blogPostLinks = document.querySelectorAll('.blog-post h2 a, .blog-post .read-more');

blogPostLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // In a real app, this would navigate to the blog post
        // For now, show a notification
        const postTitle = this.closest('.blog-post').querySelector('h2 a').textContent;
        showNotification(`Opening: ${postTitle}`, 'info');
        
        // Simulate navigation delay
        setTimeout(() => {
            // Navigate to blog post page (create this page later)
            window.location.href = 'blog-post.html';
        }, 1000);
    });
});

// ===== BLOG POST HOVER EFFECTS =====
const blogPostsElements = document.querySelectorAll('.blog-post');

blogPostsElements.forEach(post => {
    post.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
    
    post.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// ===== TAG INTERACTIONS =====
const blogTags = document.querySelectorAll('.blog-tags .tag');

blogTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const tagText = this.textContent;
        
        // Filter posts by tag
        blogPosts.forEach(post => {
            const postTags = Array.from(post.querySelectorAll('.tag')).map(t => t.textContent);
            
            if (postTags.includes(tagText)) {
                post.style.display = 'block';
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 100);
            } else {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
        
        // Update category button
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.category-btn[data-category="all"]').classList.add('active');
        
        // Show notification
        showNotification(`Filtered by tag: ${tagText}`, 'info');
    });
});

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ===== URL HASH HANDLING =====
function handleUrlHash() {
    const hash = window.location.hash;
    if (hash.includes('category=')) {
        const category = hash.split('=')[1];
        const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
        if (categoryBtn) {
            categoryBtn.click();
        }
    }
}

// Handle URL hash on page load
window.addEventListener('load', handleUrlHash);

// ===== SEARCH FUNCTIONALITY (Future Enhancement) =====
function initializeSearch() {
    // Add search input to blog page
    const searchContainer = document.createElement('div');
    searchContainer.className = 'blog-search';
    searchContainer.innerHTML = `
        <div class="search-input">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search articles..." id="blogSearch">
        </div>
    `;
    
    // Insert search before blog grid
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid && blogGrid.parentNode) {
        blogGrid.parentNode.insertBefore(searchContainer, blogGrid);
    }
    
    // Add search functionality
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h2 a').textContent.toLowerCase();
                const excerpt = post.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(post.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                              excerpt.includes(searchTerm) || 
                              tags.some(tag => tag.includes(searchTerm));
                
                if (matches) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search after a short delay
    setTimeout(initializeSearch, 1000);
});

// ===== READING TIME CALCULATION =====
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
}

// ===== SHARE FUNCTIONALITY =====
function addShareButtons() {
    const shareButtons = document.querySelectorAll('.blog-post');
    
    shareButtons.forEach(post => {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-buttons';
        shareContainer.innerHTML = `
            <button class="share-btn" data-platform="twitter">
                <i class="fab fa-twitter"></i>
            </button>
            <button class="share-btn" data-platform="linkedin">
                <i class="fab fa-linkedin"></i>
            </button>
            <button class="share-btn" data-platform="facebook">
                <i class="fab fa-facebook"></i>
            </button>
        `;
        
        post.querySelector('.blog-content').appendChild(shareContainer);
        
        // Add share functionality
        const shareBtns = shareContainer.querySelectorAll('.share-btn');
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const postTitle = post.querySelector('h2 a').textContent;
                const postUrl = window.location.href;
                
                let shareUrl = '';
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    });
}

// Initialize share buttons
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addShareButtons, 1500);
});
