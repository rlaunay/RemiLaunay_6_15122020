import AppMedia from "./AppMedia";

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
        video.addEventListener('click', (e) => {
            const lightBox = document.createElement('app-lightbox')
            lightBox.setAttribute('data-clicked-src', e.target.src)
            document.getElementById('photo-list').appendChild(lightBox)
        })

        const leg = this.querySelector('.media__legend')
        const container = this.querySelector('.media')
        container.insertBefore(video, leg)
    }
}