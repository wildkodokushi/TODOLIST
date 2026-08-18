import { createElement } from "./Functions.js"

class HeaderMenu {
    constructor(parent) {
        this.parent = parent
        this.element = null
        this.menuList = null
        this.linksArray = []

        this.render()
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',
        colorAccent: 'var(--color-accent)',
    }

    menuLinks = [
        { link: 'Главная', href: './' },
        { link: 'FAQ', href: '#FAQ' },
        { link: 'Контакты', href: '#contacts' }
    ]

    handlHover(event) {
        const isEnter = event.type === 'mouseenter'

        event.target.style.color = isEnter
            ? this.rootVarCss.colorAccent
            : this.rootVarCss.colorDark
    }

    render() {
        this.element = createElement('nav', {
            className: 'header__menu',
            parent: this.parent,
            styles: {
                maxWidth: '200px',
                width: '100%'
            }
        })

        this.menuList = createElement('ul', {
            className: 'header__manu-list',
            parent: this.element,
            styles: {
                width: '100%',
                padding: '0',
                display: 'flex',
                justifyContent: 'space-between',
                listStyle: 'none'
            }
        })

        this.linksArray = this.menuLinks.map(item => {
            const listItem = createElement('li', {
                className: 'header__menu-item',
                parent: this.menuList
            })

            return createElement('a', {
                className: 'header__menu-link',
                text: item.link,
                attributes: { href: item.href },
                parent: listItem,
                styles: {
                    color: this.rootVarCss.colorDark
                },
                events: {
                    mouseenter: (e) => this.handlHover(e),
                    mouseleave: (e) => this.handlHover(e)
                }
            })
        })
    }
}

export default HeaderMenu