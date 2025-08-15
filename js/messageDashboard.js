// ===== MESSAGE DASHBOARD FUNCTIONALITY =====

// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Global variables
let currentMessageId = null;
let filteredMessages = [];

// DOM elements
const messagesList = document.getElementById('messagesList');
const noMessages = document.getElementById('noMessages');
const messageModal = document.getElementById('messageModal');
const modalClose = document.getElementById('modalClose');
const statusFilter = document.getElementById('statusFilter');
const dateFilter = document.getElementById('dateFilter');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

// Statistics elements
const totalMessagesEl = document.getElementById('totalMessages');
const unreadMessagesEl = document.getElementById('unreadMessages');
const readMessagesEl = document.getElementById('readMessages');
const todayMessagesEl = document.getElementById('todayMessages');

// Modal elements
const modalTitle = document.getElementById('modalTitle');
const modalName = document.getElementById('modalName');
const modalEmail = document.getElementById('modalEmail');
const modalSubject = document.getElementById('modalSubject');
const modalDate = document.getElementById('modalDate');
const modalBudget = document.getElementById('modalBudget');
const modalTimeline = document.getElementById('modalTimeline');
const modalMessage = document.getElementById('modalMessage');
const replyBtn = document.getElementById('replyBtn');
const markReadBtn = document.getElementById('markReadBtn');
const deleteBtn = document.getElementById('deleteBtn');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Wait for message store to be available
    if (typeof messageStore !== 'undefined' && typeof MESSAGE_ACTIONS !== 'undefined') {
        initializeDashboard();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (typeof messageStore !== 'undefined' && typeof MESSAGE_ACTIONS !== 'undefined') {
                initializeDashboard();
            } else {
                console.error('Message store not available');
                showNotification('Error loading message dashboard', 'error');
            }
        }, 100);
    }
});

function initializeDashboard() {
    // Subscribe to message store changes
    messageStore.subscribe(handleStoreUpdate);
    
    // Initialize dashboard
    updateDashboard();
    
    // Add event listeners
    addEventListeners();
    
    console.log('Message dashboard initialized successfully');
}

// ===== EVENT LISTENERS =====
function addEventListeners() {
    // Filter changes
    statusFilter.addEventListener('change', updateDashboard);
    dateFilter.addEventListener('change', updateDashboard);
    
    // Action buttons
    exportBtn.addEventListener('click', exportMessages);
    clearBtn.addEventListener('click', clearAllMessages);
    
    // Modal events
    modalClose.addEventListener('click', closeModal);
    replyBtn.addEventListener('click', replyToMessage);
    markReadBtn.addEventListener('click', toggleMessageStatus);
    deleteBtn.addEventListener('click', deleteCurrentMessage);
    
    // Close modal on outside click
    messageModal.addEventListener('click', function(e) {
        if (e.target === messageModal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && messageModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===== STORE UPDATE HANDLER =====
function handleStoreUpdate(state) {
    updateDashboard();
}

// ===== DASHBOARD UPDATE =====
function updateDashboard() {
    const state = messageStore.getState();
    const stats = messageStore.getStats();
    
    // Update statistics
    updateStatistics(stats);
    
    // Get filtered messages
    filteredMessages = messageStore.getFilteredMessages();
    
    // Update messages list
    renderMessages(filteredMessages);
}

// ===== UPDATE STATISTICS =====
function updateStatistics(stats) {
    totalMessagesEl.textContent = stats.total;
    unreadMessagesEl.textContent = stats.unread;
    readMessagesEl.textContent = stats.read;
    
    // Calculate today's messages
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMessages = messageStore.getState().messages.filter(m => {
        const messageDate = new Date(m.date);
        return messageDate >= today;
    }).length;
    
    todayMessagesEl.textContent = todayMessages;
}

// ===== RENDER MESSAGES =====
function renderMessages(messages) {
    if (messages.length === 0) {
        messagesList.style.display = 'none';
        noMessages.style.display = 'block';
        return;
    }
    
    messagesList.style.display = 'block';
    noMessages.style.display = 'none';
    
    messagesList.innerHTML = messages.map(message => createMessageCard(message)).join('');
    
    // Add click listeners to message cards
    const messageCards = messagesList.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('click', () => openMessageModal(card.dataset.messageId));
    });
}

// ===== CREATE MESSAGE CARD =====
function createMessageCard(message) {
    const date = new Date(message.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const statusClass = message.status === 'unread' ? 'unread' : 'read';
    const statusIcon = message.status === 'unread' ? 'fa-envelope' : 'fa-envelope-open';
    
    return `
        <div class="message-card ${statusClass}" data-message-id="${message.id}">
            <div class="message-header">
                <div class="message-status">
                    <i class="fas ${statusIcon}"></i>
                </div>
                <div class="message-info">
                    <h3 class="message-name">${message.name}</h3>
                    <p class="message-subject">${message.subject}</p>
                    <p class="message-date">${formattedDate}</p>
                </div>
                <div class="message-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); openMessageModal(${message.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); toggleMessageStatus(${message.id})">
                        <i class="fas ${message.status === 'unread' ? 'fa-check' : 'fa-envelope'}"></i>
                    </button>
                    <button class="action-btn delete" onclick="event.stopPropagation(); deleteMessage(${message.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="message-preview">
                <p>${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}</p>
            </div>
            <div class="message-meta">
                <span class="meta-item">
                    <i class="fas fa-envelope"></i>
                    ${message.email}
                </span>
                ${message.budget ? `<span class="meta-item">
                    <i class="fas fa-dollar-sign"></i>
                    ${message.budget}
                </span>` : ''}
                ${message.timeline ? `<span class="meta-item">
                    <i class="fas fa-clock"></i>
                    ${message.timeline}
                </span>` : ''}
            </div>
        </div>
    `;
}

// ===== MODAL FUNCTIONS =====
function openMessageModal(messageId) {
    const message = messageStore.getState().messages.find(m => m.id == messageId);
    if (!message) return;
    
    currentMessageId = messageId;
    
    // Populate modal
    modalTitle.textContent = `Message from ${message.name}`;
    modalName.textContent = message.name;
    modalEmail.textContent = message.email;
    modalSubject.textContent = message.subject;
    modalDate.textContent = new Date(message.date).toLocaleString();
    modalBudget.textContent = message.budget || 'Not specified';
    modalTimeline.textContent = message.timeline || 'Not specified';
    modalMessage.textContent = message.message;
    
    // Update button text based on status
    markReadBtn.innerHTML = message.status === 'unread' 
        ? '<i class="fas fa-check"></i> Mark as Read'
        : '<i class="fas fa-envelope"></i> Mark as Unread';
    
    // Show modal
    messageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    messageModal.classList.remove('active');
    document.body.style.overflow = '';
    currentMessageId = null;
}

// ===== MESSAGE ACTIONS =====
function toggleMessageStatus(messageId = currentMessageId) {
    if (!messageId) return;
    
    const message = messageStore.getState().messages.find(m => m.id == messageId);
    if (!message) return;
    
    if (message.status === 'unread') {
        messageStore.dispatch({
            type: MESSAGE_ACTIONS.MARK_AS_READ,
            payload: messageId
        });
    } else {
        messageStore.dispatch({
            type: MESSAGE_ACTIONS.MARK_AS_UNREAD,
            payload: messageId
        });
    }
    
    showNotification(`Message marked as ${message.status === 'unread' ? 'read' : 'unread'}`, 'success');
}

function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message?')) {
        messageStore.dispatch({
            type: MESSAGE_ACTIONS.DELETE_MESSAGE,
            payload: messageId
        });
        
        if (currentMessageId == messageId) {
            closeModal();
        }
        
        showNotification('Message deleted successfully', 'success');
    }
}

function deleteCurrentMessage() {
    if (currentMessageId) {
        deleteMessage(currentMessageId);
    }
}

function replyToMessage() {
    if (!currentMessageId) return;
    
    const message = messageStore.getState().messages.find(m => m.id == currentMessageId);
    if (!message) return;
    
    // Open default email client
    const subject = `Re: ${message.subject}`;
    const body = `Hi ${message.name},\n\nThank you for your message. I'll get back to you soon.\n\nBest regards,\nBaraka H Ambokile`;
    
    const mailtoLink = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    showNotification('Opening email client...', 'info');
}

// ===== EXPORT AND CLEAR =====
function exportMessages() {
    const messages = messageStore.exportMessages();
    const blob = new Blob([messages], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Messages exported successfully', 'success');
}

function clearAllMessages() {
    if (confirm('Are you sure you want to delete ALL messages? This action cannot be undone.')) {
        messageStore.dispatch({
            type: MESSAGE_ACTIONS.CLEAR_MESSAGES
        });
        
        closeModal();
        showNotification('All messages cleared', 'success');
    }
}

// ===== UTILITY FUNCTIONS =====
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

// ===== REAL-TIME UPDATES =====
// Check for new messages every 30 seconds
setInterval(() => {
    const currentCount = messageStore.getState().messages.length;
    const storedCount = parseInt(localStorage.getItem('messageCount') || '0');
    
    if (currentCount > storedCount) {
        localStorage.setItem('messageCount', currentCount.toString());
        showNotification(`You have ${currentCount - storedCount} new message(s)!`, 'info');
    }
}, 30000);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input when implemented
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportMessages();
    }
});

// ===== AUTO-REFRESH =====
// Refresh dashboard every 5 minutes
setInterval(() => {
    updateDashboard();
}, 300000);

// ===== TEST FUNCTION =====
// Add this to browser console to test: addTestMessage()
window.addTestMessage = function() {
    if (typeof messageStore !== 'undefined') {
        const testMessage = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Message',
            message: 'This is a test message to verify the system is working.',
            budget: 'Let\'s discuss',
            timeline: 'Flexible'
        };
        
        messageStore.dispatch({
            type: MESSAGE_ACTIONS.ADD_MESSAGE,
            payload: testMessage
        });
        
        console.log('Test message added!');
        showNotification('Test message added successfully!', 'success');
    } else {
        console.error('Message store not available');
    }
};

// Debug function to check current state
window.checkMessages = function() {
    if (typeof messageStore !== 'undefined') {
        const state = messageStore.getState();
        console.log('Current message store state:', state);
        console.log('Total messages:', state.messages.length);
        console.log('Messages:', state.messages);
        
        // Also check localStorage
        const stored = localStorage.getItem('contactMessages');
        console.log('localStorage data:', stored);
        
        return state;
    } else {
        console.error('Message store not available');
        return null;
    }
};
