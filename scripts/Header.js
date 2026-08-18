import { createElement } from "./Functions.js"

import HeaderLogo from "./HeaderLogo.js"
import HeaderMenu from "./HeaderMenu.js"
import BurgerMenu from "./BurgerMenu.js"
import ThemeSwitcher from './SwitchTheme.js'
import Modal from './Modal.js'

class Header {
    selectors = {
        rootProject: '[data-js-root]'
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',
        colorLight: 'var(--color-white)',

        transitionDuration: 'var(--transition-duration)'
    }

    position = {
        afterbegin: 'afterbegin',
        beforeend: 'beforeend'
    }

    constructor(parent) {
        this.parent = parent
        this.element = null
        this.inner = null
        this.action = null

        this.render()
    }

    render() {
        const rootElementProject = document.querySelector(this.selectors.rootProject)

        this.element = createElement('header', {
            className: 'header',
            parent: rootElementProject,
            position: this.position.afterbegin,
            styles: {
                width: '100%',
                height: '100px',
                position: 'sticky',
                top: '0',
                zIndex: '1000',
                transition: this.rootVarCss.transitionDuration
            }
        })

        this.inner = createElement('div', {
            className: 'header__inner',
            parent: this.element,
            attributes: {
                'data-js-header-inner': ''
            },
            styles: {
                maxWidth: '100%',
                height: '100%',
                paddingInline: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        })

        this.logo = new HeaderLogo(this.inner)
        this.menuList = new HeaderMenu(this.inner)

        this.action = createElement('div',{
            className: 'header__action',
            parent: this.inner,
            position: this.position.beforeend,
            styles: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }
        })

        this.themeSwitcher = new ThemeSwitcher(this.action)
        this.modal = new Modal(rootElementProject)
        this.burgerMenu = new BurgerMenu(this.action, (isOpen) => {
            if(isOpen) {
                this.modal.open()

                // Object.assign(this.logo.element.style, {
                //     backgroundColor: this.rootVarCss.colorLight
                // })
                // this.menuList.linksArray.forEach((link) => {
                //     link.style.color = this.color.rootVarCss.colorLight
                // })
                // Object.assign(this.inner.style, {

                // })
                // this.burgerMenu.burgerLines.forEach(line => {
                //     line.style.backgroundColor = this.rootVarCss.colorLight
                // })
            } else {
                this.modal.close()
            }
        })
        
    }
}

export default Header