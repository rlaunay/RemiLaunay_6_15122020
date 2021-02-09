import updatePhotoList from "./photoList";

const nameEl = document.getElementById('p-name')
const locationEl = document.getElementById('p-location')
const taglineEl = document.getElementById('p-tagline')
const tagsEl = document.getElementById('p-tags')
const profilEl = document.getElementById('p-profil')
const contactBtnEl = document.getElementById('contact')

const priceEl = document.getElementById('p-price')

const modalEl = document.getElementById('contact-modal')
const formEl = document.querySelector('.form')

window.addEventListener('hashchange', updatePhotographeInfo)

/**
 * Gestion de la page /photographers
 */
export default async function updatePhotographeInfo(photographers) {
    if (window.location.pathname.startsWith('/photographers')) {
        const id = parseInt(window.location.hash.split('/')[1])
        const  { name, city, country, tags, tagline, portrait, price } = photographers.find(p => p.id === id)
        nameEl.innerText = name
        locationEl.innerText = `${city}, ${country}`
        taglineEl.innerText = tagline
        tagsEl.innerHTML = ''
        tags.forEach(tag => {
            const span = document.createElement('span')
            span.classList.add('main-photographe-header__tags-list--item')
            span.innerText = `#${tag}`
            tagsEl.appendChild(span)
        })
        const imgLink = await import (`./../../assets/img/photo_profils/${portrait}`)
        profilEl.src = imgLink.default

        priceEl.innerText = `${price}€ / jour`

        const formTitleEl = modalEl.querySelector('.form__title')
        const closeModalEl = modalEl.querySelector('.modal__close')

        formTitleEl.innerText = `Contactez-moi ${name}`

        formEl.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = new FormData(formEl)
            console.log([...formData])
        })

        closeModalEl.addEventListener('click', closeModal)

        contactBtnEl.addEventListener('click', openModal)

        updatePhotoList(id)
    }
}

function openModal() {
    document.addEventListener('keyup', onKeyUp)
    modalEl.setAttribute('aria-hidden', false)
    document.querySelector('main').setAttribute('aria-hidden', 'true')
    const firstInput = document.getElementById("firstname")
    modalEl.classList.add('show')
    firstInput.focus()
}

function closeModal() {
    modalEl.classList.remove('show')
    modalEl.setAttribute('aria-hidden', 'true')
    document.querySelector('main').setAttribute('aria-hidden', 'false')
    document.removeEventListener('keyup', onKeyUp)
    contactBtnEl.focus()
}

function onKeyUp(e) {
    if (e.key === "Escape") {
        closeModal()
    }
}