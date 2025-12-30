// ELI Utils - Utility functions for web experiments
// This file can be imported in variant code using: import utils from '@eli/utils';

export default {
  /**
   * Wait for the first element matching the selector to appear in the DOM
   * Note: This only matches the first element. Use waitForElements() to match all elements.
   * @param {string|Element} selector - CSS selector or element
   * @returns {Promise<Element>} Promise that resolves with the first matching element (waits indefinitely)
   * @example
   * utils.waitForElement('.product-card').then(element => {
   *   element.style.border = '2px solid red';
   * });
   */
  waitForElement: function(selector) {
    return new Promise((resolve) => {
      // If selector is already an element, return it immediately
      if (selector instanceof Element) {
        resolve(selector);
        return;
      }

      // Check if element already exists
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      // Set up MutationObserver to watch for element
      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  },

  /**
   * Wait until a condition function returns true
   * @param {Function} condition - Function that returns a boolean
   * @param {number} interval - Check interval in milliseconds (default: 100)
   * @returns {Promise} Promise that resolves when condition is met (waits indefinitely)
   */
  waitUntil: function(condition, interval = 100) {
    return new Promise((resolve, reject) => {
      const checkCondition = () => {
        try {
          if (condition()) {
            resolve();
          } else {
            setTimeout(checkCondition, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      checkCondition();
    });
  },

  /**
   * Get a cookie value by name
   * @param {string} name - Cookie name
   * @returns {string|null} Cookie value or null if not found
   */
  getCookie: function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  },

  /**
   * Set a cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Number of days until expiration (default: 365)
   * @param {string} path - Cookie path (default: '/')
   * @param {string} domain - Cookie domain (optional)
   */
  setCookie: function(name, value, days = 365, path = '/', domain = '') {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const domainStr = domain ? `domain=${domain};` : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path};${domainStr}`;
  },

  /**
   * Get a URL query parameter value
   * @param {string} name - Parameter name
   * @param {string} url - Optional URL (defaults to current window location)
   * @returns {string|null} Parameter value or null if not found
   */
  getQueryParam: function(name, url = window.location.href) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get(name);
  },

  /**
   * Trigger a custom event
   * @param {string} eventName - Event name
   * @param {Object} data - Event data
   * @param {Element|string} target - Target element (defaults to document)
   */
  triggerEvent: function(eventName, data = {}, target = document) {
    const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
    if (targetEl) {
      const event = new CustomEvent(eventName, { detail: data });
      targetEl.dispatchEvent(event);
    }
  },

  /**
   * Select a single element
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (defaults to document)
   * @returns {Element|null} Element or null if not found
   */
  select: function(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * Wait for all elements matching the selector to appear in the DOM
   * Note: This matches all elements. Use waitForElement() to match only the first element.
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (defaults to document)
   * @returns {Promise<NodeList>} Promise that resolves with all matching elements (waits indefinitely)
   * @example
   * utils.waitForElements('.product-card').then(elements => {
   *   elements.forEach(card => card.style.border = '2px solid red');
   * });
   */
  waitForElements: function(selector, context = document) {
    return new Promise((resolve) => {
      // Check if elements already exist
      const elements = context.querySelectorAll(selector);
      if (elements.length > 0) {
        resolve(elements);
        return;
      }

      // Set up MutationObserver to watch for elements
      const observer = new MutationObserver((mutations, obs) => {
        const foundElements = context.querySelectorAll(selector);
        if (foundElements.length > 0) {
          obs.disconnect();
          resolve(foundElements);
        }
      });

      observer.observe(context === document ? document.body : context, {
        childList: true,
        subtree: true
      });
    });
  },

  /**
   * Add a class to an element
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to add
   */
  addClass: function(element, className) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.add(className);
  },

  /**
   * Remove a class from an element
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to remove
   */
  removeClass: function(element, className) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.remove(className);
  },

  /**
   * Toggle a class on an element
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to toggle
   */
  toggleClass: function(element, className) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.classList.toggle(className);
  },

  /**
   * Check if an element has a class
   * @param {Element|string} element - Element or selector
   * @param {string} className - Class name to check
   * @returns {boolean} True if element has the class
   */
  hasClass: function(element, className) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.classList.contains(className) : false;
  },

  /**
   * Add an event listener
   * @param {Element|string} element - Element or selector
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  on: function(element, event, handler) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.addEventListener(event, handler);
  },

  /**
   * Remove an event listener
   * @param {Element|string} element - Element or selector
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  off: function(element, event, handler) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.removeEventListener(event, handler);
  },

  /**
   * Event delegation - attach event to parent, handle on children
   * @param {Element|string} parent - Parent element or selector
   * @param {string} selector - Child selector to match
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  delegate: function(parent, selector, event, handler) {
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
    if (parentEl) {
      parentEl.addEventListener(event, (e) => {
        if (e.target.matches(selector) || e.target.closest(selector)) {
          handler(e);
        }
      });
    }
  },

  /**
   * Get the viewport dimensions
   * @returns {Object} Object with width and height
   */
  getViewport: function() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight
    };
  },

  /**
   * Check if element is in viewport
   * @param {Element|string} element - Element or selector
   * @param {number} threshold - Visibility threshold (0-1, default: 0)
   * @returns {boolean} True if element is in viewport
   */
  isInViewport: function(element, threshold = 0) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const viewport = this.getViewport();

    return (
      rect.top >= -threshold * rect.height &&
      rect.left >= -threshold * rect.width &&
      rect.bottom <= viewport.height + threshold * rect.height &&
      rect.right <= viewport.width + threshold * rect.width
    );
  },

  /**
   * Scroll element into view
   * @param {Element|string} element - Element or selector
   * @param {Object} options - ScrollIntoView options
   */
  scrollIntoView: function(element, options = { behavior: 'smooth', block: 'center' }) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.scrollIntoView(options);
  },

  /**
   * Observe mutations on the first element matching the selector
   * The callback is called every time the element is mutated (attributes, children, text, etc.)
   * Note: This only observes the first matching element. Use observeSelectors() to observe all elements.
   * 
   * @param {string|Element} selector - CSS selector or element to observe
   * @param {Function} callback - Callback function that receives (element, mutationRecord, observer)
   * @param {Object} options - Options object
   * @param {Array<string>} options.mutations - Array of mutation types to observe. Options:
   *   - 'childList' - Watch for child nodes being added/removed (default: true)
   *   - 'attributes' - Watch for attribute changes (default: true)
   *   - 'characterData' - Watch for text content changes (default: false)
   *   - 'subtree' - Watch all descendants, not just direct children (default: true)
   *   - 'attributeOldValue' - Include old attribute value in mutation record (default: false)
   *   - 'characterDataOldValue' - Include old text value in mutation record (default: false)
   *   - 'attributeFilter' - Array of attribute names to observe (only these attributes will trigger)
   * @param {number} options.timeout - Timeout in milliseconds (optional)
   * @param {Function} options.onTimeout - Function to call on timeout (optional)
   * @returns {Function} Function to stop observing
   * 
   * @example
   * // Observe attribute changes on a button
   * const stopObserving = utils.observeSelector('#myButton', (element, mutation) => {
   *   console.log('Button mutated:', mutation.type);
   *   if (mutation.type === 'attributes') {
   *     console.log('Attribute changed:', mutation.attributeName);
   *   }
   * }, {
   *   mutations: ['attributes'],
   *   attributeFilter: ['class', 'disabled']
   * });
   * 
   * @example
   * // Observe when children are added/removed
   * utils.observeSelector('.product-list', (element, mutation) => {
   *   if (mutation.type === 'childList') {
   *     console.log('Children changed:', mutation.addedNodes.length, 'added');
   *   }
   * }, {
   *   mutations: ['childList', 'subtree']
   * });
   */
  observeSelector: function(selector, callback, options = {}) {
    const {
      mutations = ['childList', 'attributes', 'subtree'],
      timeout = null,
      onTimeout = null,
      attributeFilter = null
    } = options;

    // Build MutationObserver options
    const observerOptions = {
      childList: mutations.includes('childList'),
      attributes: mutations.includes('attributes'),
      characterData: mutations.includes('characterData'),
      subtree: mutations.includes('subtree'),
      attributeOldValue: mutations.includes('attributeOldValue'),
      characterDataOldValue: mutations.includes('characterDataOldValue')
    };

    if (attributeFilter && Array.isArray(attributeFilter)) {
      observerOptions.attributeFilter = attributeFilter;
    }

    let observer = null;
    let timeoutId = null;
    let isStopped = false;

    // Get or wait for element
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    
    function startObserving(el) {
      if (!el || isStopped) return;

      observer = new MutationObserver((mutationRecords, obs) => {
        if (isStopped) return;
        mutationRecords.forEach(mutation => {
          callback(el, mutation, obs);
        });
      });

      observer.observe(el, observerOptions);

      if (timeout) {
        timeoutId = setTimeout(() => {
          stopObserving();
          if (onTimeout) onTimeout();
        }, timeout);
      }
    }

    function stopObserving() {
      isStopped = true;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    if (element) {
      // Element exists, start observing immediately
      startObserving(element);
    } else if (typeof selector === 'string') {
      // Element doesn't exist yet, wait for it
      this.waitForElement(selector).then(el => {
        if (!isStopped) {
          startObserving(el);
        }
      });
    }

    return stopObserving;
  },

  /**
   * Observe mutations on all elements matching the selector
   * The callback is called every time any matching element is mutated
   * Note: This observes all matching elements. Use observeSelector() to observe only the first element.
   * 
   * @param {string} selector - CSS selector to observe
   * @param {Function} callback - Callback function that receives (element, mutationRecord, observer)
   * @param {Object} options - Options object
   * @param {Array<string>} options.mutations - Array of mutation types to observe. Options:
   *   - 'childList' - Watch for child nodes being added/removed (default: true)
   *   - 'attributes' - Watch for attribute changes (default: true)
   *   - 'characterData' - Watch for text content changes (default: false)
   *   - 'subtree' - Watch all descendants, not just direct children (default: true)
   *   - 'attributeOldValue' - Include old attribute value in mutation record (default: false)
   *   - 'characterDataOldValue' - Include old text value in mutation record (default: false)
   *   - 'attributeFilter' - Array of attribute names to observe (only these attributes will trigger)
   * @param {number} options.timeout - Timeout in milliseconds (optional)
   * @param {Function} options.onTimeout - Function to call on timeout (optional)
   * @returns {Function} Function to stop observing
   * 
   * @example
   * // Observe all product cards for attribute changes
   * const stopObserving = utils.observeSelectors('.product-card', (element, mutation) => {
   *   if (mutation.type === 'attributes' && mutation.attributeName === 'data-price') {
   *     console.log('Price changed on:', element);
   *   }
   * }, {
   *   mutations: ['attributes'],
   *   attributeFilter: ['data-price', 'class']
   * });
   * 
   * @example
   * // Observe when children are added to any matching container
   * utils.observeSelectors('.dynamic-list', (element, mutation) => {
   *   if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
   *     console.log('New items added to:', element);
   *   }
   * }, {
   *   mutations: ['childList']
   * });
   */
  observeSelectors: function(selector, callback, options = {}) {
    const {
      mutations = ['childList', 'attributes', 'subtree'],
      timeout = null,
      onTimeout = null,
      attributeFilter = null
    } = options;

    // Build MutationObserver options
    const observerOptions = {
      childList: mutations.includes('childList'),
      attributes: mutations.includes('attributes'),
      characterData: mutations.includes('characterData'),
      subtree: mutations.includes('subtree'),
      attributeOldValue: mutations.includes('attributeOldValue'),
      characterDataOldValue: mutations.includes('characterDataOldValue')
    };

    if (attributeFilter && Array.isArray(attributeFilter)) {
      observerOptions.attributeFilter = attributeFilter;
    }

    const observers = new Map(); // Map of element -> observer
    let timeoutId = null;

    // Function to observe a specific element
    function observeElement(element) {
      if (observers.has(element)) return; // Already observing

      const observer = new MutationObserver((mutationRecords, obs) => {
        mutationRecords.forEach(mutation => {
          callback(element, mutation, obs);
        });
      });

      observer.observe(element, observerOptions);
      observers.set(element, observer);
    }

    // Function to find and observe all matching elements
    function findAndObserveElements() {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => observeElement(el));
    }

    // Observe existing elements
    findAndObserveElements();

    // Set up observer to watch for new elements being added
    const rootObserver = new MutationObserver(() => {
      findAndObserveElements();
    });

    rootObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    if (timeout) {
      timeoutId = setTimeout(() => {
        stopObserving();
        if (onTimeout) onTimeout();
      }, timeout);
    }

    function stopObserving() {
      rootObserver.disconnect();
      observers.forEach(observer => observer.disconnect());
      observers.clear();
    }

    return stopObserving;
  },

  /**
   * Poll - repeatedly execute a callback at specified intervals
   * @param {Function} callback - Function to execute
   * @param {number} delay - Delay in milliseconds between executions
   * @returns {Function} Function to cancel polling
   */
  poll: function(callback, delay) {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  },

  /**
   * Get element text content
   * @param {Element|string} element - Element or selector
   * @returns {string} Text content
   */
  getText: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.textContent : '';
  },

  /**
   * Set element text content
   * @param {Element|string} element - Element or selector
   * @param {string} text - Text to set
   */
  setText: function(element, text) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.textContent = text;
  },

  /**
   * Get element inner HTML
   * @param {Element|string} element - Element or selector
   * @returns {string} HTML content
   */
  getHTML: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.innerHTML : '';
  },

  /**
   * Set element inner HTML
   * @param {Element|string} element - Element or selector
   * @param {string} html - HTML to set
   */
  setHTML: function(element, html) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.innerHTML = html;
  },

  /**
   * Get element attribute value
   * @param {Element|string} element - Element or selector
   * @param {string} attr - Attribute name
   * @returns {string|null} Attribute value or null
   */
  getAttr: function(element, attr) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.getAttribute(attr) : null;
  },

  /**
   * Set element attribute
   * @param {Element|string} element - Element or selector
   * @param {string} attr - Attribute name
   * @param {string} value - Attribute value
   */
  setAttr: function(element, attr, value) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.setAttribute(attr, value);
  },

  /**
   * Remove element attribute
   * @param {Element|string} element - Element or selector
   * @param {string} attr - Attribute name
   */
  removeAttr: function(element, attr) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.removeAttribute(attr);
  },

  /**
   * Get data attribute value
   * @param {Element|string} element - Element or selector
   * @param {string} name - Data attribute name (without 'data-' prefix)
   * @returns {string|null} Data attribute value or null
   */
  getData: function(element, name) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.getAttribute(`data-${name}`) : null;
  },

  /**
   * Set data attribute
   * @param {Element|string} element - Element or selector
   * @param {string} name - Data attribute name (without 'data-' prefix)
   * @param {string} value - Data attribute value
   */
  setData: function(element, name, value) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.setAttribute(`data-${name}`, value);
  },

  /**
   * Get computed style property value
   * @param {Element|string} element - Element or selector
   * @param {string} property - CSS property name
   * @returns {string} Computed style value
   */
  getStyle: function(element, property) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return '';
    const computed = window.getComputedStyle(el);
    return property ? computed.getPropertyValue(property) : computed;
  },

  /**
   * Set element style property
   * @param {Element|string} element - Element or selector
   * @param {string|Object} property - CSS property name or object of properties
   * @param {string} value - CSS value (if property is string)
   */
  setStyle: function(element, property, value) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    if (typeof property === 'object') {
      Object.assign(el.style, property);
    } else {
      el.style[property] = value;
    }
  },

  /**
   * Get or set element value (for form inputs)
   * @param {Element|string} element - Element or selector
   * @param {string} value - Value to set (optional)
   * @returns {string|undefined} Current value if getting, undefined if setting
   */
  val: function(element, value) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return undefined;
    
    if (value === undefined) {
      return el.value || '';
    } else {
      el.value = value;
      // Trigger input event for React/Vue compatibility
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },

  /**
   * Check if element is visible (not hidden by display, visibility, or opacity)
   * @param {Element|string} element - Element or selector
   * @returns {boolean} True if element is visible
   */
  isVisible: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return false;
    
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' &&
           el.offsetWidth > 0 && 
           el.offsetHeight > 0;
  },

  /**
   * Show element (set display to block or original value)
   * @param {Element|string} element - Element or selector
   * @param {string} display - Display value (default: 'block')
   */
  show: function(element, display = 'block') {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
      if (!el.dataset.originalDisplay) {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
      }
      el.style.display = display;
    }
  },

  /**
   * Hide element (set display to none)
   * @param {Element|string} element - Element or selector
   */
  hide: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
      if (!el.dataset.originalDisplay) {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
      }
      el.style.display = 'none';
    }
  },

  /**
   * Get element dimensions and position
   * @param {Element|string} element - Element or selector
   * @returns {Object} Object with width, height, top, left, right, bottom
   */
  getRect: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      x: rect.x,
      y: rect.y
    };
  },

  /**
   * Get element offset (position relative to document)
   * @param {Element|string} element - Element or selector
   * @returns {Object} Object with top and left offset
   */
  getOffset: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
  },

  /**
   * Get or set URL query parameters
   * @param {string} name - Parameter name (optional, if omitted returns all params)
   * @param {string} value - Value to set (optional)
   * @param {string} url - URL to use (defaults to current location)
   * @returns {string|Object|null} Parameter value, all params object, or null
   */
  queryParam: function(name, value, url = window.location.href) {
    const urlObj = new URL(url);
    
    if (name === undefined) {
      // Return all params as object
      const params = {};
      urlObj.searchParams.forEach((val, key) => {
        params[key] = val;
      });
      return params;
    }
    
    if (value === undefined) {
      // Get param
      return urlObj.searchParams.get(name);
    } else {
      // Set param
      urlObj.searchParams.set(name, value);
      return urlObj.toString();
    }
  },

  /**
   * Update URL without page reload
   * @param {string} url - New URL
   * @param {boolean} replace - If true, replace current history entry (default: false)
   */
  updateURL: function(url, replace = false) {
    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  },

  /**
   * Debounce function - delays execution until after wait time
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - If true, trigger on leading edge (default: false)
   * @returns {Function} Debounced function
   */
  debounce: function(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },

  /**
   * Throttle function - limits execution to once per wait time
   * @param {Function} func - Function to throttle
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Throttled function
   */
  throttle: function(func, wait) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, wait);
      }
    };
  },

  /**
   * Get localStorage item
   * @param {string} key - Storage key
   * @returns {string|null} Stored value or null
   */
  getLocalStorage: function(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },

  /**
   * Set localStorage item
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  setLocalStorage: function(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('Failed to set localStorage:', e);
    }
  },

  /**
   * Remove localStorage item
   * @param {string} key - Storage key
   */
  removeLocalStorage: function(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to remove localStorage:', e);
    }
  },

  /**
   * Get sessionStorage item
   * @param {string} key - Storage key
   * @returns {string|null} Stored value or null
   */
  getSessionStorage: function(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },

  /**
   * Set sessionStorage item
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  setSessionStorage: function(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn('Failed to set sessionStorage:', e);
    }
  },

  /**
   * Remove sessionStorage item
   * @param {string} key - Storage key
   */
  removeSessionStorage: function(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to remove sessionStorage:', e);
    }
  },

  /**
   * Check if device is mobile
   * @returns {boolean} True if mobile device
   */
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Check if device is tablet
   * @returns {boolean} True if tablet device
   */
  isTablet: function() {
    return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
  },

  /**
   * Check if device is desktop
   * @returns {boolean} True if desktop device
   */
  isDesktop: function() {
    return !this.isMobile() && !this.isTablet();
  },

  /**
   * Get device type
   * @returns {string} 'mobile', 'tablet', or 'desktop'
   */
  getDeviceType: function() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  },

  /**
   * Get browser name
   * @returns {string} Browser name (chrome, firefox, safari, edge, etc.)
   */
  getBrowser: function() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('chrome') && !ua.includes('edg')) return 'chrome';
    if (ua.includes('firefox')) return 'firefox';
    if (ua.includes('safari') && !ua.includes('chrome')) return 'safari';
    if (ua.includes('edg')) return 'edge';
    if (ua.includes('opera') || ua.includes('opr')) return 'opera';
    return 'unknown';
  },

  /**
   * Wait for DOM ready
   * @returns {Promise} Promise that resolves when DOM is ready
   */
  ready: function() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  },

  /**
   * Wait for window load
   * @returns {Promise} Promise that resolves when window is loaded
   */
  load: function() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
  },

  /**
   * Create an element
   * @param {string} tag - HTML tag name
   * @param {Object} attrs - Attributes object
   * @param {string|Element} content - Text content or child element
   * @returns {Element} Created element
   */
  createElement: function(tag, attrs = {}, content = '') {
    const el = document.createElement(tag);
    
    Object.keys(attrs).forEach(key => {
      if (key === 'class') {
        el.className = attrs[key];
      } else if (key === 'style' && typeof attrs[key] === 'object') {
        Object.assign(el.style, attrs[key]);
      } else {
        el.setAttribute(key, attrs[key]);
      }
    });
    
    if (typeof content === 'string') {
      el.textContent = content;
    } else if (content instanceof Element) {
      el.appendChild(content);
    }
    
    return el;
  },

  /**
   * Append element to parent
   * @param {Element|string} parent - Parent element or selector
   * @param {Element|string} child - Child element or selector
   */
  append: function(parent, child) {
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
    const childEl = typeof child === 'string' ? document.querySelector(child) : child;
    if (parentEl && childEl) {
      parentEl.appendChild(childEl);
    }
  },

  /**
   * Prepend element to parent
   * @param {Element|string} parent - Parent element or selector
   * @param {Element|string} child - Child element or selector
   */
  prepend: function(parent, child) {
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
    const childEl = typeof child === 'string' ? document.querySelector(child) : child;
    if (parentEl && childEl) {
      parentEl.insertBefore(childEl, parentEl.firstChild);
    }
  },

  /**
   * Remove element from DOM
   * @param {Element|string} element - Element or selector
   */
  remove: function(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },

  /**
   * Clone element
   * @param {Element|string} element - Element or selector
   * @param {boolean} deep - Deep clone (default: true)
   * @returns {Element} Cloned element
   */
  clone: function(element, deep = true) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.cloneNode(deep) : null;
  },

  /**
   * Get parent element
   * @param {Element|string} element - Element or selector
   * @param {string} selector - Optional selector to match parent
   * @returns {Element|null} Parent element or null
   */
  parent: function(element, selector) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    if (selector) {
      return el.closest(selector);
    }
    return el.parentElement;
  },

  /**
   * Get children elements
   * @param {Element|string} element - Element or selector
   * @param {string} selector - Optional selector to filter children
   * @returns {Array} Array of child elements
   */
  children: function(element, selector) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return [];
    
    const children = Array.from(el.children);
    if (selector) {
      return children.filter(child => child.matches(selector));
    }
    return children;
  },

  /**
   * Get siblings of element
   * @param {Element|string} element - Element or selector
   * @param {string} selector - Optional selector to filter siblings
   * @returns {Array} Array of sibling elements
   */
  siblings: function(element, selector) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el || !el.parentNode) return [];
    
    const siblings = Array.from(el.parentNode.children).filter(child => child !== el);
    if (selector) {
      return siblings.filter(sibling => sibling.matches(selector));
    }
    return siblings;
  },

  /**
   * Find element within context
   * @param {Element|string} context - Context element or selector
   * @param {string} selector - CSS selector
   * @returns {Element|null} Found element or null
   */
  find: function(context, selector) {
    const ctx = typeof context === 'string' ? document.querySelector(context) : context;
    return ctx ? ctx.querySelector(selector) : null;
  },

  /**
   * Find all elements within context
   * @param {Element|string} context - Context element or selector
   * @param {string} selector - CSS selector
   * @returns {NodeList} NodeList of found elements
   */
  findAll: function(context, selector) {
    const ctx = typeof context === 'string' ? document.querySelector(context) : context;
    return ctx ? ctx.querySelectorAll(selector) : [];
  },

  /**
   * Check if element matches selector
   * @param {Element|string} element - Element or selector
   * @param {string} selector - CSS selector to match
   * @returns {boolean} True if element matches selector
   */
  matches: function(element, selector) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.matches(selector) : false;
  },

  /**
   * Get closest ancestor matching selector
   * @param {Element|string} element - Element or selector
   * @param {string} selector - CSS selector
   * @returns {Element|null} Closest matching element or null
   */
  closest: function(element, selector) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.closest(selector) : null;
  },

  /**
   * Track scroll depth
   * @param {Function} callback - Callback function that receives depth percentage
   * @param {Array} thresholds - Array of depth thresholds to trigger (default: [25, 50, 75, 100])
   * @returns {Function} Function to stop tracking
   */
  trackScrollDepth: function(callback, thresholds = [25, 50, 75, 100]) {
    const triggered = new Set();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleScroll = this.throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const depth = Math.round((scrollTop / maxScroll) * 100);
      
      thresholds.forEach(threshold => {
        if (depth >= threshold && !triggered.has(threshold)) {
          triggered.add(threshold);
          callback(threshold, depth);
        }
      });
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },

  /**
   * Track time on page
   * @param {Function} callback - Callback function that receives time in seconds
   * @param {number} interval - Check interval in milliseconds (default: 1000)
   * @returns {Function} Function to stop tracking
   */
  trackTimeOnPage: function(callback, interval = 1000) {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      callback(timeOnPage);
    }, interval);
    
    return () => clearInterval(intervalId);
  },

  /**
   * Track element visibility using Intersection Observer
   * @param {Element|string} element - Element or selector
   * @param {Function} callback - Callback function that receives visibility state
   * @param {Object} options - Intersection Observer options
   * @returns {Function} Function to stop observing
   */
  trackVisibility: function(element, callback, options = {}) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return () => {};
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry.isIntersecting, entry.intersectionRatio, entry);
      });
    }, {
      threshold: options.threshold || 0,
      rootMargin: options.rootMargin || '0px',
      ...options
    });
    
    observer.observe(el);
    return () => observer.disconnect();
  },

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber: function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (default: 'USD')
   * @param {string} locale - Locale (default: 'en-US')
   * @returns {string} Formatted currency string
   */
  formatCurrency: function(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  /**
   * Parse query string to object
   * @param {string} queryString - Query string (defaults to current search)
   * @returns {Object} Object with query parameters
   */
  parseQuery: function(queryString = window.location.search) {
    const params = {};
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },

  /**
   * Build query string from object
   * @param {Object} params - Object with query parameters
   * @returns {string} Query string
   */
  buildQuery: function(params) {
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        urlParams.append(key, params[key]);
      }
    });
    return urlParams.toString();
  },

  /**
   * Get random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Get random item from array
   * @param {Array} array - Array to pick from
   * @returns {*} Random item
   */
  randomItem: function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * Shuffle array
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array (new array)
   */
  shuffle: function(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  /**
   * Deep clone object
   * @param {*} obj - Object to clone
   * @returns {*} Cloned object
   */
  deepClone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Merge objects
   * @param {Object} target - Target object
   * @param {...Object} sources - Source objects
   * @returns {Object} Merged object
   */
  merge: function(target, ...sources) {
    return Object.assign({}, target, ...sources);
  },

  /**
   * Check if value is empty (null, undefined, empty string, empty array, empty object)
   * @param {*} value - Value to check
   * @returns {boolean} True if empty
   */
  isEmpty: function(value) {
    if (value == null) return true;
    if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }
};

