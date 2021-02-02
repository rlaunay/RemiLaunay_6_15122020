export default class Select {
    constructor(selectElement) {
        this.selectElement = selectElement
        this.options = this.getFormattedOptions(this.selectElement.options)
        this.customSelect = document.createElement('div')
        this.selectedEl = document.createElement('span')
        this.optionsEl = document.createElement('ul')

        this.setup()
        this.selectElement.style.display = 'none'
        this.selectElement.after(this.customSelect)
    }

    get selectedOption() {
        return this.options.find(opt => opt.selected)
    }

    getFormattedOptions(options) {
        return [...options].map(opt => ({
            value: opt.value,
            label: opt.innerText,
            selected: opt.selected,
            element: opt
        }))
    }

    selectValue(value) {
        const newSelectedValue = this.options.find(opt => opt.value === value)
        const prevSelectedValue = this.selectedOption
        prevSelectedValue.selected = false
        prevSelectedValue.element.selected = false

        newSelectedValue.selected = true
        newSelectedValue.element.selected = true

        this.selectedEl.innerText = newSelectedValue.label

        this.optionsEl
            .querySelector(`[data-value="${prevSelectedValue.value}"]`)
            .classList.remove('selected')
        this.optionsEl
            .querySelector(`[data-value="${newSelectedValue.value}"]`)
            .classList.add('selected')

        this.selectElement.dispatchEvent(new Event('change'));
    }

    setup() {
        this.customSelect.classList.add('filter__select')
        this.customSelect.tabIndex = 0

        this.selectedEl.classList.add('filter__select--value')
        this.selectedEl.innerText = this.selectedOption.label
        this.customSelect.append(this.selectedEl)

        this.optionsEl.classList.add('filter__select--options')
        this.options.forEach(opt => {
            const optEl = document.createElement('li')
            optEl.classList.add('filter__select--options-item')
            optEl.classList.toggle('selected', opt.selected)
            optEl.innerText = opt.label
            optEl.dataset.value = opt.value
            optEl.addEventListener('click', () => {
                this.selectValue(opt.value)
                this.selectedEl.classList.remove('chevron-up')
                this.optionsEl.classList.remove('show')
            })
            this.optionsEl.append(optEl)
        })
        this.customSelect.append(this.optionsEl)

        this.selectedEl.addEventListener('click', () => {
            this.selectedEl.classList.toggle('chevron-up')
            this.optionsEl.classList.toggle('show')
        })

        this.customSelect.addEventListener('blur', () => {
            this.optionsEl.classList.remove('show')
        })
    }
}