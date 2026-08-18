import { createElement } from "./Functions.js"

class HeaderLogo {
    position = {
        afterbegin: 'afterbegin'
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',

        transitionDuration: 'var(--transition-duration)'
    }

    constructor(parent) {
        this.parent = parent
        this.element = null

        this.render()
    }

    render() {
        this.element = createElement('a', {
            className: 'header__logo',
            parent: this.parent,
            position: this.position.afterbegin,
            attributes: {
                'href' : './'
            },
            styles: {
                width: '50px',
                height: '50px',
                backgroundColor: this.rootVarCss.colorDark,
                transitionDuration: this.rootVarCss.transitionDuration
            }
        })
    }
}

export default HeaderLogo