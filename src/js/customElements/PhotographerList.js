import photographers from "../../data/photographers.json";

export default class PhotographersList extends HTMLUListElement {
    constructor() {
        super()
        this.filterList = this.filterList.bind(this)
    }

    connectedCallback() {
        this.classList.add('main__photographers-list')
        photographers.forEach((photograph) => {
            const li = document.createElement('li', { is: 'photograph-item' })
            li.photograph = photograph
            this.appendChild(li)
        })

        document
            .querySelectorAll('.header__tags-list--item')
            .forEach((tagEl) => {
                tagEl.parentElement.addEventListener('click', this.filterList)
            })
    }

    filterList(event) {

        document
            .querySelectorAll('.header__tags-list--item')
            .forEach((tagEl) => {
                tagEl.parentElement.removeAttribute('aria-current')
            })

        event.target.setAttribute('aria-current', 'catégorie')
        const tag = event.target.innerText.slice(1).toLowerCase()
        const selectedPhotographers = photographers.filter((photograph) =>
            photograph.tags.includes(tag)
        )
        this.updateList(selectedPhotographers.map((sel) => sel.id))
    }

    updateList(idList) {
        this.querySelectorAll('li').forEach((li) => {
            if (idList.includes(parseInt(li.id))) {
                li.classList.remove('hide')
            } else {
                li.classList.add('hide')
            }
        })
    }
}