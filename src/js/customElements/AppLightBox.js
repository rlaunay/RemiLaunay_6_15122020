import closeSvg from './../../assets/icon/close.svg'
import chevronSvg from './../../assets/icon/chevron.svg'

export default class AppLightBox extends HTMLElement {
    constructor() {
        super();
        this.close = this.close.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.nextMedia = this.nextMedia.bind(this)
        this.prevMedia = this.prevMedia.bind(this)
    }

    connectedCallback() {
        const media = Array.from(document.querySelectorAll('.media__src'))
        this.gallery = media.map(m => m.getAttribute('src'))

        this.url = this.getAttribute('data-clicked-src')
        this.indexUrl = this.gallery.indexOf(this.url)
        this.buildLightbox()

        document.addEventListener('keyup', this.onKeyUp)
    }

    buildLightbox() {
        this.classList.add('lightbox')

        this.closeEl = document.createElement('img')
        this.closeEl.src = closeSvg;
        this.closeEl.classList.add('lightbox__close')
        this.closeEl.addEventListener('click', this.close)
        this.appendChild(this.closeEl)

        this.prevEl = document.createElement('img')
        this.prevEl.classList.add('lightbox__prev')
        this.prevEl.src = chevronSvg
        this.prevEl.addEventListener('click', this.prevMedia)
        this.appendChild(this.prevEl)

        this.nextEl = document.createElement('img')
        this.nextEl.classList.add('lightbox__next')
        this.nextEl.src = chevronSvg
        this.nextEl.addEventListener('click', this.nextMedia)
        this.appendChild(this.nextEl)

        this.mediaContainer = document.createElement('div')
        this.createMedia(this.url)
        this.mediaContainer.classList.add('lightbox__media')
        this.appendChild(this.mediaContainer)
    }

    createMedia(url) {
        this.url = url
        this.mediaContainer.innerHTML = ""

        if (url.endsWith('.mp4')) {
            this.mediaContainer.appendChild(document.createElement('video'))
            this.mediaContainer.firstChild.controls = true
        } else if (url.endsWith('.jpg')) {
            this.mediaContainer.appendChild(document.createElement('img'))
        } else {
            throw new Error('Invalid media type')
        }
        this.mediaContainer.firstChild.src = url
    }

    nextMedia() {
        this.indexUrl++
        if (this.indexUrl >= this.gallery.length) {
            this.indexUrl = 0
        }
        this.createMedia(this.gallery[this.indexUrl])
    }

    prevMedia() {
        this.indexUrl--
        if (this.indexUrl < 0) {
            this.indexUrl = this.gallery.length -1
        }
        this.createMedia(this.gallery[this.indexUrl])
    }

    close() {
        this.remove()
    }

    onKeyUp(e) {
        switch (e.key) {
            case "Escape":
                this.close()
                break
            case "ArrowLeft":
                this.prevMedia()
                break
            case "ArrowRight":
                this.nextMedia()
                break
            default:
                break
        }
    }

    disconnectedCallback() {
        this.closeEl.removeEventListener('click', this.close)
        document.removeEventListener('keyup', this.onKeyUp)
    }

}