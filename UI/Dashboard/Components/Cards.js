/**
 * iNurture LMS - Card Component System
 * Author: Thelezinhle
 * Description: Reusable card components for courses, stats, and more
 * Created: 2026
 */

// ==================== Card Styles ====================

const cardStyles = `
  /* Base Card */
  .card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .card-header {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .card-body {
    padding: 20px;
  }

  .card-footer {
    padding: 16px 20px;
    background: #f7fafc;
    border-top: 1px solid #f0f0f0;
  }

  /* Course Card */
  .course-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .course-card-image {
    position: relative;
    height: 180px;
    overflow: hidden;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
  }

  .course-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .course-card:hover .course-card-image img {
    transform: scale(1.05);
  }

  .course-card-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .course-card-badge.new {
    background: #48bb78;
    color: white;
  }

  .course-card-badge.popular {
    background: #ed8936;
    color: white;
  }

  .course-card-badge.premium {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .course-card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .course-card-category {
    font-size: 12px;
    font-weight: 600;
    color: #3182ce;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .course-card-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-card-description {
    font-size: 14px;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 16px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-card-meta {
    display: flex;
    gap: 16px;
    font-size: 13px;
    color: #718096;
  }

  .course-card-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .course-card-meta-item i {
    color: #a0aec0;
  }

  .course-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #f7fafc;
    border-top: 1px solid #f0f0f0;
  }

  .course-card-progress {
    flex: 1;
    margin-right: 16px;
  }

  .course-card-progress-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .course-card-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  .course-card-progress-text {
    font-size: 12px;
    color: #718096;
    margin-top: 4px;
  }

  .course-card-action {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    color: white;
  }

  .course-card-action:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  /* Stats Card */
  .stats-card {
    padding: 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .stats-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }

  .stats-card-icon.primary {
    background: rgba(49, 130, 206, 0.15);
    color: #3182ce;
  }

  .stats-card-icon.success {
    background: rgba(72, 187, 120, 0.15);
    color: #48bb78;
  }

  .stats-card-icon.warning {
    background: rgba(237, 137, 54, 0.15);
    color: #ed8936;
  }

  .stats-card-icon.danger {
    background: rgba(229, 62, 62, 0.15);
    color: #e53e3e;
  }

  .stats-card-content {
    flex: 1;
  }

  .stats-card-label {
    font-size: 14px;
    color: #718096;
    margin-bottom: 4px;
  }

  .stats-card-value {
    font-size: 28px;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.2;
  }

  .stats-card-change {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .stats-card-change.positive {
    background: rgba(72, 187, 120, 0.15);
    color: #48bb78;
  }

  .stats-card-change.negative {
    background: rgba(229, 62, 62, 0.15);
    color: #e53e3e;
  }

  /* User Card */
  .user-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
  }

  .user-card-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 600;
  }

  .user-card-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-card-info {
    flex: 1;
    min-width: 0;
  }

  .user-card-name {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-card-role {
    font-size: 13px;
    color: #718096;
  }

  .user-card-email {
    font-size: 13px;
    color: #a0aec0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Message Card */
  .message-card {
    display: flex;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .message-card:hover {
    background: #f7fafc;
  }

  .message-card.unread {
    background: rgba(49, 130, 206, 0.05);
  }

  .message-card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  .message-card-content {
    flex: 1;
    min-width: 0;
  }

  .message-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .message-card-sender {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
  }

  .message-card-time {
    font-size: 12px;
    color: #a0aec0;
  }

  .message-card-preview {
    font-size: 13px;
    color: #718096;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .message-card.unread .message-card-preview {
    font-weight: 500;
    color: #4a5568;
  }

  /* Notification Card */
  .notification-card {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 12px;
    background: #f7fafc;
    margin-bottom: 12px;
  }

  .notification-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }

  .notification-card-icon.info {
    background: rgba(66, 153, 225, 0.15);
    color: #4299e1;
  }

  .notification-card-icon.success {
    background: rgba(72, 187, 120, 0.15);
    color: #48bb78;
  }

  .notification-card-icon.warning {
    background: rgba(237, 137, 54, 0.15);
    color: #ed8936;
  }

  .notification-card-content {
    flex: 1;
  }

  .notification-card-title {
    font-size: 14px;
    font-weight: 500;
    color: #2d3748;
    margin-bottom: 2px;
  }

  .notification-card-text {
    font-size: 13px;
    color: #718096;
  }

  .notification-card-time {
    font-size: 12px;
    color: #a0aec0;
    margin-top: 4px;
  }

  /* Empty State Card */
  .empty-state-card {
    text-align: center;
    padding: 60px 40px;
  }

  .empty-state-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 32px;
    color: #a0aec0;
  }

  .empty-state-title {
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .empty-state-text {
    font-size: 14px;
    color: #718096;
    max-width: 400px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  .empty-state-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    color: white;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .empty-state-action:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* Mobile Responsive */
  @media (max-width: 640px) {
    .course-card-image {
      height: 140px;
    }

    .course-card-content {
      padding: 16px;
    }

    .course-card-title {
      font-size: 16px;
    }

    .stats-card {
      padding: 16px;
    }

    .stats-card-value {
      font-size: 24px;
    }

    .user-card {
      padding: 16px;
    }

    .user-card-avatar {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }
  }
`;

// ==================== Inject Styles ====================

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = cardStyles;
  document.head.appendChild(styleSheet);
  stylesInjected = true;
}

// ==================== Card Creation Functions ====================

/**
 * Create a course card
 * @param {Object} course - Course data
 * @returns {HTMLElement}
 */
export function createCourseCard(course) {
  injectStyles();
  
  const {
    id,
    title,
    description,
    category,
    image,
    instructor,
    duration,
    students,
    progress,
    badge,
    onClick
  } = course;
  
  const card = document.createElement('div');
  card.className = 'card course-card';
  card.dataset.courseId = id;
  
  const badgeHtml = badge ? `<span class="course-card-badge ${badge.type}">${badge.text}</span>` : '';
  const progressHtml = progress !== undefined ? `
    <div class="course-card-progress">
      <div class="course-card-progress-bar">
        <div class="course-card-progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="course-card-progress-text">${progress}% Complete</div>
    </div>
  ` : '';
  
  card.innerHTML = `
    <div class="course-card-image">
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(title)}">` : ''}
      ${badgeHtml}
    </div>
    <div class="course-card-content">
      ${category ? `<div class="course-card-category">${escapeHtml(category)}</div>` : ''}
      <h3 class="course-card-title">${escapeHtml(title)}</h3>
      ${description ? `<p class="course-card-description">${escapeHtml(description)}</p>` : ''}
      <div class="course-card-meta">
        ${instructor ? `<span class="course-card-meta-item"><i class="fas fa-user"></i> ${escapeHtml(instructor)}</span>` : ''}
        ${duration ? `<span class="course-card-meta-item"><i class="fas fa-clock"></i> ${escapeHtml(duration)}</span>` : ''}
        ${students ? `<span class="course-card-meta-item"><i class="fas fa-users"></i> ${students}</span>` : ''}
      </div>
    </div>
    <div class="course-card-footer">
      ${progressHtml}
      <button class="course-card-action">${progress !== undefined ? 'Continue' : 'View Course'}</button>
    </div>
  `;
  
  if (onClick) {
    card.querySelector('.course-card-action').addEventListener('click', () => onClick(course));
  }
  
  return card;
}

/**
 * Create a stats card
 * @param {Object} stats - Stats data
 * @returns {HTMLElement}
 */
export function createStatsCard(stats) {
  injectStyles();
  
  const { label, value, icon, iconType = 'primary', change } = stats;
  
  const card = document.createElement('div');
  card.className = 'card stats-card';
  
  let changeHtml = '';
  if (change !== undefined) {
    const isPositive = change >= 0;
    changeHtml = `
      <span class="stats-card-change ${isPositive ? 'positive' : 'negative'}">
        <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
        ${Math.abs(change)}%
      </span>
    `;
  }
  
  card.innerHTML = `
    <div class="stats-card-icon ${iconType}">
      <i class="${icon || 'fas fa-chart-bar'}"></i>
    </div>
    <div class="stats-card-content">
      <div class="stats-card-label">${escapeHtml(label)}</div>
      <div class="stats-card-value">${escapeHtml(String(value))}</div>
      ${changeHtml}
    </div>
  `;
  
  return card;
}

/**
 * Create a user card
 * @param {Object} user - User data
 * @returns {HTMLElement}
 */
export function createUserCard(user) {
  injectStyles();
  
  const { name, role, email, avatar, initials } = user;
  
  const card = document.createElement('div');
  card.className = 'card user-card';
  
  const avatarContent = avatar 
    ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}">`
    : escapeHtml(initials || getInitials(name));
  
  card.innerHTML = `
    <div class="user-card-avatar">${avatarContent}</div>
    <div class="user-card-info">
      <div class="user-card-name">${escapeHtml(name)}</div>
      ${role ? `<div class="user-card-role">${escapeHtml(role)}</div>` : ''}
      ${email ? `<div class="user-card-email">${escapeHtml(email)}</div>` : ''}
    </div>
  `;
  
  return card;
}

/**
 * Create a message card
 * @param {Object} message - Message data
 * @returns {HTMLElement}
 */
export function createMessageCard(message) {
  injectStyles();
  
  const { sender, avatar, initials, preview, time, unread, onClick } = message;
  
  const card = document.createElement('div');
  card.className = `message-card ${unread ? 'unread' : ''}`;
  
  const avatarContent = avatar 
    ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(sender)}">`
    : escapeHtml(initials || getInitials(sender));
  
  card.innerHTML = `
    <div class="message-card-avatar">${avatarContent}</div>
    <div class="message-card-content">
      <div class="message-card-header">
        <span class="message-card-sender">${escapeHtml(sender)}</span>
        <span class="message-card-time">${escapeHtml(time)}</span>
      </div>
      <p class="message-card-preview">${escapeHtml(preview)}</p>
    </div>
  `;
  
  if (onClick) {
    card.addEventListener('click', () => onClick(message));
  }
  
  return card;
}

/**
 * Create an empty state card
 * @param {Object} options - Empty state options
 * @returns {HTMLElement}
 */
export function createEmptyState(options) {
  injectStyles();
  
  const {
    icon = 'fas fa-inbox',
    title = 'No items found',
    text = '',
    actionText,
    onAction
  } = options;
  
  const card = document.createElement('div');
  card.className = 'card empty-state-card';
  
  card.innerHTML = `
    <div class="empty-state-icon">
      <i class="${icon}"></i>
    </div>
    <h3 class="empty-state-title">${escapeHtml(title)}</h3>
    ${text ? `<p class="empty-state-text">${escapeHtml(text)}</p>` : ''}
    ${actionText ? `<button class="empty-state-action">${escapeHtml(actionText)}</button>` : ''}
  `;
  
  if (actionText && onAction) {
    card.querySelector('.empty-state-action').addEventListener('click', onAction);
  }
  
  return card;
}

// ==================== Helper Functions ====================

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string}
 */
function getInitials(name) {
  if (!name) return 'US';
  const names = name.trim().split(/\s+/);
  return (names[0]?.[0] + (names[1]?.[0] || '')).toUpperCase() || 'US';
}

/**
 * Escape HTML
 * @param {string} str - Input string
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==================== Export ====================

export default {
  createCourseCard,
  createStatsCard,
  createUserCard,
  createMessageCard,
  createEmptyState
};

// Make globally available
if (typeof window !== 'undefined') {
  window.CardComponents = {
    createCourseCard,
    createStatsCard,
    createUserCard,
    createMessageCard,
    createEmptyState
  };
}
