import { createElement } from "./Functions.js";

class Preloader {
    selectors = {
        preloader: ['data-js-preloader']
    }

    constructor(parent) {
        this.parent = parent
        this.element = null

        this.bindEvents()
    }

    setInitialPreloader() {
        const preloaderElement = document.querySelector(this.selectors.preloader)

        preloaderElement.addEventListener('animationend', (event) => {
            if(event.animationName === 'preloader') {
                preloaderElement.dispatchEvent(
                    new Event('preloaderClose', { bubbles: true })
                )
            }
        })
    }

    bindEvents() {
        this.render()
        this.setInitialPreloader()
    }

    render() {
        this.element = createElement('div', {
            className: 'prealoader',
            parent: this.parent,
            attributes: {
                [this.selectors.prealoader] : ''
            },
            styles: {
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgb(45, 168, 107)',
                zIndex: '10000',
                animation: 'preloader 3s forwards'
            }
        })
    }
}

export default Preloader

// const preloader = createHTML('div', 'preloader');
// insertNode(rootProject, 'beforeend', preloader);
// const preloaderElement = document.querySelector('.preloader');

// setStyles(preloaderElement, {
//     position: 'absolute',
//     inset: '0',
//     width: '100%',
//     height: '100vh',
//     backgroundColor: 'rgb(45, 168, 107)',
//     zIndex: '10000',
//     animation: 'preloader 3s forwards'
// })

// preloaderElement.addEventListener("animationend", (event) => {
//     if(event.animationName === 'preloader') {
//         preloaderElement.dispatchEvent(
//             new Event('preloaderClose', { bubbles: true })
//         )
//     }
// });
