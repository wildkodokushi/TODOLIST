import Todo from './Todo.js'

class FormsValidation {
    selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-errors]',
        sessionExitButton: '[data-js-session-exit-button]',
        rootToDo: '[data-js-todo]'
    }

    errorMessages = {
        valueMissing: () => 'Пожалуйста, заполните это поле!',
        patternMismatch: ({ title }) => title || 'Данные не соответсвуют формату!',
        tooShort: ({ minLength }) => `Слишком короткое сначение, минимальное колличество символов - ${minLength}!`,
        tooLong: ({ maxLength }) => `Слишком длинное значение, максимальное количество сиволов - ${maxLength}!`,
    }

    stateClasses = {
        isVisible: 'is-visible'
    }

    constructor() {
        this.bindEvent()

        this.savedForm = null
        this.formParent = null

        this.todoParent = null
        this.savedTodo = null

        this.checkAuth()
    }

    manageErrors(fieldControllElement, errorMessages) {
        const fieldErrorsElement = fieldControllElement.parentElement.querySelector(this.selectors.fieldErrors)

        fieldErrorsElement.innerHTML = errorMessages
            .map((message => `<span class="field__error">${message}</span>`))
            .join('')
    }

    validateField(fieldControllElement) {
        const errors = fieldControllElement.validity
        const errorMessages = []
        
        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if(errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControllElement))
            }
        })

        console.log(this.manageErrors(fieldControllElement, errorMessages));

        const isValid = errorMessages.length === 0

        fieldControllElement.ariaInvalid = !isValid

        return isValid
    }

    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.form)
        const isRequired = target.required

        if(isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onChange(event) {
        const { target } = event
        const isRequired = target.required
        const isToggleType = ['radio', 'checkbox'].includes(target.type)

        if(isToggleType && isRequired) {
            this.validateField(target)
        }
    }

    onSubmit(event) {
        const { target } = event
        const isFormElement = target.matches(this.selectors.form)

        if(!isFormElement) {
            return
        }

        const requiredControllsElements = [...target.elements].filter(({required}) => required)
        let isFormValid = true
        let firstInvalidFieldControl = null

        requiredControllsElements.forEach((element) => {
            const isFieldValid = this.validateField(element)

            if(!isFieldValid) {
                isFormValid = false

                if(!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element
                }
            }
        })

        if(!isFormValid) {
            event.preventDefault()
            firstInvalidFieldControl.focus()
        } else {
            event.preventDefault()

            const formData = new FormData(target)

            for (const [key, value] of formData.entries()) {
                localStorage.setItem(`form_${key}`, value)
            }

            this.formParent = target.parentElement
            this.savedForm = target
            
            target.reset()
            target.remove()

            const sessionExitButton = document.querySelector(this.selectors.sessionExitButton)
            
            if(sessionExitButton) {
                sessionExitButton.classList.add(this.stateClasses.isVisible)
            }

            if (this.todoParent && this.savedTodo) {
                this.todoParent.append(this.savedTodo)
                new Todo()
            }
        }
    }

    onExit(event) {
        const { target } = event
        const isLogoutButton = target.matches(this.selectors.sessionExitButton)
        const toDoList = document.querySelector(this.selectors.rootToDo)

        if(!isLogoutButton) {
            return
        }

        for (const key of Object.keys(localStorage)) {
            if(key.startsWith('form_')) {
                localStorage.removeItem(key)
            }
        }

        const sessionExitButton = document.querySelector(this.selectors.sessionExitButton)

        if(sessionExitButton) {
            sessionExitButton.classList.remove(this.stateClasses.isVisible)
        }
        
        if(this.formParent && this.savedForm) {
            this.formParent.append(this.savedForm)
        }

        if(toDoList) {
            this.todoParent = toDoList.parentElement
            this.savedTodo = toDoList
    
            toDoList.remove()
        }

    }

    checkAuth() {
        const hasAuthData = Object.keys(localStorage).some(key => key.startsWith('form_'))       
        const toDoList = document.querySelector(this.selectors.rootToDo)

        if(hasAuthData === false) {
            if(toDoList) {
                this.todoParent = toDoList.parentElement
                this.savedTodo = toDoList
                
                toDoList.remove()
            }
        }

        if(hasAuthData) {
            const formElement = document.querySelector(this.selectors.form)
            const sessionExitButton = document.querySelector(this.selectors.sessionExitButton)

            if(formElement) {
                this.formParent = formElement.parentElement
                this.savedForm = formElement

                formElement.remove()
            }

            if(sessionExitButton) {
                sessionExitButton.classList.add(this.stateClasses.isVisible)
            }

            new Todo()
        }
    }

    bindEvent() {
        document.addEventListener('blur', (event) => {
            this.onBlur(event)
        }, { capture: true })

        document.addEventListener('change', (event) => this.onChange(event))

        document.addEventListener('submit', (event) => this.onSubmit(event))

        document.addEventListener('click', (event) => this.onExit(event))
    }
}

export default FormsValidation