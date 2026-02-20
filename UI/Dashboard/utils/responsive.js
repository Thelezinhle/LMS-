/**
 * iNurture LMS - Responsive Design Utilities
 * Author: Thelezinhle
 * Description: Responsive breakpoints, media queries, and layout utilities
 * Created: 2026
 */

// ==================== Breakpoints ====================

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// ==================== Media Query Helpers ====================

/**
 * Check if viewport matches a media query
 * @param {string} query - Media query string
 * @returns {boolean}
 */
export function matchesMedia(query) {
  return window.matchMedia(query).matches;
}

/**
 * Check if viewport is at or above breakpoint
 * @param {string} bp - Breakpoint name (xs, sm, md, lg, xl, 2xl)
 * @returns {boolean}
 */
export function isBreakpoint(bp) {
  const width = breakpoints[bp];
  if (width === undefined) return false;
  return window.innerWidth >= width;
}

/**
 * Get current breakpoint name
 * @returns {string}
 */
export function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export function isMobile() {
  return window.innerWidth < breakpoints.md;
}

/**
 * Check if device is tablet
 * @returns {boolean}
 */
export function isTablet() {
  const width = window.innerWidth;
  return width >= breakpoints.md && width < breakpoints.lg;
}

/**
 * Check if device is desktop
 * @returns {boolean}
 */
export function isDesktop() {
  return window.innerWidth >= breakpoints.lg;
}

/**
 * Check if device has touch support
 * @returns {boolean}
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ==================== Event Listeners ====================

/**
 * Add resize listener with debounce
 * @param {Function} callback - Callback function
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} - Cleanup function
 */
export function onResize(callback, delay = 150) {
  let timeoutId;
  
  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getCurrentBreakpoint(),
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop()
      });
    }, delay);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(timeoutId);
  };
}

/**
 * Listen for breakpoint changes
 * @param {Function} callback - Called when breakpoint changes
 * @returns {Function} - Cleanup function
 */
export function onBreakpointChange(callback) {
  let lastBreakpoint = getCurrentBreakpoint();
  
  const handleResize = () => {
    const currentBreakpoint = getCurrentBreakpoint();
    if (currentBreakpoint !== lastBreakpoint) {
      callback({
        from: lastBreakpoint,
        to: currentBreakpoint,
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop()
      });
      lastBreakpoint = currentBreakpoint;
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}

/**
 * Listen for orientation changes
 * @param {Function} callback - Called when orientation changes
 * @returns {Function} - Cleanup function
 */
export function onOrientationChange(callback) {
  const handleChange = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    callback({
      orientation: isPortrait ? 'portrait' : 'landscape',
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  
  window.addEventListener('orientationchange', handleChange);
  window.addEventListener('resize', handleChange);
  
  return () => {
    window.removeEventListener('orientationchange', handleChange);
    window.removeEventListener('resize', handleChange);
  };
}

// ==================== Responsive Layout Utilities ====================

/**
 * Create a responsive grid container
 * @param {Object} options - Grid options
 * @returns {HTMLElement}
 */
export function createResponsiveGrid(options = {}) {
  const {
    columns = { xs: 1, sm: 2, md: 3, lg: 4 },
    gap = '24px',
    className = ''
  } = options;
  
  const grid = document.createElement('div');
  grid.className = `responsive-grid ${className}`.trim();
  
  const styleId = 'responsive-grid-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .responsive-grid {
        display: grid;
        gap: var(--grid-gap, ${gap});
      }
      
      @media (min-width: 0px) {
        .responsive-grid { grid-template-columns: repeat(var(--cols-xs, 1), 1fr); }
      }
      @media (min-width: ${breakpoints.sm}px) {
        .responsive-grid { grid-template-columns: repeat(var(--cols-sm, var(--cols-xs, 1)), 1fr); }
      }
      @media (min-width: ${breakpoints.md}px) {
        .responsive-grid { grid-template-columns: repeat(var(--cols-md, var(--cols-sm, 2)), 1fr); }
      }
      @media (min-width: ${breakpoints.lg}px) {
        .responsive-grid { grid-template-columns: repeat(var(--cols-lg, var(--cols-md, 3)), 1fr); }
      }
      @media (min-width: ${breakpoints.xl}px) {
        .responsive-grid { grid-template-columns: repeat(var(--cols-xl, var(--cols-lg, 4)), 1fr); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Set CSS variables
  Object.entries(columns).forEach(([bp, cols]) => {
    grid.style.setProperty(`--cols-${bp}`, cols);
  });
  grid.style.setProperty('--grid-gap', gap);
  
  return grid;
}

/**
 * Create a flex container with responsive direction
 * @param {Object} options - Flex options
 * @returns {HTMLElement}
 */
export function createResponsiveFlex(options = {}) {
  const {
    direction = { xs: 'column', md: 'row' },
    gap = '16px',
    align = 'stretch',
    justify = 'flex-start',
    wrap = false,
    className = ''
  } = options;
  
  const container = document.createElement('div');
  container.className = `responsive-flex ${className}`.trim();
  
  Object.assign(container.style, {
    display: 'flex',
    gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap'
  });
  
  // Apply responsive direction
  const updateDirection = () => {
    const bp = getCurrentBreakpoint();
    const bpOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    let dir = direction.xs || 'row';
    
    for (const b of bpOrder) {
      if (direction[b]) dir = direction[b];
      if (b === bp) break;
    }
    
    container.style.flexDirection = dir;
  };
  
  updateDirection();
  window.addEventListener('resize', updateDirection);
  
  // Store cleanup in element
  container._cleanup = () => window.removeEventListener('resize', updateDirection);
  
  return container;
}

/**
 * Show/hide element based on breakpoint
 * @param {HTMLElement} element - Target element
 * @param {Object} visibility - Visibility settings per breakpoint
 */
export function setResponsiveVisibility(element, visibility) {
  const updateVisibility = () => {
    const bp = getCurrentBreakpoint();
    const bpOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    let isVisible = visibility.xs !== false;
    
    for (const b of bpOrder) {
      if (visibility[b] !== undefined) isVisible = visibility[b];
      if (b === bp) break;
    }
    
    element.style.display = isVisible ? '' : 'none';
  };
  
  updateVisibility();
  window.addEventListener('resize', updateVisibility);
  
  return () => window.removeEventListener('resize', updateVisibility);
}

// ==================== Responsive Text ====================

/**
 * Apply responsive font size
 * @param {HTMLElement} element - Target element
 * @param {Object} sizes - Font sizes per breakpoint
 */
export function setResponsiveFontSize(element, sizes) {
  const updateSize = () => {
    const bp = getCurrentBreakpoint();
    const bpOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    let size = sizes.xs || '16px';
    
    for (const b of bpOrder) {
      if (sizes[b]) size = sizes[b];
      if (b === bp) break;
    }
    
    element.style.fontSize = size;
  };
  
  updateSize();
  window.addEventListener('resize', updateSize);
  
  return () => window.removeEventListener('resize', updateSize);
}

// ==================== Container Queries Polyfill ====================

/**
 * Simple container query implementation
 * @param {HTMLElement} container - Container element
 * @param {Object} queries - Width-based queries
 */
export function containerQuery(container, queries) {
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      
      // Reset all classes
      Object.values(queries).flat().forEach(cls => {
        if (typeof cls === 'string') container.classList.remove(cls);
      });
      
      // Apply matching classes
      Object.entries(queries).forEach(([breakpoint, classes]) => {
        const minWidth = parseInt(breakpoint);
        if (width >= minWidth && typeof classes === 'string') {
          container.classList.add(classes);
        } else if (width >= minWidth && Array.isArray(classes)) {
          classes.forEach(cls => container.classList.add(cls));
        }
      });
    }
  });
  
  resizeObserver.observe(container);
  
  return () => resizeObserver.disconnect();
}

// ==================== Responsive Images ====================

/**
 * Create responsive image with srcset
 * @param {Object} options - Image options
 * @returns {HTMLImageElement}
 */
export function createResponsiveImage(options) {
  const {
    src,
    srcset,
    sizes = '100vw',
    alt = '',
    loading = 'lazy',
    className = ''
  } = options;
  
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = loading;
  img.className = className;
  
  if (srcset) {
    img.srcset = srcset;
    img.sizes = sizes;
  }
  
  Object.assign(img.style, {
    maxWidth: '100%',
    height: 'auto'
  });
  
  return img;
}

// ==================== Responsive Spacing ====================

/**
 * Apply responsive padding/margin
 * @param {HTMLElement} element - Target element
 * @param {string} property - 'padding' or 'margin'
 * @param {Object} values - Spacing values per breakpoint
 */
export function setResponsiveSpacing(element, property, values) {
  const updateSpacing = () => {
    const bp = getCurrentBreakpoint();
    const bpOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    let spacing = values.xs || '16px';
    
    for (const b of bpOrder) {
      if (values[b]) spacing = values[b];
      if (b === bp) break;
    }
    
    element.style[property] = spacing;
  };
  
  updateSpacing();
  window.addEventListener('resize', updateSpacing);
  
  return () => window.removeEventListener('resize', updateSpacing);
}

// ==================== Responsive Styles Injection ====================

/**
 * Inject responsive utility classes
 */
export function injectResponsiveUtilities() {
  const styleId = 'responsive-utilities';
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Display Utilities */
    .hidden-xs { display: none !important; }
    @media (min-width: ${breakpoints.sm}px) {
      .hidden-xs { display: block !important; }
      .hidden-sm { display: none !important; }
    }
    @media (min-width: ${breakpoints.md}px) {
      .hidden-sm { display: block !important; }
      .hidden-md { display: none !important; }
      .show-mobile { display: none !important; }
    }
    @media (min-width: ${breakpoints.lg}px) {
      .hidden-md { display: block !important; }
      .hidden-lg { display: none !important; }
    }
    @media (max-width: ${breakpoints.md - 1}px) {
      .show-desktop { display: none !important; }
    }
    
    /* Flex Direction */
    .flex-col-xs { flex-direction: column; }
    @media (min-width: ${breakpoints.md}px) {
      .flex-row-md { flex-direction: row; }
    }
    
    /* Text Alignment */
    .text-center-xs { text-align: center; }
    @media (min-width: ${breakpoints.md}px) {
      .text-left-md { text-align: left; }
    }
    
    /* Spacing */
    .p-responsive {
      padding: 16px;
    }
    @media (min-width: ${breakpoints.md}px) {
      .p-responsive { padding: 24px; }
    }
    @media (min-width: ${breakpoints.lg}px) {
      .p-responsive { padding: 32px; }
    }
    
    /* Gap */
    .gap-responsive {
      gap: 16px;
    }
    @media (min-width: ${breakpoints.md}px) {
      .gap-responsive { gap: 24px; }
    }
    
    /* Max Width */
    .container-responsive {
      max-width: 100%;
      padding-left: 16px;
      padding-right: 16px;
      margin: 0 auto;
    }
    @media (min-width: ${breakpoints.sm}px) {
      .container-responsive { max-width: 640px; }
    }
    @media (min-width: ${breakpoints.md}px) {
      .container-responsive { max-width: 768px; padding-left: 24px; padding-right: 24px; }
    }
    @media (min-width: ${breakpoints.lg}px) {
      .container-responsive { max-width: 1024px; }
    }
    @media (min-width: ${breakpoints.xl}px) {
      .container-responsive { max-width: 1280px; }
    }
  `;
  
  document.head.appendChild(style);
}

// ==================== Export ====================

export default {
  breakpoints,
  matchesMedia,
  isBreakpoint,
  getCurrentBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  isTouchDevice,
  onResize,
  onBreakpointChange,
  onOrientationChange,
  createResponsiveGrid,
  createResponsiveFlex,
  setResponsiveVisibility,
  setResponsiveFontSize,
  containerQuery,
  createResponsiveImage,
  setResponsiveSpacing,
  injectResponsiveUtilities
};

// Make globally available
if (typeof window !== 'undefined') {
  window.ResponsiveUtils = {
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    getCurrentBreakpoint,
    onResize,
    onBreakpointChange,
    createResponsiveGrid,
    injectResponsiveUtilities
  };
}
