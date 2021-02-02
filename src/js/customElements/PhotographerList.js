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
            li.addEventListener('click', () => {
                window.location.href = `photographers/#/${photograph.id}`
            })
            this.appendChild(li)
        })

        document
            .querySelectorAll('.header__tags-list--item')
            .forEach((tagEl) => {
                tagEl.addEventListener('click', this.filterList)
            })
    }

    filterList(event) {
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