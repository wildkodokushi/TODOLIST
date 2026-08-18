class CustomFont {
    customFont = 'JetBrains'

    path = 'url(../fonts/JetBrainsMono-VariableFont_wght.ttf)'

    async initFont() {
        try {
            const customFont = new FontFace(this.customFont, this.path)
            const loadedFont = await customFont.load()
            
            document.fonts.add(loadedFont)
            document.body.style.fontFamily = `${this.customFont}, sans-serif`
        } catch(error) {
            console.log('Ошибка загрузки шрифта', error);
        }
    }

    constructor() {
        this.initFont()
    }
}

export default CustomFont