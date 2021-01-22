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
	
	photoList.forEach(p => {
		const mediaEl = createMedia(p)
		grilleEl.appendChild(mediaEl)
	})
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

function createMedia(med) {
	let mediaEl;

	if ('video' in med) {
		mediaEl = document.createElement('app-video')
		mediaEl.setAttribute('data-src', med.video) 
	} else if ('image' in med) {
		mediaEl = document.createElement('app-photo')
		mediaEl.setAttribute('data-src', med.image)
	} else {
		throw new Error('Invalid media type')
	}

	mediaEl.id = med.id
	mediaEl.setAttribute('data-pId', med.photographerId)

	return mediaEl; 
}

class AppMedia extends HTMLElement {
	constructor() {
		super()
	}


	buildMedia(id, name) {
		const container = document.createElement('div')
		container.classList.add('media')

		const { likes, price } = media.find(p => p.id === parseInt(id))

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
		const heart = document.createElement('div')
		heart.innerHTML = '<i class="fas fa-heart"></i>'
		heart.classList.add('media__likes--logo')
		likesEl.appendChild(heart)
		legend.appendChild(likesEl)

		container.appendChild(legend)
		this.appendChild(container)
	}
}

class AppVideo extends AppMedia {
	constructor() {
		super()
	}

	connectedCallback() {
		const name = this.getAttribute('data-src')
		this.buildMedia(this.id, name)
	}

	buildMedia(id, name) {
		super.buildMedia(id, name)

		const video = document.createElement('video')
		video.src = `../assets/video/${this.getAttribute('data-pId')}/${name}`
		video.controls = true
		video.classList.add('media__src')

		
		const leg = this.querySelector('.media__legend')
		const container = this.querySelector('.media')
		container.insertBefore(video, leg)
	}
}

class AppPhoto extends AppMedia {
	constructor() {
		super()
	}

	connectedCallback() {
		const name = this.getAttribute('data-src')
		this.buildMedia(this.id, name)
	}

	buildMedia(id, name) {
		super.buildMedia(id, name)

		const img = document.createElement('img')
		img.src = `../assets/img/photographe_photo/${this.getAttribute('data-pId')}/${name}`
		img.classList.add('media__src')
		
		const leg = this.querySelector('.media__legend')
		const container = this.querySelector('.media')
		container.insertBefore(img, leg)
	}
}

customElements.define('app-media', AppMedia)
customElements.define('app-video', AppVideo)
customElements.define('app-photo', AppPhoto)