import { createElement } from "./Functions.js"

class ThemeSwitcher {
    selectors = {
        switchThemeButton: ['data-js-theme-switcher'],
    }

    rootVarCss = {
        colorDark: 'var(--color-black)',

        transitionDuration: 'var(--transition-duration)'
    }

    themes = {
        dark: 'dark',
        light: 'light',
    }

    stateClasses = {
        isDarkTheme: 'is-dark-theme'
    }

    storageKey = 'theme'

    get isDarkThemeCached() {
        return localStorage.getItem(this.storageKey) === this.themes.dark
    }

    setInitialTheme() {
        document.documentElement.classList.toggle(this.stateClasses.isDarkTheme, this.isDarkThemeCached)
    }

    onClick = () => {
        localStorage.setItem(this.storageKey, this.isDarkThemeCached 
            ? this.themes.light 
            : this.themes.dark
        )

        document.documentElement.classList.toggle(this.stateClasses.isDarkTheme)
    }

    bindEvents() {
        this.render()
        this.setInitialTheme()
    }

    constructor(parent) {
        this.parent = parent
        this.element = null

        this.bindEvents()
    }

    render() {
        this.element = createElement('button', {
            className: 'header__switch',
            parent: this.parent,
            attributes: {
                [this.selectors.switchThemeButton] : ''
            },
            styles: {
                position: 'relative',
                width: '30px',
                height: '30px',
                borderRadius: '100%',
                border: 'none'
            },
            events: {
                click: () => this.onClick()
            }
        })
    }
}

export default ThemeSwitcher