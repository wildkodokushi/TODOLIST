import { createElement } from "./Functions.js"

class Modal {
    constructor(parent) {
        this.parent = parent
        this.element = null
        this.render()
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',
        colorLight: 'var(--color-white)',

        transitionDuration: 'var(--transition-duration)'
    }

    stateClasses = {
        active: 'active'
    }

    open() {
        this.element.classList.add(this.stateClasses.active)
    }

    close() {
        this.element.classList.remove(this.stateClasses.active)
    }

    render() {
        this.element = createElement('div', {
            className: 'modal',
            parent: this.parent,
            styles: {
                position: 'absolute',
                overflow: 'hidden',
                width: '0',
                height: '0',
                opacity: '0',
                zIndex: '0',
                top: '50%',
                left: '50%',
                color: this.rootVarCss.colorLight,
                transition: this.rootVarCss.transitionDuration
            }
        })
    }
}

export default Modal