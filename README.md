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
Wait for an element to appear in the DOM.

```javascript
utils.waitForElement('#myElement').then(element => {
  console.log('Element found:', element);
});
```

#### `waitUntil(condition, interval)`
Wait until a condition function returns true.

```javascript
utils.waitUntil(() => document.readyState === 'complete');
```

#### `select(selector, context)`
Select a single element.

```javascript
const button = utils.select('#myButton');
```

#### `selectAll(selector, context)`
Select multiple elements.

```javascript
const buttons = utils.selectAll('.button');
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

