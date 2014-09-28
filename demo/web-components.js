window.app = {
    createElement: function(tagName, templateId, basePrototype, callbacks) {
        basePrototype = basePrototype || HTMLElement.prototype;
        var template = document.currentScript.ownerDocument.getElementById(templateId).content;
        var customElementPrototype = Object.create(basePrototype);
        callbacks = callbacks || {};
        customElementPrototype.attachedCallback = callbacks.attachedCallback || function() {};
        customElementPrototype.createdCallback = callbacks.createdCallback || function() {
            var shadowRoot = this.createShadowRoot();
            var clone = document.importNode(template, true);
            shadowRoot.appendChild(clone);
        };
        customElementPrototype.attributeChangedCallback = callbacks.attributeChangedCallback || function() {};
        customElementPrototype.detachedCallback = callbacks.detachedCallback || function() {};
        document.registerElement(tagName, {
            prototype: customElementPrototype
        });
        return customElementPrototype;
    }
};