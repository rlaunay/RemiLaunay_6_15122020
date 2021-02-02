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

        const img = document.createElement('img')
        const imageLink = await import(`./../../../assets/img/photographe_photo/${this.getAttribute('data-pId')}/${name}`)
        img.src = imageLink.default
        img.classList.add('media__src')

        const leg = this.querySelector('.media__legend')
        const container = this.querySelector('.media')
        container.insertBefore(img, leg)
    }
}