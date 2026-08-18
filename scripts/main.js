import Header from './Header.js'
import FormsValidation from './Form.js'
import CustomFont from './Font.js'
import Preloader from './Preloader.js'

const rootProject = document.querySelector('[data-js-root]')

new CustomFont()
new Header(rootProject)
new FormsValidation()
new Preloader(rootProject)