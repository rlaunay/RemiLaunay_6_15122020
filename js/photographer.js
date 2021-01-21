import { media, photographers } from './config/data.js'

const nameEl = document.getElementById('p-name')
const locationEl = document.getElementById('p-location')
const taglineEl = document.getElementById('p-tagline')
const tagsEl = document.getElementById('p-tags')
const profilEl = document.getElementById('p-profil')

const grilleEl = document.getElementById('photo-list')

window.addEventListener('hashchange', updatePhotographeInfo)

/**
 * Affichage des infos du photographe dont l'id se trouve dans le hash de l url
 */
function updatePhotographeInfo() {
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
	profilEl.src = `./../assets/img/photo_profils/${portrait}`

	updatePhotoList(id)
}



/**
 * Mise en place de la grille de photo
 */
function updatePhotoList(pId) {
	const photoList = media.filter(p => p.photographerId === pId)
	console.log(photoList)
}

/**
 * Dropdown custom
 */
class AppSelect extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.options = Array.from(this.querySelectorAll('app-option'))
		this.innerHTML = ''
		this.choice = document.createElement('div')
		this.choice.innerText = this.options[0].innerText
		this.choice.addEventListener('click', this.onClick.bind(this))
		this.appendChild(this.choice)
		const svg = document.createElement('img')
		svg.src = './../assets/icon/chevron-down-solid.svg'
		this.appendChild(svg)
	}

	onClick() {
		const optList = document.createElement('ul')
		optList.classList.add('filter__select--options')

		this.options.forEach((opt, i) => {
			const optItem = document.createElement('li')
			optItem.innerText = opt.innerText
			optItem.classList.add('filter__select--options-item')
			if (i === 0) {
				const svg = document.createElement('img')
				svg.src = './../assets/icon/chevron-up-solid.svg'
				optItem.appendChild(svg)
			}
			optItem.addEventListener('click', this.onChoice.bind(this))
			optList.appendChild(optItem)
		})

		this.appendChild(optList)
	}

	onChoice(event) {
		this.choice.innerText = event.target.innerText
		this.options = [
			event.target,
			...this.options.filter(
				(opt) => opt.innerText !== event.target.innerText
			),
		]
		event.target.parentElement.remove()
	}
}

customElements.define('app-select', AppSelect)
updatePhotographeInfo()
