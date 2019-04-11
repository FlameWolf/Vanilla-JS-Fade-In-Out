Object.defineProperties(Element.prototype, {
	"eventQueue": {
		"value": (function() {
			const queue = [];
			return Object.freeze({
				"push": function(func, params) {
					queue.push({ "function": func, "parameters": params });
				},
				"process": function() {
					if(queue.length > 0) {
						let event = null;
						event = queue.shift();
						event.function(...event.parameters);
						event = null;
					}
				}
			});
		})()
	},
	"fadeOut": {
		"value": function(duration, element) {
			duration = (duration || 125);
			let durationStep = (duration / 10);
			let currentElement = (element || this);
			let currentStyle = currentElement.style;
			let currentOpacity = parseFloat(getComputedStyle(currentElement).opacity);
			let opacityStep = (currentOpacity / durationStep);
			let currentDataset = currentElement.dataset;
			if(currentDataset.isFadingOut || currentDataset.isFadingIn) {
				currentElement.eventQueue.push(currentElement.fadeOut, [duration, currentElement]);
				return;
			}
			currentDataset.isFadingOut = "true";
			const step = function() {
				if(currentOpacity > 0) {
					currentOpacity -= opacityStep;
					currentStyle.opacity = currentOpacity.toString();
					requestAnimationFrame(step, durationStep);
				}
				else {
					currentStyle.visibility = "hidden";
					delete currentDataset.isFadingOut;
					currentElement.eventQueue.process();
					currentDataset = null;
					currentStyle = null;
					currentElement = null;
				}
			};
			requestAnimationFrame(step, durationStep);
		}
	},
	"fadeIn": {
		"value": function(duration, element) {
			duration = (duration || 125);
			let durationStep = (duration / 10);
			let currentElement = (element || this);
			let currentStyle = currentElement.style;
			let currentOpacity = parseFloat(getComputedStyle(currentElement).opacity);
			let opacityStep = ((1 - currentOpacity) / durationStep);
			let currentDataset = currentElement.dataset;
			if(currentDataset.isFadingIn || currentDataset.isFadingOut) {
				currentElement.eventQueue.push(currentElement.fadeIn, [duration, currentElement]);
				return;
			}
			currentStyle.visibility = "visible";
			currentDataset.isFadingIn = "true";
			const step = function() {
				if(currentOpacity < 1) {
					currentOpacity += opacityStep;
					currentStyle.opacity = currentOpacity.toString();
					requestAnimationFrame(step, durationStep);
				}
				else {
					delete currentDataset.isFadingIn;
					currentElement.eventQueue.process();
					currentDataset = null;
					currentStyle = null;
					currentElement = null;
				}
			};
			requestAnimationFrame(step, durationStep);
		}
	}
});