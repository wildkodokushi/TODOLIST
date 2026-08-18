import { createElement } from "./Functions.js"

class BurgerMenu {
    constructor(parent, onClick) {
        this.parent = parent
        this.element = null
        this.burgerMenu = null
        this.burgerLines = []
        this.onClick = onClick
        this.isActive = false

        this.render()
    }

    stateClasses = {
        active: 'active'
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',
        colorLight: 'var(--color-white)',

        transitionDuration: 'var(--transition-duration)'
    }

    toggle() {
        this.isActive = !this.isActive

        this.burgerMenu.classList.toggle(this.stateClasses.active)

        if(this.onClick) {
            this.onClick(this.isActive)
        }
    }

    render() {
        this.burgerMenu = createElement('button', {
            className: 'header__burger',
            parent: this.parent,
            styles: {
                position: 'relative',
                width: '25px',
                height: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: 'none',
            },
            events: {
                click: () => this.toggle()
            }
        })

        const lineId = ['lineOne', 'lineSeconde', 'lineThree']
        this.burgerLines = lineId.map(id => {
            return createElement('span', {
                className: 'header__burger-line',
                parent: this.burgerMenu,
                attributes: {id},
                styles: {
                    width: '100%',
                    height: '3px',
                    transformOrigin: 'center',
                    backgroundColor: this.rootVarCss.colorDark,
                    transition: this.rootVarCss.transitionDuration
                }
            })
        })
    }
}

export default BurgerMenu