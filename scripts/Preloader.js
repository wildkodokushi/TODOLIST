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

    stateClasses = {
        scrollLock: 'scroll-lock'
    }

    newEventPreloader() {
        this.element.addEventListener('animationend', (event) => {
            if(event.animationName === 'preloader') {
                document.body.classList.add(this.stateClasses.scrollLock)
                document.dispatchEvent(
                    new Event('preloaderClose', { bubbles: true })
                )

                this.element.remove()
                document.body.classList.remove(this.stateClasses.scrollLock)
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
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.rootVarCss.colorDark,
                zIndex: '10000',
                animation: 'preloader 0s forwards'
            }
        })
    }
}

export default Preloader