import AppMedia from "./AppMedia";

/**
 * custom element qui herite de media et qui permet de creer une carte de media Video
 */
export default class AppVideo extends AppMedia {
    constructor() {
        super()
    }

    connectedCallback() {
        const name = this.getAttribute('data-src')
        this.buildMedia(this.id, name)
    }

    async buildMedia(id, name) {
        super.buildMedia(id, name)

        const video = document.createElement('video')
        const videoLink = await import(`./../../../assets/video/${this.getAttribute('data-pId')}/${name}`)
        video.src = videoLink.default
        video.classList.add('media__src')

        const container = this.querySelector('.btn-open-lightbox')
        container.appendChild(video)
    }
}