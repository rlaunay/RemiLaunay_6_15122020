import media from './../../../data/media.json'
import AppMedia from "./AppMedia";

export default class AppPhoto extends AppMedia {
    constructor() {
        super()
    }

    connectedCallback() {
        const name = this.getAttribute('data-src')
        this.buildMedia(this.id, name)
    }

    async buildMedia(id, name) {
        super.buildMedia(id, name)

        const { altText } = media.find(m => m.id === +id)

        const img = document.createElement('img')
        const imageLink = await import(`./../../../assets/img/photographe_photo/${this.getAttribute('data-pId')}/${name}`)
        img.src = imageLink.default
        img.alt = altText
        img.classList.add('media__src')

        const container = this.querySelector('.btn-open-lightbox')
        container.appendChild(img)
    }
}