/**
 * Dropdown custom
 */
export default class AppSelect extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.options = Array.from(this.querySelectorAll('app-option'))
        this.innerHTML = ''
        this.choice = document.createElement('div')
        this.choice.innerText = this.options[0].innerText
        this.choice.addEventListener('click', this.onClick.bind(this))
        this.appendChild(this.choice)
        const svg = document.createElement('img')
        svg.src = './../assets/icon/chevron-down-solid.svg'
        this.appendChild(svg)
    }

    onClick() {
        const optList = document.createElement('ul')
        optList.classList.add('filter__select--options')

        this.options.forEach((opt, i) => {
            const optItem = document.createElement('li')
            optItem.innerText = opt.innerText
            optItem.classList.add('filter__select--options-item')
            if (i === 0) {
                const svg = document.createElement('img')
                svg.src = './../assets/icon/chevron-up-solid.svg'
                optItem.appendChild(svg)
            }
            optItem.addEventListener('click', this.onChoice.bind(this))
            optList.appendChild(optItem)
        })

        this.appendChild(optList)
    }

    onChoice(event) {
        this.choice.innerText = event.target.innerText
        this.options = [
            event.target,
            ...this.options.filter(
                (opt) => opt.innerText !== event.target.innerText
            ),
        ]
        event.target.parentElement.remove()
    }
}