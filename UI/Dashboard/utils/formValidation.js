/**
 * iNurture LMS - Form Validation Utilities
 * Author: Thelezinhle
 * Description: Comprehensive form validation system
 * Created: 2026
 */

// ==================== Validation Styles ====================

const validationStyles = `
  /* Form Group */
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 6px;
  }

  .form-label.required::after {
    content: '*';
    color: #e53e3e;
    margin-left: 4px;
  }

  /* Input Styles */
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    color: #2d3748;
    background-color: #fff;
    transition: all 0.2s ease;
    outline: none;
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.15);
  }

  .form-input:disabled,
  .form-textarea:disabled,
  .form-select:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .form-input::placeholder {
    color: #a0aec0;
  }

  /* Validation States */
  .form-input.is-valid,
  .form-textarea.is-valid,
  .form-select.is-valid {
    border-color: #48bb78;
  }

  .form-input.is-valid:focus,
  .form-textarea.is-valid:focus,
  .form-select.is-valid:focus {
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.15);
  }

  .form-input.is-invalid,
  .form-textarea.is-invalid,
  .form-select.is-invalid {
    border-color: #e53e3e;
  }

  .form-input.is-invalid:focus,
  .form-textarea.is-invalid:focus,
  .form-select.is-invalid:focus {
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.15);
  }

  /* Error Message */
  .form-error {
    display: none;
    font-size: 12px;
    color: #e53e3e;
    margin-top: 6px;
    padding-left: 2px;
  }

  .form-error.visible {
    display: flex;
    align-items: center;
    gap: 4px;
    animation: shake 0.3s ease-in-out;
  }

  .form-error i {
    font-size: 10px;
  }

  /* Success Message */
  .form-success {
    display: none;
    font-size: 12px;
    color: #48bb78;
    margin-top: 6px;
    padding-left: 2px;
  }

  .form-success.visible {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Input with Icon */
  .input-with-icon {
    position: relative;
  }

  .input-with-icon .form-input {
    padding-left: 44px;
  }

  .input-with-icon .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 14px;
    transition: color 0.2s ease;
  }

  .input-with-icon .form-input:focus + .input-icon,
  .input-with-icon .form-input.is-valid + .input-icon {
    color: #3182ce;
  }

  .input-with-icon .form-input.is-invalid + .input-icon {
    color: #e53e3e;
  }

  /* Password Toggle */
  .password-toggle {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s ease;
  }

  .password-toggle:hover {
    color: #4a5568;
  }

  /* Character Counter */
  .char-counter {
    font-size: 12px;
    color: #a0aec0;
    text-align: right;
    margin-top: 4px;
  }

  .char-counter.warning {
    color: #ed8936;
  }

  .char-counter.danger {
    color: #e53e3e;
  }

  /* Checkbox & Radio */
  .form-checkbox,
  .form-radio {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 10px;
  }

  .form-checkbox input,
  .form-radio input {
    width: 18px;
    height: 18px;
    accent-color: #3182ce;
    cursor: pointer;
  }

  .form-checkbox span,
  .form-radio span {
    font-size: 14px;
    color: #4a5568;
  }

  /* Form Actions */
  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

// ==================== Inject Styles ====================

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = validationStyles;
  document.head.appendChild(styleSheet);
  stylesInjected = true;
}

// ==================== Validation Rules ====================

const validators = {
  required: (value, message = 'This field is required') => {
    if (typeof value === 'string') {
      return value.trim().length > 0 ? null : message;
    }
    return value !== null && value !== undefined ? null : message;
  },

  email: (value, message = 'Please enter a valid email address') => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : message;
  },

  minLength: (value, min, message) => {
    if (!value) return null;
    return value.length >= min ? null : (message || `Minimum ${min} characters required`);
  },

  maxLength: (value, max, message) => {
    if (!value) return null;
    return value.length <= max ? null : (message || `Maximum ${max} characters allowed`);
  },

  pattern: (value, regex, message = 'Invalid format') => {
    if (!value) return null;
    return regex.test(value) ? null : message;
  },

  phone: (value, message = 'Please enter a valid phone number') => {
    if (!value) return null;
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    return phoneRegex.test(value) ? null : message;
  },

  url: (value, message = 'Please enter a valid URL') => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return message;
    }
  },

  numeric: (value, message = 'Please enter a valid number') => {
    if (!value) return null;
    return !isNaN(parseFloat(value)) && isFinite(value) ? null : message;
  },

  integer: (value, message = 'Please enter a whole number') => {
    if (!value) return null;
    return Number.isInteger(Number(value)) ? null : message;
  },

  min: (value, min, message) => {
    if (!value) return null;
    return Number(value) >= min ? null : (message || `Value must be at least ${min}`);
  },

  max: (value, max, message) => {
    if (!value) return null;
    return Number(value) <= max ? null : (message || `Value must be at most ${max}`);
  },

  match: (value, otherValue, message = 'Values do not match') => {
    return value === otherValue ? null : message;
  },

  password: (value, message) => {
    if (!value) return null;
    const checks = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    };
    
    if (!checks.length) return message || 'Password must be at least 8 characters';
    if (!checks.uppercase) return message || 'Password must contain an uppercase letter';
    if (!checks.lowercase) return message || 'Password must contain a lowercase letter';
    if (!checks.number) return message || 'Password must contain a number';
    
    return null;
  },

  date: (value, message = 'Please enter a valid date') => {
    if (!value) return null;
    const date = new Date(value);
    return !isNaN(date.getTime()) ? null : message;
  },

  dateAfter: (value, afterDate, message) => {
    if (!value) return null;
    const date = new Date(value);
    const after = new Date(afterDate);
    return date > after ? null : (message || `Date must be after ${afterDate}`);
  },

  dateBefore: (value, beforeDate, message) => {
    if (!value) return null;
    const date = new Date(value);
    const before = new Date(beforeDate);
    return date < before ? null : (message || `Date must be before ${beforeDate}`);
  },

  fileSize: (file, maxSizeMB, message) => {
    if (!file) return null;
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes ? null : (message || `File size must be less than ${maxSizeMB}MB`);
  },

  fileType: (file, allowedTypes, message) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop().toLowerCase();
    const types = allowedTypes.map(t => t.toLowerCase().replace('.', ''));
    return types.includes(fileExt) ? null : (message || `Allowed file types: ${allowedTypes.join(', ')}`);
  }
};

// ==================== Form Validator Class ====================

/**
 * FormValidator class for form validation
 */
export class FormValidator {
  constructor(form, options = {}) {
    injectStyles();
    
    this.form = typeof form === 'string' ? document.querySelector(form) : form;
    this.fields = {};
    this.options = {
      validateOnBlur: true,
      validateOnInput: false,
      showSuccessState: true,
      ...options
    };
    
    if (this.form) {
      this._init();
    }
  }

  /**
   * Initialize the validator
   */
  _init() {
    this.form.setAttribute('novalidate', '');
    
    this.form.addEventListener('submit', (e) => {
      if (!this.validate()) {
        e.preventDefault();
        this._focusFirstError();
      }
    });
  }

  /**
   * Add a field to validate
   * @param {string} name - Field name
   * @param {Array} rules - Validation rules
   * @returns {FormValidator}
   */
  addField(name, rules) {
    const field = this.form.querySelector(`[name="${name}"]`);
    if (!field) {
      console.warn(`Field "${name}" not found`);
      return this;
    }

    this.fields[name] = {
      element: field,
      rules,
      isValid: true
    };

    // Add event listeners
    if (this.options.validateOnBlur) {
      field.addEventListener('blur', () => this.validateField(name));
    }

    if (this.options.validateOnInput) {
      field.addEventListener('input', () => this.validateField(name));
    }

    return this;
  }

  /**
   * Validate a single field
   * @param {string} name - Field name
   * @returns {boolean}
   */
  validateField(name) {
    const fieldData = this.fields[name];
    if (!fieldData) return true;

    const { element, rules } = fieldData;
    const value = element.type === 'checkbox' ? element.checked : element.value;
    let error = null;

    for (const rule of rules) {
      if (typeof rule === 'function') {
        error = rule(value, element);
      } else if (typeof rule === 'object') {
        const { type, param, message } = rule;
        const validator = validators[type];
        if (validator) {
          error = validator(value, param, message);
        }
      } else if (typeof rule === 'string') {
        const validator = validators[rule];
        if (validator) {
          error = validator(value);
        }
      }

      if (error) break;
    }

    fieldData.isValid = !error;
    this._updateFieldUI(name, error);

    return !error;
  }

  /**
   * Validate all fields
   * @returns {boolean}
   */
  validate() {
    let isValid = true;

    Object.keys(this.fields).forEach(name => {
      if (!this.validateField(name)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Update field UI based on validation state
   * @param {string} name - Field name
   * @param {string|null} error - Error message
   */
  _updateFieldUI(name, error) {
    const { element } = this.fields[name];
    const formGroup = element.closest('.form-group') || element.parentElement;
    
    // Remove existing states
    element.classList.remove('is-valid', 'is-invalid');
    
    // Get or create error element
    let errorEl = formGroup.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      formGroup.appendChild(errorEl);
    }

    if (error) {
      element.classList.add('is-invalid');
      errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error}`;
      errorEl.classList.add('visible');
    } else {
      errorEl.classList.remove('visible');
      
      if (this.options.showSuccessState && element.value) {
        element.classList.add('is-valid');
      }
    }
  }

  /**
   * Focus the first field with an error
   */
  _focusFirstError() {
    for (const name in this.fields) {
      if (!this.fields[name].isValid) {
        this.fields[name].element.focus();
        break;
      }
    }
  }

  /**
   * Reset the form and validation states
   */
  reset() {
    this.form.reset();
    
    Object.keys(this.fields).forEach(name => {
      const { element } = this.fields[name];
      const formGroup = element.closest('.form-group') || element.parentElement;
      
      element.classList.remove('is-valid', 'is-invalid');
      
      const errorEl = formGroup.querySelector('.form-error');
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
      
      this.fields[name].isValid = true;
    });
  }

  /**
   * Get form data as object
   * @returns {Object}
   */
  getData() {
    const data = {};
    const formData = new FormData(this.form);
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  /**
   * Set field error manually
   * @param {string} name - Field name
   * @param {string} error - Error message
   */
  setError(name, error) {
    if (this.fields[name]) {
      this.fields[name].isValid = false;
      this._updateFieldUI(name, error);
    }
  }

  /**
   * Clear field error
   * @param {string} name - Field name
   */
  clearError(name) {
    if (this.fields[name]) {
      this.fields[name].isValid = true;
      this._updateFieldUI(name, null);
    }
  }
}

// ==================== Utility Functions ====================

/**
 * Quick validation for a single value
 * @param {*} value - Value to validate
 * @param {Array} rules - Validation rules
 * @returns {string|null} - Error message or null
 */
export function validateValue(value, rules) {
  for (const rule of rules) {
    let error = null;

    if (typeof rule === 'function') {
      error = rule(value);
    } else if (typeof rule === 'object') {
      const { type, param, message } = rule;
      const validator = validators[type];
      if (validator) {
        error = validator(value, param, message);
      }
    } else if (typeof rule === 'string') {
      const validator = validators[rule];
      if (validator) {
        error = validator(value);
      }
    }

    if (error) return error;
  }

  return null;
}

/**
 * Create a password strength indicator
 * @param {HTMLElement} passwordInput - Password input element
 * @param {HTMLElement} container - Container for strength indicator
 */
export function createPasswordStrength(passwordInput, container) {
  injectStyles();
  
  const indicator = document.createElement('div');
  indicator.className = 'password-strength';
  indicator.innerHTML = `
    <div style="display: flex; gap: 4px; margin-top: 8px;">
      <div class="strength-bar" style="flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; transition: background 0.2s;"></div>
      <div class="strength-bar" style="flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; transition: background 0.2s;"></div>
      <div class="strength-bar" style="flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; transition: background 0.2s;"></div>
      <div class="strength-bar" style="flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; transition: background 0.2s;"></div>
    </div>
    <div class="strength-text" style="font-size: 12px; color: #718096; margin-top: 4px;"></div>
  `;
  
  container.appendChild(indicator);
  
  const bars = indicator.querySelectorAll('.strength-bar');
  const textEl = indicator.querySelector('.strength-text');
  
  const colors = ['#e53e3e', '#ed8936', '#ecc94b', '#48bb78'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  
  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    let strength = 0;
    
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;
    
    bars.forEach((bar, i) => {
      bar.style.background = i < strength ? colors[strength - 1] : '#e2e8f0';
    });
    
    textEl.textContent = value ? labels[strength - 1] || '' : '';
    textEl.style.color = colors[strength - 1] || '#718096';
  });
}

/**
 * Create a character counter for input/textarea
 * @param {HTMLElement} input - Input element
 * @param {number} maxLength - Maximum length
 */
export function createCharCounter(input, maxLength) {
  injectStyles();
  
  const counter = document.createElement('div');
  counter.className = 'char-counter';
  counter.textContent = `0 / ${maxLength}`;
  
  input.parentElement.appendChild(counter);
  
  input.addEventListener('input', () => {
    const length = input.value.length;
    counter.textContent = `${length} / ${maxLength}`;
    
    counter.classList.remove('warning', 'danger');
    
    if (length > maxLength) {
      counter.classList.add('danger');
    } else if (length > maxLength * 0.8) {
      counter.classList.add('warning');
    }
  });
}

// ==================== Export ====================

export default {
  FormValidator,
  validators,
  validateValue,
  createPasswordStrength,
  createCharCounter
};

// Make globally available
if (typeof window !== 'undefined') {
  window.FormValidator = FormValidator;
  window.validators = validators;
}
