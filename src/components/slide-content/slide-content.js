(function(window, undefined) {
    var elementName = 'slide-content';
    var templateName = 'slide-content-template';
    var template = document.currentScript.ownerDocument.getElementById(templateName).content;
    var elementPrototype = Object.create(HTMLElement.prototype);

    elementPrototype.createdCallback = function() {
        var shadowRoot = this.createShadowRoot();
        var clone = document.importNode(template, true);
        shadowRoot.appendChild(clone);
    };
    
    // Attach methods and properties to element
    elementPrototype.show = function() {
        this.classList.add('current');
        this.resetImages();
    };
    elementPrototype.hide = function() {
        this.classList.remove('current');
    };
    elementPrototype.resetImages = function() {
        // Reset image src on timeout for animated gifs
        var imagesToReset = this.querySelectorAll('img[data-reset]');
        if (imagesToReset[0]) {
            Array.prototype.slice.call(imagesToReset).forEach(function(image) {
                var source = image.src;
                image.src = '';
                window.setTimeout(function() {
                    image.src = source;
                }, 0);
            });
        }
    };
    window.SlideContentElement = document.registerElement(elementName, {
        prototype: elementPrototype
    });
}(window));