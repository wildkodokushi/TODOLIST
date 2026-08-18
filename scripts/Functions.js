export function createElement(tagName, option = {}) {
    const element = document.createElement(tagName)

    if(option.className) {
        element.className = option.className
    }

    if(option.styles) {
        Object.assign(element.style, option.styles)
    }

    if(option.text) {
        element.textContent = option.text
    }

    if(option.html) {
        element.innerHTML = option.html
    }

    if(option.attributes) {
        Object.entries(option.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value)
        })
    }

    if(option.events) {
        Object.entries(option.events).forEach(([event, handler]) => {
            element.addEventListener(event, handler)
        })
    }

    if(option.parent) {
        const position = option.position || 'beforeend'

        if(position === 'beforeend' || position === 'afterbegin') {
            option.parent.insertAdjacentElement(position, element)
        } else {
            option.parent.insertAdjacentElement(position, element)
        }
    }

    return element
}