# @briannorman9/eli-utils

Utility functions for web experiments with ELI (Experimentation Local Interface).

## Installation

```bash
npm install @briannorman9/eli-utils
```

## Usage

Import the utils in your ELI variant code:

```javascript
import utils from '@eli/utils';
```

**Note:** ELI's import system automatically resolves `@eli/utils` to `@briannorman9/eli-utils` from your project's `node_modules`.

## API

### DOM Utilities

#### `waitForElement(selector)`
Wait for the first element matching the selector to appear in the DOM. Note: This only matches the first element. Use `waitForElements()` to match all elements.

```javascript
utils.waitForElement('#myElement').then(element => {
  console.log('Element found:', element);
});
```

#### `waitForElements(selector, context)`
Wait for all elements matching the selector to appear in the DOM. Note: This matches all elements. Use `waitForElement()` to match only the first element.

```javascript
utils.waitForElements('.product-card').then(elements => {
  elements.forEach(card => card.style.border = '2px solid red');
});
```

#### `waitUntil(condition, interval)`
Wait until a condition function returns true.

```javascript
utils.waitUntil(() => document.readyState === 'complete');
```

#### `select(selector, context)`
Select a single element (returns immediately, does not wait).

```javascript
const button = utils.select('#myButton');
```

#### `observeSelector(selector, callback, options)`
Observe mutations on the first element matching the selector. The callback is called every time the element is mutated (attributes, children, text, etc.). Note: This only observes the first matching element. Use `observeSelectors()` to observe all elements.

**Mutation types:**
- `'childList'` - Watch for child nodes being added/removed (default: true)
- `'attributes'` - Watch for attribute changes (default: true)
- `'characterData'` - Watch for text content changes (default: false)
- `'subtree'` - Watch all descendants, not just direct children (default: true)
- `'attributeOldValue'` - Include old attribute value in mutation record (default: false)
- `'characterDataOldValue'` - Include old text value in mutation record (default: false)
- `'attributeFilter'` - Array of attribute names to observe (only these attributes will trigger)

```javascript
// Observe attribute changes on a button
const stopObserving = utils.observeSelector('#myButton', (element, mutation) => {
  console.log('Button mutated:', mutation.type);
  if (mutation.type === 'attributes') {
    console.log('Attribute changed:', mutation.attributeName);
  }
}, {
  mutations: ['attributes'],
  attributeFilter: ['class', 'disabled']
});

// Observe when children are added/removed
utils.observeSelector('.product-list', (element, mutation) => {
  if (mutation.type === 'childList') {
    console.log('Children changed:', mutation.addedNodes.length, 'added');
  }
}, {
  mutations: ['childList', 'subtree']
});
```

#### `observeSelectors(selector, callback, options)`
Observe mutations on all elements matching the selector. The callback is called every time any matching element is mutated. Note: This observes all matching elements. Use `observeSelector()` to observe only the first element.

```javascript
// Observe all product cards for attribute changes
const stopObserving = utils.observeSelectors('.product-card', (element, mutation) => {
  if (mutation.type === 'attributes' && mutation.attributeName === 'data-price') {
    console.log('Price changed on:', element);
  }
}, {
  mutations: ['attributes'],
  attributeFilter: ['data-price', 'class']
});
```

### Class Manipulation

#### `addClass(element, className)`
Add a class to an element.

```javascript
utils.addClass('#myButton', 'active');
```

#### `removeClass(element, className)`
Remove a class from an element.

```javascript
utils.removeClass('#myButton', 'inactive');
```

#### `toggleClass(element, className)`
Toggle a class on an element.

```javascript
utils.toggleClass('#myButton', 'active');
```

#### `hasClass(element, className)`
Check if an element has a class.

```javascript
if (utils.hasClass('#myButton', 'active')) {
  console.log('Button is active');
}
```

### Event Handling

#### `on(element, event, handler)`
Add an event listener.

```javascript
utils.on('#myButton', 'click', () => console.log('Clicked!'));
```

#### `off(element, event, handler)`
Remove an event listener.

```javascript
utils.off('#myButton', 'click', handler);
```

#### `delegate(parent, selector, event, handler)`
Event delegation - attach event to parent, handle on children.

```javascript
utils.delegate('#container', '.button', 'click', (e) => {
  console.log('Button clicked:', e.target);
});
```

#### `triggerEvent(eventName, data, target)`
Trigger a custom event.

```javascript
utils.triggerEvent('experimentLoaded', { variant: 'v1' });
```

### Cookies

#### `getCookie(name)`
Get a cookie value by name.

```javascript
const userId = utils.getCookie('userId');
```

#### `setCookie(name, value, days, path)`
Set a cookie.

```javascript
utils.setCookie('userId', '12345', 30);
```

### URL Utilities

#### `getQueryParam(name, url)`
Get a URL query parameter value.

```javascript
const campaign = utils.getQueryParam('campaign');
```

### Viewport Utilities

#### `getViewport()`
Get the viewport dimensions.

```javascript
const { width, height } = utils.getViewport();
```

#### `isInViewport(element, threshold)`
Check if element is in viewport.

```javascript
if (utils.isInViewport('#myElement')) {
  console.log('Element is visible');
}
```

#### `scrollIntoView(element, options)`
Scroll element into view.

```javascript
utils.scrollIntoView('#myElement', { behavior: 'smooth', block: 'center' });
```

## License

MIT

