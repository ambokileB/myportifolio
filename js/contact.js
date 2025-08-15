// ===== CONTACT PAGE FUNCTIONALITY =====

// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const budget = formData.get('budget');
        const timeline = formData.get('timeline');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Use message store to add message
            const messageData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                budget: budget,
                timeline: timeline
            };
            
            // Check if message store is available
            if (typeof messageStore !== 'undefined' && typeof MESSAGE_ACTIONS !== 'undefined') {
                // Add message to store
                messageStore.dispatch({
                    type: MESSAGE_ACTIONS.ADD_MESSAGE,
                    payload: messageData
                });
                
                console.log('Message added to store:', messageData);
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            } else {
                // Fallback to localStorage if store not available
                const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                const newMessage = {
                    id: Date.now(),
                    ...messageData,
                    date: new Date().toISOString(),
                    status: 'unread',
                    readAt: null
                };
                existingMessages.unshift(newMessage);
                localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
                
                console.log('Message saved to localStorage:', newMessage);
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            }
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, 2000);
    });
}

// ===== FAQ FUNCTIONALITY =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-question i');
    
    question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question i');
                
                otherAnswer.style.maxHeight = '0';
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
        } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// ===== CONTACT LINK FUNCTIONALITY =====
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('mailto:') || this.getAttribute('href').startsWith('tel:')) {
            // Let the default behavior handle mailto and tel links
            return;
        }
        
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Handle external links
        if (this.getAttribute('target') === '_blank') {
            window.open(this.getAttribute('href'), '_blank');
        } else {
            window.location.href = this.getAttribute('href');
        }
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

// ===== FORM VALIDATION ENHANCEMENTS =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        
        // Validate on blur
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('error');
        } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    });
    
    // Real-time validation for email
    if (input.type === 'email') {
        input.addEventListener('input', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    }
});

// ===== SOCIAL LINKS ANIMATION =====
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CONTACT INFO ITEMS ANIMATION =====
const contactInfoItems = document.querySelectorAll('.contact-info-item');

contactInfoItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-in');
});

// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to contact form
    const contactFormSection = document.querySelector('.contact-form-section');
    if (contactFormSection) {
        contactFormSection.style.opacity = '0';
        contactFormSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            contactFormSection.style.transition = 'all 0.6s ease';
            contactFormSection.style.opacity = '1';
            contactFormSection.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Initialize contact info animations
    const contactInfoItems = document.querySelectorAll('.contact-info-item');
    contactInfoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});

// ===== RESPONSIVE BEHAVIOR =====
function handleResponsiveContact() {
    const contactGrid = document.querySelector('.contact-grid');
    const contactInfoSection = document.querySelector('.contact-info-section');
    const contactFormSection = document.querySelector('.contact-form-section');
    
    if (window.innerWidth <= 768) {
        // On mobile, reorder sections
        if (contactGrid && contactInfoSection && contactFormSection) {
            contactGrid.insertBefore(contactFormSection, contactInfoSection);
        }
    } else {
        // On desktop, restore original order
        if (contactGrid && contactInfoSection && contactFormSection) {
            contactGrid.insertBefore(contactInfoSection, contactFormSection);
        }
    }
}

// Call on load and resize
window.addEventListener('load', handleResponsiveContact);
window.addEventListener('resize', handleResponsiveContact);
