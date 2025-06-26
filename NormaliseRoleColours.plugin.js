/**
 * @name NormaliseRoleColours
 * @author jRazzak
 * @description Normalises role colour gradients.
 * @version 0.1.0
 */

const selector = '[style*="--custom-gradient-color-2"]';
const gradients = [
    '--custom-gradient-color-1',
    '--custom-gradient-color-2',
    '--custom-gradient-color-3'];

module.exports = class NormaliseRoleColours {
    start() {
        document
            .querySelectorAll(selector)
            .forEach(normaliseGradient);
    }

    stop() {
        document
            .querySelectorAll(selector)
            .forEach(restoreGradient);
    }

    observer(mutation) {
        for (const node of mutation.addedNodes) {
            // only elements
            if (!(node instanceof Element)) continue;


            // if it has a gradient, normalise it
            if (node.matches(selector)) {
                normaliseGradient(node);
            }

            // normalise its descendants
            node.querySelectorAll?.(selector).forEach(normaliseGradient);
        }

    }
}

function normaliseGradient(el) {
    // read color-1
    const c1 = el.style.getPropertyValue(gradients[0]);

    // store old values
    const c2 = el.style.getPropertyValue(gradients[1]);
    el.style.setProperty(gradients[1] + '-old', c2)

    const c3 = el.style.getPropertyValue(gradients[2]);
    el.style.setProperty(gradients[2] + '-old', c3)

    // overwrite colours with color-1
    el.style.setProperty(gradients[1], c1);
    el.style.setProperty(gradients[2], c1);
}

function restoreGradient(el) {
    const c2 = el.style.getPropertyValue(gradients[1] + '-old');
    if (c2) {
        el.style.setProperty(gradients[1], c2)
        el.style.removeProperty(gradients[1] + '-old');
    }
    const c3 = el.style.getPropertyValue(gradients[2] + '-old');
    if (c3) {
        el.style.setProperty(gradients[2], c3)
        el.style.removeProperty(gradients[2] + '-old');
    }
}
