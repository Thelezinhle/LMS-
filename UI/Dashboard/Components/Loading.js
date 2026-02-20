/**
 * iNurture LMS - Loading States Component
 * Author: Thelezinhle
 * Description: Loading indicators, skeletons, and spinners
 * Created: 2026
 */

// ==================== Loading Styles ====================

const loadingStyles = `
  /* Spinner Loader */
  .loader-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(49, 130, 206, 0.2);
    border-radius: 50%;
    border-top-color: #3182ce;
    animation: spin 0.8s ease-in-out infinite;
  }

  .loader-spinner.sm {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  .loader-spinner.lg {
    width: 60px;
    height: 60px;
    border-width: 4px;
  }

  .loader-spinner.white {
    border-color: rgba(255, 255, 255, 0.3);
    border-top-color: white;
  }

  /* Dots Loader */
  .loader-dots {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
  }

  .loader-dots span {
    width: 10px;
    height: 10px;
    background-color: #3182ce;
    border-radius: 50%;
    animation: bounce-dot 1.4s ease-in-out infinite;
  }

  .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
  .loader-dots span:nth-child(2) { animation-delay: -0.16s; }
  .loader-dots span:nth-child(3) { animation-delay: 0s; }

  /* Pulse Loader */
  .loader-pulse {
    width: 40px;
    height: 40px;
    background-color: #3182ce;
    border-radius: 50%;
    animation: pulse-loader 1.2s ease-in-out infinite;
  }

  /* Bar Loader */
  .loader-bar {
    width: 100%;
    height: 4px;
    background-color: #e2e8f0;
    border-radius: 2px;
    overflow: hidden;
  }

  .loader-bar-progress {
    height: 100%;
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    border-radius: 2px;
    animation: loading-bar 1.5s ease-in-out infinite;
  }

  /* Skeleton Loader */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 4px;
  }

  .skeleton-text {
    height: 16px;
    margin-bottom: 8px;
    border-radius: 4px;
  }

  .skeleton-text.sm {
    height: 12px;
  }

  .skeleton-text.lg {
    height: 24px;
  }

  .skeleton-text:last-child {
    width: 70%;
  }

  .skeleton-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .skeleton-avatar.sm {
    width: 32px;
    height: 32px;
  }

  .skeleton-avatar.lg {
    width: 64px;
    height: 64px;
  }

  .skeleton-card {
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .skeleton-image {
    width: 100%;
    height: 150px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .skeleton-button {
    width: 100px;
    height: 40px;
    border-radius: 8px;
  }

  /* Full Page Loader */
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    gap: 20px;
  }

  .page-loader-text {
    color: #4a5568;
    font-size: 14px;
    font-weight: 500;
  }

  /* Overlay Loader */
  .overlay-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: inherit;
  }

  /* Button Loading State */
  .btn-loading {
    position: relative;
    pointer-events: none;
    opacity: 0.7;
  }

  .btn-loading .btn-text {
    visibility: hidden;
  }

  .btn-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: currentColor;
    animation: spin 0.6s linear infinite;
  }

  /* Content Loading Fade */
  .content-loading {
    opacity: 0.5;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  /* Animations */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes bounce-dot {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

  @keyframes pulse-loader {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }

  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// ==================== Inject Styles ====================

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = loadingStyles;
  document.head.appendChild(styleSheet);
  stylesInjected = true;
}

// ==================== Loader Components ====================

/**
 * Create a spinner loader
 * @param {Object} options - Spinner options
 * @returns {HTMLElement}
 */
export function createSpinner(options = {}) {
  injectStyles();
  
  const { size = 'md', color = 'primary' } = options;
  const spinner = document.createElement('div');
  spinner.className = `loader-spinner ${size} ${color === 'white' ? 'white' : ''}`;
  
  return spinner;
}

/**
 * Create a dots loader
 * @returns {HTMLElement}
 */
export function createDotsLoader() {
  injectStyles();
  
  const container = document.createElement('div');
  container.className = 'loader-dots';
  container.innerHTML = '<span></span><span></span><span></span>';
  
  return container;
}

/**
 * Create a bar loader
 * @returns {HTMLElement}
 */
export function createBarLoader() {
  injectStyles();
  
  const bar = document.createElement('div');
  bar.className = 'loader-bar';
  bar.innerHTML = '<div class="loader-bar-progress"></div>';
  
  return bar;
}

/**
 * Create a skeleton loader
 * @param {string} type - Type of skeleton (text, avatar, image, card, button)
 * @param {Object} options - Skeleton options
 * @returns {HTMLElement}
 */
export function createSkeleton(type = 'text', options = {}) {
  injectStyles();
  
  const { size = 'md', width, height, lines = 3 } = options;
  
  switch (type) {
    case 'text': {
      const container = document.createElement('div');
      for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = `skeleton skeleton-text ${size}`;
        if (width) line.style.width = width;
        container.appendChild(line);
      }
      return container;
    }
    
    case 'avatar': {
      const avatar = document.createElement('div');
      avatar.className = `skeleton skeleton-avatar ${size}`;
      return avatar;
    }
    
    case 'image': {
      const image = document.createElement('div');
      image.className = 'skeleton skeleton-image';
      if (height) image.style.height = height;
      return image;
    }
    
    case 'card': {
      const card = document.createElement('div');
      card.className = 'skeleton-card';
      card.innerHTML = `
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-text lg"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      `;
      return card;
    }
    
    case 'button': {
      const button = document.createElement('div');
      button.className = 'skeleton skeleton-button';
      if (width) button.style.width = width;
      return button;
    }
    
    default:
      return createSkeleton('text', options);
  }
}

/**
 * Create skeleton card grid
 * @param {number} count - Number of skeleton cards
 * @returns {HTMLElement}
 */
export function createSkeletonGrid(count = 6) {
  injectStyles();
  
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;';
  
  for (let i = 0; i < count; i++) {
    grid.appendChild(createSkeleton('card'));
  }
  
  return grid;
}

// ==================== Loading State Management ====================

let pageLoader = null;

/**
 * Show full page loader
 * @param {string} text - Loading text
 */
export function showPageLoader(text = 'Loading...') {
  injectStyles();
  
  if (pageLoader) return;
  
  pageLoader = document.createElement('div');
  pageLoader.className = 'page-loader';
  pageLoader.innerHTML = `
    <div class="loader-spinner lg"></div>
    <div class="page-loader-text">${escapeHtml(text)}</div>
  `;
  
  document.body.appendChild(pageLoader);
  document.body.style.overflow = 'hidden';
}

/**
 * Hide full page loader
 */
export function hidePageLoader() {
  if (pageLoader && pageLoader.parentNode) {
    pageLoader.parentNode.removeChild(pageLoader);
    pageLoader = null;
    document.body.style.overflow = '';
  }
}

/**
 * Update page loader text
 * @param {string} text - New text
 */
export function updatePageLoaderText(text) {
  if (pageLoader) {
    const textEl = pageLoader.querySelector('.page-loader-text');
    if (textEl) textEl.textContent = text;
  }
}

/**
 * Add overlay loader to an element
 * @param {HTMLElement} element - Target element
 * @returns {HTMLElement} - Overlay element
 */
export function addOverlayLoader(element) {
  injectStyles();
  
  element.style.position = 'relative';
  
  const overlay = document.createElement('div');
  overlay.className = 'overlay-loader';
  overlay.appendChild(createSpinner());
  
  element.appendChild(overlay);
  
  return overlay;
}

/**
 * Remove overlay loader from an element
 * @param {HTMLElement} element - Target element
 */
export function removeOverlayLoader(element) {
  const overlay = element.querySelector('.overlay-loader');
  if (overlay) {
    overlay.remove();
  }
}

/**
 * Set button to loading state
 * @param {HTMLElement} button - Button element
 * @param {boolean} loading - Loading state
 * @param {string} originalText - Original button text (optional)
 */
export function setButtonLoading(button, loading = true, originalText = null) {
  injectStyles();
  
  if (loading) {
    button.dataset.originalText = button.innerHTML;
    button.classList.add('btn-loading');
    button.innerHTML = `<span class="btn-text">${button.innerHTML}</span>`;
    button.disabled = true;
  } else {
    button.classList.remove('btn-loading');
    button.innerHTML = originalText || button.dataset.originalText || button.textContent;
    button.disabled = false;
    delete button.dataset.originalText;
  }
}

/**
 * Set content area to loading state
 * @param {HTMLElement} element - Content element
 * @param {boolean} loading - Loading state
 */
export function setContentLoading(element, loading = true) {
  injectStyles();
  
  if (loading) {
    element.classList.add('content-loading');
  } else {
    element.classList.remove('content-loading');
  }
}

// ==================== Helper Functions ====================

/**
 * Escape HTML
 * @param {string} str - Input string
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==================== Export ====================

export default {
  createSpinner,
  createDotsLoader,
  createBarLoader,
  createSkeleton,
  createSkeletonGrid,
  showPageLoader,
  hidePageLoader,
  updatePageLoaderText,
  addOverlayLoader,
  removeOverlayLoader,
  setButtonLoading,
  setContentLoading
};

// Make globally available
if (typeof window !== 'undefined') {
  window.Loading = {
    createSpinner,
    createDotsLoader,
    createBarLoader,
    createSkeleton,
    createSkeletonGrid,
    showPageLoader,
    hidePageLoader,
    updatePageLoaderText,
    addOverlayLoader,
    removeOverlayLoader,
    setButtonLoading,
    setContentLoading
  };
}
