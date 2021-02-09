import media from './../../data/media.json'

/**
 * Items representant un photographe sur la page d accueil avec ces informations 
 */
export default class PhotographItem extends HTMLLIElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.classList.add('main__photographe--items', 'photographe-card')
        this.createPhotoghrapheItem(this.photograph)
    }

    async createPhotoghrapheItem({id, name, city, country, tags, tagline, price, miniature}) {
        const link = document.createElement('a')
        link.href = `photographers/#/${id}`
        link.setAttribute('aria-label', `liens vers la page du photographe ${name}`)
        link.classList.add('photographe-card__link')
        this.appendChild(link)

        const miniImg = media.find(m => m.id === +miniature)
        this.id = id
        const img = document.createElement('img')
        img.classList.add('photographe-card__img')
        const imgLink = await import(`./../../assets/img/photographe_photo/${id}/${miniImg.image}`)
        img.src = imgLink.default
        img.alt = miniImg.altText
        this.appendChild(img)

        const h1 = document.createElement('h1')
        h1.classList.add('photographe-card__name')
        h1.innerText = name
        this.appendChild(h1)

        const h2 = document.createElement('h2')
        h2.classList.add('photographe-card__localisation')
        h2.innerText = `${city}, ${country}`
        this.appendChild(h2)

        const taglineEl = document.createElement('p')
        taglineEl.classList.add('photographe-card__tagline')
        taglineEl.innerText = tagline
        this.appendChild(taglineEl)

        const priceEl = document.createElement('span')
        priceEl.classList.add('photographe-card__price')
        priceEl.innerText = price
        this.appendChild(priceEl)

        const tagsEl = document.createElement('div')
        tagsEl.classList.add('photographe-card__tags')

        tags.forEach((tag) => {
            const span = document.createElement('span')
            span.classList.add('photographe-card__tags--item')
            span.innerText = `#${tag}`
            tagsEl.appendChild(span)
        })
        this.appendChild(tagsEl)
    }
}