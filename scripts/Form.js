class FormsValidation {
    selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-errors]',
    }

    errorMessages = {
        valueMissing: () => 'Пожалуйста, заполните это поле!',
        patternMismatch: ({ title }) => title || 'Данные не соответсвуют формату!',
        tooShort: ({ minLength }) => `Слишком короткое сначение, минимальное колличество символов - ${minLength}!`,
        tooLong: ({ maxLength }) => `Слишком длинное значение, максимальное количество сиволов - ${maxLength}!`,
    }

    constructor() {
        this.bindEvent()
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
            event.preventDefault();
            firstInvalidFieldControl.focus()
        }
    }

    bindEvent() {
        document.addEventListener('blur', (event) => {
            this.onBlur(event)
        }, { capture: true })

        document.addEventListener('change', (event) => this.onChange(event))

        document.addEventListener('submit', (event) => this.onSubmit(event))
    }
}

export default FormsValidation