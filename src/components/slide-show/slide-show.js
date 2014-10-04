(function(window, undefined) {

    var elementName = 'slide-show';
    var templateName = 'slide-show-template';
    var template = document.currentScript.ownerDocument.getElementById(templateName).content;
    var elementPrototype = Object.create(HTMLElement.prototype);

    elementPrototype.createdCallback = function() {
        var shadowRoot = this.createShadowRoot();
        var clone = document.importNode(template, true);
        shadowRoot.appendChild(clone);
    };

    // Attach methods and properties to element
    elementPrototype.initialize = function() {
        this.slides = Array.prototype.slice.call(this.querySelectorAll('slide-content'));
        this.progressBar = this.shadowRoot.querySelector('.progress-bar');
        this.nextArrow = this.shadowRoot.querySelector('.next');
        this.prevArrow = this.shadowRoot.querySelector('.prev');
        this.nextArrow.addEventListener('click', this.goToNext.bind(this));
        this.prevArrow.addEventListener('click', this.goToPrev.bind(this));
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        if (window.location.hash) {
            this.goTo(window.location.hash.substr(1));
        }
        else {
            this.goTo(0);
        }
    };
    elementPrototype.RIGHT_KEY_CODE = 39;
    elementPrototype.LEFT_KEY_CODE = 37;
    elementPrototype.UP_KEY_CODE = 38;
    elementPrototype.DOWN_KEY_CODE = 40;
    elementPrototype.SPACE_KEY_CODE = 32;
    elementPrototype.handleKeydown = function(e) {
        if (e.which === this.RIGHT_KEY_CODE || e.which === this.DOWN_KEY_CODE || e.which === this.SPACE_KEY_CODE) {
            this.goToNext();
        }
        else if (e.which === this.LEFT_KEY_CODE || e.which === this.UP_KEY_CODE) {
            this.goToPrev();
        }
    };
    elementPrototype.goToNext = function() {
        if (this.slides[this.current + 1]) {
            this.goTo(this.current + 1);
        }
    };
    elementPrototype.goToPrev = function() {
        if (this.slides[this.current - 1]) {
            this.goTo(this.current - 1);
        }
    };
    elementPrototype.goTo = function(i) {
        // First, hide all the slides
        this.slides.forEach(function(slide) {
            slide.hide();
        });
        // Then, if there's a slide to go to, show it
        if (this.slides[i]) {
            this.slides[i].show();
            this.current = i;
            window.location.hash = this.current;
            this.progressBar.style.width = (this.current / (this.slides.length - 1)) * 100 + '%';
            if (!this.slides[i + 1]) {
                this.nextArrow.style.display = 'none';
            }
            else {
                this.nextArrow.style.display = 'block';
            }
            if (!this.slides[i - 1]) {
                this.prevArrow.style.display = 'none';
            }
            else {
                this.prevArrow.style.display = 'block';
            }

        }
    };

    window.SlideShowElement = document.registerElement(elementName, {
        prototype: elementPrototype
    });
}(window));