import media from "../../../data/media.json";

export default class AppMedia extends HTMLElement {
    buildMedia(id, name) {
        const container = document.createElement('div')
        container.classList.add('media')

        const btn = document.createElement('button')
        btn.setAttribute('aria-roledescription', 'ouvre la modal de contact du photographe')
        btn.classList.add('btn-open-lightbox')

        btn.addEventListener('click', (e) => {
            const lightBox = document.createElement('app-lightbox')
            document.querySelector('header').setAttribute('aria-hidden', 'true')
            document.querySelector('main').setAttribute('aria-hidden', 'true')
            const img = this.querySelector('.media__src')
            lightBox.setAttribute('data-clicked-src', img.getAttribute('src'))
            document.querySelector('body').appendChild(lightBox)
        })

        container.appendChild(btn) 

        const { likes, price } = media.find(p => p.id === +id)

        const legend = document.createElement('div')
        legend.classList.add('media__legend')

        const h3 = document.createElement('h3')
        h3.classList.add('media__subtitle')
        h3.innerText = name.split('.')[0].split('_').join(' ')
        legend.appendChild(h3)

        const priceEl = document.createElement('span')
        priceEl.innerText = `${price}€`
        priceEl.classList.add('media__price')
        legend.appendChild(priceEl)

        const likesEl = document.createElement('span')
        likesEl.innerText = `${likes}`
        likesEl.classList.add('media__likes')
        likesEl.addEventListener('click', () => {
            const likesEl = document.getElementById(id).querySelector('.media__likes')
            let likes = +likesEl.innerText
            likes++
            const ico = likesEl.childNodes[1]
            likesEl.innerText = likes
            likesEl.appendChild(ico)
        })

        const heart = document.createElement('div')
        heart.innerHTML = '<i class="fas fa-heart"></i>'
        heart.classList.add('media__likes--logo')
        likesEl.appendChild(heart)
        legend.appendChild(likesEl)

        container.appendChild(legend)
        this.appendChild(container)
    }
}