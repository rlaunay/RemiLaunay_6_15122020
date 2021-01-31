import photographers from "./../../data/photographers.json";
import updatePhotoList from "./photoList";

const nameEl = document.getElementById('p-name')
const locationEl = document.getElementById('p-location')
const taglineEl = document.getElementById('p-tagline')
const tagsEl = document.getElementById('p-tags')
const profilEl = document.getElementById('p-profil')

window.addEventListener('hashchange', updatePhotographeInfo)

/**
 * Affichage des infos du photographe dont l'id se trouve dans le hash de l url
 */
export default async function updatePhotographeInfo() {
    const id = parseInt(window.location.hash.split('/')[1])
    const  { name, city, country, tags, tagline, portrait } = photographers.find(p => p.id === id)
    nameEl.innerText = name
    locationEl.innerText = `${city}, ${country}`
    taglineEl.innerText = tagline
    tagsEl.innerHTML = ''
    tags.forEach(tag => {
        const span = document.createElement('span')
        span.classList.add('main-header__tags-list--item')
        span.innerText = `#${tag}`
        tagsEl.appendChild(span)
    })
    const imgLink = await import (`./../../assets/img/photo_profils/${portrait}`)
    profilEl.src = imgLink.default

    updatePhotoList(id)
}