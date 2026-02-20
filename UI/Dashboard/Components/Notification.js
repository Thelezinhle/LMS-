/**
 * iNurture LMS - Notification System
 * Author: Thelezinhle
 * Description: Toast notification system for user feedback
 * Created: 2026
 */

// ==================== Notification Configuration ====================

const NOTIFICATION_CONFIG = {
  position: 'top-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  duration: 4000,        // Default duration in ms
  maxNotifications: 5,   // Maximum notifications visible at once
  animationDuration: 300 // Animation duration in ms
};

// Store for active notifications
let notificationContainer = null;
let notifications = [];
let notificationId = 0;

// ==================== Notification Styles ====================

const notificationStyles = `
  .notification-container {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    width: 100%;
    padding: 10px;
    pointer-events: none;
  }

  .notification-container.top-right {
    top: 20px;
    right: 20px;
  }

  .notification-container.top-left {
    top: 20px;
    left: 20px;
  }

  .notification-container.top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notification-container.bottom-right {
    bottom: 20px;
    right: 20px;
  }

  .notification-container.bottom-left {
    bottom: 20px;
    left: 20px;
  }

  .notification-container.bottom-center {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notification-toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    animation: slideIn 0.3s ease-out;
    border-left: 4px solid;
    max-width: 100%;
  }

  .notification-toast.removing {
    animation: slideOut 0.3s ease-in forwards;
  }

  .notification-toast.success {
    border-left-color: #48bb78;
    background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, #fff 100%);
  }

  .notification-toast.error {
    border-left-color: #e53e3e;
    background: linear-gradient(135deg, rgba(229, 62, 62, 0.1) 0%, #fff 100%);
  }

  .notification-toast.warning {
    border-left-color: #ed8936;
    background: linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, #fff 100%);
  }

  .notification-toast.info {
    border-left-color: #4299e1;
    background: linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, #fff 100%);
  }

  .notification-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 14px;
  }

  .notification-toast.success .notification-icon {
    background: rgba(72, 187, 120, 0.2);
    color: #48bb78;
  }

  .notification-toast.error .notification-icon {
    background: rgba(229, 62, 62, 0.2);
    color: #e53e3e;
  }

  .notification-toast.warning .notification-icon {
    background: rgba(237, 137, 54, 0.2);
    color: #ed8936;
  }

  .notification-toast.info .notification-icon {
    background: rgba(66, 153, 225, 0.2);
    color: #4299e1;
  }

  .notification-content {
    flex: 1;
    min-width: 0;
  }

  .notification-title {
    font-weight: 600;
    font-size: 14px;
    color: #2d3748;
    margin-bottom: 4px;
  }

  .notification-message {
    font-size: 13px;
    color: #4a5568;
    line-height: 1.4;
    word-wrap: break-word;
  }

  .notification-close {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #a0aec0;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-size: 16px;
  }

  .notification-close:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #4a5568;
  }

  .notification-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 0 0 0 12px;
    animation: progress linear forwards;
  }

  .notification-toast.success .notification-progress {
    background: #48bb78;
  }

  .notification-toast.error .notification-progress {
    background: #e53e3e;
  }

  .notification-toast.warning .notification-progress {
    background: #ed8936;
  }

  .notification-toast.info .notification-progress {
    background: #4299e1;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  /* Mobile Responsive */
  @media (max-width: 480px) {
    .notification-container {
      left: 10px !important;
      right: 10px !important;
      transform: none !important;
      max-width: none;
    }

    .notification-toast {
      padding: 12px;
    }
  }
`;

// ==================== Notification Icons ====================

const icons = {
  success: '<i class="fas fa-check"></i>',
  error: '<i class="fas fa-times"></i>',
  warning: '<i class="fas fa-exclamation"></i>',
  info: '<i class="fas fa-info"></i>'
};

// ==================== Initialize Notification System ====================

/**
 * Initialize the notification container
 */
function initNotificationContainer() {
  if (notificationContainer) return;

  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = notificationStyles;
  document.head.appendChild(styleSheet);

  // Create container
  notificationContainer = document.createElement('div');
  notificationContainer.className = `notification-container ${NOTIFICATION_CONFIG.position}`;
  document.body.appendChild(notificationContainer);
}

// ==================== Core Notification Functions ====================

/**
 * Show a notification
 * @param {Object} options - Notification options
 * @returns {number} - Notification ID
 */
export function showNotification(options) {
  initNotificationContainer();

  const {
    type = 'info',
    title = '',
    message = '',
    duration = NOTIFICATION_CONFIG.duration,
    closeable = true,
    showProgress = true,
    onClick = null
  } = options;

  const id = ++notificationId;

  // Remove oldest notification if max reached
  if (notifications.length >= NOTIFICATION_CONFIG.maxNotifications) {
    removeNotification(notifications[0].id);
  }

  // Create notification element
  const toast = document.createElement('div');
  toast.className = `notification-toast ${type}`;
  toast.dataset.notificationId = id;
  toast.style.position = 'relative';
  toast.style.overflow = 'hidden';

  toast.innerHTML = `
    <div class="notification-icon">
      ${icons[type] || icons.info}
    </div>
    <div class="notification-content">
      ${title ? `<div class="notification-title">${escapeHtml(title)}</div>` : ''}
      ${message ? `<div class="notification-message">${escapeHtml(message)}</div>` : ''}
    </div>
    ${closeable ? '<button class="notification-close" aria-label="Close">&times;</button>' : ''}
    ${showProgress && duration > 0 ? `<div class="notification-progress" style="animation-duration: ${duration}ms"></div>` : ''}
  `;

  // Handle click
  if (onClick) {
    toast.style.cursor = 'pointer';
    toast.addEventListener('click', (e) => {
      if (!e.target.classList.contains('notification-close')) {
        onClick();
      }
    });
  }

  // Handle close button
  const closeBtn = toast.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => removeNotification(id));
  }

  // Add to container
  notificationContainer.appendChild(toast);

  // Store notification
  const notification = {
    id,
    element: toast,
    timeout: duration > 0 ? setTimeout(() => removeNotification(id), duration) : null
  };
  notifications.push(notification);

  return id;
}

/**
 * Remove a notification
 * @param {number} id - Notification ID
 */
export function removeNotification(id) {
  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) return;

  const notification = notifications[index];
  
  // Clear timeout
  if (notification.timeout) {
    clearTimeout(notification.timeout);
  }

  // Animate out
  notification.element.classList.add('removing');
  
  setTimeout(() => {
    if (notification.element.parentNode) {
      notification.element.parentNode.removeChild(notification.element);
    }
  }, NOTIFICATION_CONFIG.animationDuration);

  // Remove from array
  notifications.splice(index, 1);
}

/**
 * Remove all notifications
 */
export function clearAllNotifications() {
  [...notifications].forEach(n => removeNotification(n.id));
}

// ==================== Convenience Methods ====================

/**
 * Show a success notification
 * @param {string} message - Message
 * @param {string} title - Title (optional)
 * @param {Object} options - Additional options
 * @returns {number}
 */
export function success(message, title = 'Success', options = {}) {
  return showNotification({ type: 'success', message, title, ...options });
}

/**
 * Show an error notification
 * @param {string} message - Message
 * @param {string} title - Title (optional)
 * @param {Object} options - Additional options
 * @returns {number}
 */
export function error(message, title = 'Error', options = {}) {
  return showNotification({ type: 'error', message, title, ...options });
}

/**
 * Show a warning notification
 * @param {string} message - Message
 * @param {string} title - Title (optional)
 * @param {Object} options - Additional options
 * @returns {number}
 */
export function warning(message, title = 'Warning', options = {}) {
  return showNotification({ type: 'warning', message, title, ...options });
}

/**
 * Show an info notification
 * @param {string} message - Message
 * @param {string} title - Title (optional)
 * @param {Object} options - Additional options
 * @returns {number}
 */
export function info(message, title = 'Info', options = {}) {
  return showNotification({ type: 'info', message, title, ...options });
}

// ==================== Configuration ====================

/**
 * Update notification configuration
 * @param {Object} config - Configuration options
 */
export function configure(config) {
  Object.assign(NOTIFICATION_CONFIG, config);
  
  if (notificationContainer && config.position) {
    notificationContainer.className = `notification-container ${config.position}`;
  }
}

// ==================== Helper Functions ====================

/**
 * Escape HTML to prevent XSS
 * @param {string} str - Input string
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==================== Export Default ====================

const Notification = {
  show: showNotification,
  remove: removeNotification,
  clear: clearAllNotifications,
  success,
  error,
  warning,
  info,
  configure
};

// Make globally available
if (typeof window !== 'undefined') {
  window.Notification = Notification;
}

export default Notification;
