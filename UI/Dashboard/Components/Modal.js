/**
 * iNurture LMS - Modal Component System
 * Author: Thelezinhle
 * Description: Reusable modal/dialog component
 * Created: 2026
 */

// ==================== Modal Configuration ====================

const MODAL_CONFIG = {
  closeOnBackdrop: true,
  closeOnEscape: true,
  animationDuration: 300,
  focusTrap: true
};

// Active modals stack
let activeModals = [];
let modalId = 0;

// ==================== Modal Styles ====================

const modalStyles = `
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .modal-backdrop.active {
    opacity: 1;
    visibility: visible;
  }

  .modal-dialog {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  .modal-backdrop.active .modal-dialog {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .modal-dialog.size-sm {
    max-width: 350px;
  }

  .modal-dialog.size-md {
    max-width: 500px;
  }

  .modal-dialog.size-lg {
    max-width: 700px;
  }

  .modal-dialog.size-xl {
    max-width: 900px;
  }

  .modal-dialog.size-full {
    max-width: calc(100% - 40px);
    max-height: calc(100% - 40px);
    width: calc(100% - 40px);
    height: calc(100% - 40px);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  .modal-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #a0aec0;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-size: 20px;
  }

  .modal-close:hover {
    background: #f7fafc;
    color: #4a5568;
  }

  .modal-body {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid #e2e8f0;
    background: #f7fafc;
  }

  .modal-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .modal-btn-primary {
    background: linear-gradient(135deg, #2c3e50 0%, #3182ce 100%);
    color: white;
  }

  .modal-btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .modal-btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
  }

  .modal-btn-secondary:hover {
    background: #cbd5e0;
  }

  .modal-btn-danger {
    background: #e53e3e;
    color: white;
  }

  .modal-btn-danger:hover {
    background: #c53030;
  }

  .modal-btn-success {
    background: #48bb78;
    color: white;
  }

  .modal-btn-success:hover {
    background: #38a169;
  }

  /* Confirmation Modal Specific */
  .modal-confirm-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 28px;
  }

  .modal-confirm-icon.warning {
    background: rgba(237, 137, 54, 0.15);
    color: #ed8936;
  }

  .modal-confirm-icon.danger {
    background: rgba(229, 62, 62, 0.15);
    color: #e53e3e;
  }

  .modal-confirm-icon.info {
    background: rgba(66, 153, 225, 0.15);
    color: #4299e1;
  }

  .modal-confirm-icon.success {
    background: rgba(72, 187, 120, 0.15);
    color: #48bb78;
  }

  .modal-confirm-text {
    text-align: center;
  }

  .modal-confirm-title {
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .modal-confirm-message {
    color: #718096;
    line-height: 1.6;
  }

  /* Mobile Responsive */
  @media (max-width: 480px) {
    .modal-dialog {
      width: 95%;
      max-height: 95vh;
      margin: 10px;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
      padding: 16px;
    }

    .modal-footer {
      flex-direction: column;
    }

    .modal-btn {
      width: 100%;
    }
  }
`;

// ==================== Initialize Modal System ====================

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
  stylesInjected = true;
}

// ==================== Modal Class ====================

/**
 * Modal class for creating and managing modals
 */
export class Modal {
  constructor(options = {}) {
    injectStyles();
    
    this.id = ++modalId;
    this.options = {
      title: '',
      content: '',
      size: 'md', // sm, md, lg, xl, full
      closeable: true,
      closeOnBackdrop: MODAL_CONFIG.closeOnBackdrop,
      closeOnEscape: MODAL_CONFIG.closeOnEscape,
      footer: null, // null = no footer, array of buttons
      onOpen: null,
      onClose: null,
      ...options
    };
    
    this.element = null;
    this.isOpen = false;
    this._boundKeyHandler = this._handleKeydown.bind(this);
  }

  /**
   * Create the modal element
   * @returns {HTMLElement}
   */
  _createElement() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.dataset.modalId = this.id;
    
    const footerHtml = this._createFooter();
    
    backdrop.innerHTML = `
      <div class="modal-dialog size-${this.options.size}" role="dialog" aria-modal="true">
        ${this.options.title || this.options.closeable ? `
          <div class="modal-header">
            <h3 class="modal-title">${escapeHtml(this.options.title)}</h3>
            ${this.options.closeable ? '<button class="modal-close" aria-label="Close">&times;</button>' : ''}
          </div>
        ` : ''}
        <div class="modal-body">
          ${typeof this.options.content === 'string' ? this.options.content : ''}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    // If content is an element, append it
    if (this.options.content instanceof Element) {
      const body = backdrop.querySelector('.modal-body');
      body.innerHTML = '';
      body.appendChild(this.options.content);
    }

    // Add event listeners
    this._attachEvents(backdrop);
    
    return backdrop;
  }

  /**
   * Create footer HTML
   * @returns {string}
   */
  _createFooter() {
    if (!this.options.footer || !Array.isArray(this.options.footer)) {
      return '';
    }

    return this.options.footer.map((btn, index) => {
      const type = btn.type || 'secondary';
      return `
        <button class="modal-btn modal-btn-${type}" data-btn-index="${index}">
          ${escapeHtml(btn.text || 'Button')}
        </button>
      `;
    }).join('');
  }

  /**
   * Attach event listeners
   * @param {HTMLElement} backdrop
   */
  _attachEvents(backdrop) {
    // Close button
    const closeBtn = backdrop.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.options.closeOnBackdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close();
        }
      });
    }

    // Footer button clicks
    const footerBtns = backdrop.querySelectorAll('.modal-footer .modal-btn');
    footerBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.btnIndex);
        const btnConfig = this.options.footer[index];
        
        if (btnConfig && typeof btnConfig.onClick === 'function') {
          const result = btnConfig.onClick(this);
          // If onClick returns false, don't close
          if (result !== false && btnConfig.closeOnClick !== false) {
            this.close();
          }
        } else {
          this.close();
        }
      });
    });
  }

  /**
   * Handle keydown events
   * @param {KeyboardEvent} e
   */
  _handleKeydown(e) {
    if (e.key === 'Escape' && this.options.closeOnEscape) {
      // Only close if this is the top modal
      if (activeModals[activeModals.length - 1]?.id === this.id) {
        this.close();
      }
    }
  }

  /**
   * Open the modal
   * @returns {Modal}
   */
  open() {
    if (this.isOpen) return this;

    this.element = this._createElement();
    document.body.appendChild(this.element);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Force reflow and add active class
    this.element.offsetHeight;
    requestAnimationFrame(() => {
      this.element.classList.add('active');
    });

    // Add to active modals
    activeModals.push(this);
    
    // Add keyboard listener
    document.addEventListener('keydown', this._boundKeyHandler);
    
    this.isOpen = true;

    // Focus first focusable element
    setTimeout(() => {
      const focusable = this.element.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }, MODAL_CONFIG.animationDuration);

    // Callback
    if (typeof this.options.onOpen === 'function') {
      this.options.onOpen(this);
    }

    return this;
  }

  /**
   * Close the modal
   * @returns {Modal}
   */
  close() {
    if (!this.isOpen) return this;

    this.element.classList.remove('active');
    
    // Remove keyboard listener
    document.removeEventListener('keydown', this._boundKeyHandler);

    // Remove from active modals
    const index = activeModals.findIndex(m => m.id === this.id);
    if (index !== -1) {
      activeModals.splice(index, 1);
    }

    // Restore body scroll if no more modals
    if (activeModals.length === 0) {
      document.body.style.overflow = '';
    }

    // Remove element after animation
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
    }, MODAL_CONFIG.animationDuration);

    this.isOpen = false;

    // Callback
    if (typeof this.options.onClose === 'function') {
      this.options.onClose(this);
    }

    return this;
  }

  /**
   * Update modal content
   * @param {string|Element} content
   * @returns {Modal}
   */
  setContent(content) {
    if (!this.element) return this;
    
    const body = this.element.querySelector('.modal-body');
    if (body) {
      if (typeof content === 'string') {
        body.innerHTML = content;
      } else if (content instanceof Element) {
        body.innerHTML = '';
        body.appendChild(content);
      }
    }
    
    return this;
  }

  /**
   * Update modal title
   * @param {string} title
   * @returns {Modal}
   */
  setTitle(title) {
    if (!this.element) return this;
    
    const titleEl = this.element.querySelector('.modal-title');
    if (titleEl) {
      titleEl.textContent = title;
    }
    
    return this;
  }
}

// ==================== Convenience Functions ====================

/**
 * Show a simple alert modal
 * @param {string} message - Message to show
 * @param {string} title - Modal title
 * @returns {Promise}
 */
export function alert(message, title = 'Alert') {
  return new Promise((resolve) => {
    const modal = new Modal({
      title,
      content: `<p style="color: #4a5568; line-height: 1.6;">${escapeHtml(message)}</p>`,
      size: 'sm',
      footer: [
        { text: 'OK', type: 'primary', onClick: () => resolve() }
      ],
      onClose: () => resolve()
    });
    modal.open();
  });
}

/**
 * Show a confirmation modal
 * @param {string} message - Message to show
 * @param {Object} options - Options
 * @returns {Promise<boolean>}
 */
export function confirm(message, options = {}) {
  const {
    title = 'Confirm',
    type = 'warning', // warning, danger, info, success
    confirmText = 'Confirm',
    cancelText = 'Cancel'
  } = options;

  return new Promise((resolve) => {
    const icons = {
      warning: '<i class="fas fa-exclamation-triangle"></i>',
      danger: '<i class="fas fa-trash-alt"></i>',
      info: '<i class="fas fa-question-circle"></i>',
      success: '<i class="fas fa-check-circle"></i>'
    };

    const modal = new Modal({
      content: `
        <div class="modal-confirm-text">
          <div class="modal-confirm-icon ${type}">
            ${icons[type] || icons.warning}
          </div>
          <h4 class="modal-confirm-title">${escapeHtml(title)}</h4>
          <p class="modal-confirm-message">${escapeHtml(message)}</p>
        </div>
      `,
      size: 'sm',
      closeable: false,
      footer: [
        { text: cancelText, type: 'secondary', onClick: () => resolve(false) },
        { text: confirmText, type: type === 'danger' ? 'danger' : 'primary', onClick: () => resolve(true) }
      ]
    });
    modal.open();
  });
}

/**
 * Show a prompt modal
 * @param {string} message - Message to show
 * @param {Object} options - Options
 * @returns {Promise<string|null>}
 */
export function prompt(message, options = {}) {
  const {
    title = 'Input',
    placeholder = '',
    defaultValue = '',
    inputType = 'text'
  } = options;

  return new Promise((resolve) => {
    const inputId = `prompt-input-${Date.now()}`;
    
    const modal = new Modal({
      title,
      content: `
        <div style="margin-bottom: 16px; color: #4a5568;">${escapeHtml(message)}</div>
        <input type="${inputType}" id="${inputId}" class="form-input" 
               placeholder="${escapeHtml(placeholder)}" 
               value="${escapeHtml(defaultValue)}"
               style="width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s;">
      `,
      size: 'sm',
      footer: [
        { text: 'Cancel', type: 'secondary', onClick: () => resolve(null) },
        { 
          text: 'OK', 
          type: 'primary', 
          onClick: () => {
            const input = document.getElementById(inputId);
            resolve(input ? input.value : '');
          }
        }
      ],
      onOpen: () => {
        setTimeout(() => {
          const input = document.getElementById(inputId);
          if (input) input.focus();
        }, 100);
      }
    });
    modal.open();
  });
}

// ==================== Helper Functions ====================

/**
 * Escape HTML to prevent XSS
 * @param {string} str
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
  Modal,
  alert,
  confirm,
  prompt
};

// Make globally available
if (typeof window !== 'undefined') {
  window.Modal = Modal;
  window.modalAlert = alert;
  window.modalConfirm = confirm;
  window.modalPrompt = prompt;
}
