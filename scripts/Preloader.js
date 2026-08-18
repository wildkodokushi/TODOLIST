import { createElement } from "./Functions.js";

class Preloader {
    constructor(parent) {
        this.parent = parent
        this.element = null

        this.bindEvents()
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',
        colorLight: 'var(--color-white)',
    }


    newEventPreloader() {
        this.element.addEventListener('animationend', (event) => {
            if(event.animationName === 'preloader') {
                document.dispatchEvent(
                    new Event('preloaderClose', { bubbles: true })
                )

                this.element.remove()
            }
        })
    }

    bindEvents() {
        this.render()
        this.newEventPreloader()
    }

    render() {
        this.element = createElement('div', {
            className: 'preloader',
            parent: this.parent,
            attributes: {
                'data-js-preloader' : ''
            },
            styles: {
                position: 'absolute',
                inset: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: this.rootVarCss.colorDark,
                zIndex: '10000',
                animation: 'preloader 2s forwards'
            }
        })
    }
}

export default Preloader