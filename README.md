# Vanilla-JS-Fade-In-Out
A pure JavaScript implementation of jQuery's `fadeIn` and `fadeOut` methods.
## Features
* Can be invoked on any element with the syntax `Element.fadeIn([duration])` or `Element.fadeOut([duration])`.
* Takes one optional parameter: the fade effect duration in milliseconds.
* Unlike most other Vanilla JS implementations, sequential calls on the same element (example: `Element.fadeOut(1500); Element.fadeIn(2500); Element.fadeOut(500); Element.fadeIn(2000);`) are queued up and executed in the order they are called.
