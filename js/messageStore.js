// ===== MESSAGE STORE - REDUX-LIKE STATE MANAGEMENT =====

// Initial state
const initialState = {
    messages: JSON.parse(localStorage.getItem('contactMessages') || '[]'),
    loading: false,
    error: null,
    filters: {
        status: 'all', // all, unread, read
        dateRange: 'all' // all, today, week, month
    }
};

// Action types
const MESSAGE_ACTIONS = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    MARK_AS_READ: 'MARK_AS_READ',
    MARK_AS_UNREAD: 'MARK_AS_UNREAD',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_FILTER: 'SET_FILTER',
    CLEAR_MESSAGES: 'CLEAR_MESSAGES'
};

// Message store class
class MessageStore {
    constructor() {
        this.state = { ...initialState };
        this.listeners = [];
        this.loadFromStorage();
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners
    notify() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    // Dispatch actions
    dispatch(action) {
        switch (action.type) {
            case MESSAGE_ACTIONS.ADD_MESSAGE:
                this.addMessage(action.payload);
                break;
            case MESSAGE_ACTIONS.MARK_AS_READ:
                this.markAsRead(action.payload);
                break;
            case MESSAGE_ACTIONS.MARK_AS_UNREAD:
                this.markAsUnread(action.payload);
                break;
            case MESSAGE_ACTIONS.DELETE_MESSAGE:
                this.deleteMessage(action.payload);
                break;
            case MESSAGE_ACTIONS.SET_LOADING:
                this.setLoading(action.payload);
                break;
            case MESSAGE_ACTIONS.SET_ERROR:
                this.setError(action.payload);
                break;
            case MESSAGE_ACTIONS.SET_FILTER:
                this.setFilter(action.payload);
                break;
            case MESSAGE_ACTIONS.CLEAR_MESSAGES:
                this.clearMessages();
                break;
            default:
                console.warn('Unknown action type:', action.type);
        }
    }

    // Add new message
    addMessage(messageData) {
        const newMessage = {
            id: Date.now(),
            ...messageData,
            date: new Date().toISOString(),
            status: 'unread',
            readAt: null
        };

        this.state.messages.unshift(newMessage); // Add to beginning
        this.saveToStorage();
        this.notify();
        
        console.log('New message added:', newMessage);
        return newMessage;
    }

    // Mark message as read
    markAsRead(messageId) {
        const message = this.state.messages.find(m => m.id === messageId);
        if (message) {
            message.status = 'read';
            message.readAt = new Date().toISOString();
            this.saveToStorage();
            this.notify();
        }
    }

    // Mark message as unread
    markAsUnread(messageId) {
        const message = this.state.messages.find(m => m.id === messageId);
        if (message) {
            message.status = 'unread';
            message.readAt = null;
            this.saveToStorage();
            this.notify();
        }
    }

    // Delete message
    deleteMessage(messageId) {
        this.state.messages = this.state.messages.filter(m => m.id !== messageId);
        this.saveToStorage();
        this.notify();
    }

    // Set loading state
    setLoading(loading) {
        this.state.loading = loading;
        this.notify();
    }

    // Set error state
    setError(error) {
        this.state.error = error;
        this.notify();
    }

    // Set filter
    setFilter(filter) {
        this.state.filters = { ...this.state.filters, ...filter };
        this.notify();
    }

    // Clear all messages
    clearMessages() {
        this.state.messages = [];
        this.saveToStorage();
        this.notify();
    }

    // Get filtered messages
    getFilteredMessages() {
        let filtered = [...this.state.messages];

        // Filter by status
        if (this.state.filters.status !== 'all') {
            filtered = filtered.filter(m => m.status === this.state.filters.status);
        }

        // Filter by date range
        if (this.state.filters.dateRange !== 'all') {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            switch (this.state.filters.dateRange) {
                case 'today':
                    filtered = filtered.filter(m => new Date(m.date) >= today);
                    break;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    filtered = filtered.filter(m => new Date(m.date) >= weekAgo);
                    break;
                case 'month':
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    filtered = filtered.filter(m => new Date(m.date) >= monthAgo);
                    break;
            }
        }

        return filtered;
    }

    // Get message statistics
    getStats() {
        const total = this.state.messages.length;
        const unread = this.state.messages.filter(m => m.status === 'unread').length;
        const read = total - unread;
        
        return { total, unread, read };
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('contactMessages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.error('Error saving messages to localStorage:', error);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('contactMessages');
            if (stored) {
                this.state.messages = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading messages from localStorage:', error);
            this.state.messages = [];
        }
    }

    // Export messages as JSON
    exportMessages() {
        return JSON.stringify(this.state.messages, null, 2);
    }

    // Import messages from JSON
    importMessages(jsonData) {
        try {
            const messages = JSON.parse(jsonData);
            if (Array.isArray(messages)) {
                this.state.messages = messages;
                this.saveToStorage();
                this.notify();
                return true;
            }
        } catch (error) {
            console.error('Error importing messages:', error);
            return false;
        }
    }
}

// Create global message store instance
const messageStore = new MessageStore();

// Export for use in other files
window.messageStore = messageStore;
window.MESSAGE_ACTIONS = MESSAGE_ACTIONS;
