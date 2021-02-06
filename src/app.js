import photographers from "./data/photographers.json"

import PhotographersList from './js/customElements/PhotographerList'
import PhotographItem from './js/customElements/PhotographItem'
import Select from "./js/photographePage/Select"
import AppMedia from "./js/customElements/AppMedia/AppMedia"
import AppPhoto from "./js/customElements/AppMedia/AppPhoto"
import AppVideo from "./js/customElements/AppMedia/AppVideo"
import AppLightBox from "./js/customElements/AppLightBox"

import updatePhotographeInfo from "./js/photographePage/photographeInfo"

import './scss/main.scss'

customElements.define('photographers-list', PhotographersList, {extends: 'ul',})
customElements.define('photograph-item', PhotographItem, { extends: 'li' })

customElements.define('app-media', AppMedia)
customElements.define('app-video', AppVideo)
customElements.define('app-photo', AppPhoto)

customElements.define('app-lightbox', AppLightBox)

const selectElements = document.querySelectorAll('[data-custom-select]')
selectElements.forEach(selectElement => new Select(selectElement))

updatePhotographeInfo(photographers)