import { photographers } from './config/data.js'

class PhotographersList extends HTMLUListElement {
	constructor() {
		super()
		this.filterList = this.filterList.bind(this)
	}

	connectedCallback() {
		this.classList.add('main__photographers-list')
		photographers.forEach((photograph) => {
			const li = document.createElement('li', { is: 'photograph-item' })
			li.photograph = photograph
			li.addEventListener('click', () => {
				window.location.href = `photographers/#/${photograph.id}`
			})
			this.appendChild(li)
		})

		document
			.querySelectorAll('.header__tags-list--item')
			.forEach((tagEl) => {
				tagEl.addEventListener('click', this.filterList)
			})
	}

	filterList(event) {
		const tag = event.target.innerText.slice(1).toLowerCase()
		const selectedPhotographers = photographers.filter((photograph) =>
			photograph.tags.includes(tag)
		)
		this.updateList(selectedPhotographers.map((sel) => sel.id))
	}

	updateList(idList) {
		this.querySelectorAll('li').forEach((li) => {
			if (idList.includes(parseInt(li.id))) {
				li.classList.remove('hide')
			} else {
				li.classList.add('hide')
			}
		})
	}
}

class PhotographItem extends HTMLLIElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.classList.add('main__photographe--items', 'photographe-card')
		this.createPhotoghrapheItem(this.photograph)
	}

	createPhotoghrapheItem({
		id,
		name,
		city,
		country,
		tags,
		tagline,
		price,
		portrait,
	}) {
		this.id = id
		const img = document.createElement('img')
		img.classList.add('photographe-card__img')
		img.src = `./assets/img/photo_profils/${portrait}`
		img.height = '200'
		img.width = '200'
		this.appendChild(img)

		const h1 = document.createElement('h1')
		h1.classList.add('photographe-card__name')
		h1.innerText = name
		this.appendChild(h1)

		const h2 = document.createElement('h2')
		h2.classList.add('photographe-card__localisation')
		h2.innerText = `${city}, ${country}`
		this.appendChild(h2)

		const taglineEl = document.createElement('p')
		taglineEl.classList.add('photographe-card__tagline')
		taglineEl.innerText = tagline
		this.appendChild(taglineEl)

		const priceEl = document.createElement('span')
		priceEl.classList.add('photographe-card__price')
		priceEl.innerText = price
		this.appendChild(priceEl)

		const tagsEl = document.createElement('div')
		tagsEl.classList.add('photographe-card__tags')

		tags.forEach((tag) => {
			const span = document.createElement('span')
			span.classList.add('photographe-card__tags--item')
			span.innerText = `#${tag}`
			tagsEl.appendChild(span)
		})
		this.appendChild(tagsEl)
	}
}

customElements.define('photographers-list', PhotographersList, {
	extends: 'ul',
})
customElements.define('photograph-item', PhotographItem, { extends: 'li' })
