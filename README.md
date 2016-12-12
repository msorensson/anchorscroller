## About

A pure javascript plugin for scrolling to an anchors in the page.

### Usage
```javascript
var anchorScroller = require('anchorscroller');

anchorScroller(document.querySelectorAll('.elements'), {
    // Optional settings
});
```

or you can trigger it programmatically

```javascript
var anchorScroller = require('anchorscroller')([], /* options */);
anchorScroller(document.querySelector('#element-to-scroll-to'));
```

### Settings
```javascript
duration: The duration of the scroll animation in milliseconds (defaults to 200).
distance: The pixel distance to scroll after the first 'jump'. (defaults to 400).
offset: In cases where a sticky header is present we might need to offset the final scrollTop to compensate.
easingEquation: Optional easing equation function in the form of function(t, b, c, d).
```

### Credits
Cudos to [David Skoog](https://github.com/davidskoog) for the jump-and-scroll concept.
