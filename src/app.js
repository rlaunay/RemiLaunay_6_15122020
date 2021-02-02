import photographers from "./data/photographers.json";

import PhotographersList from './js/customElements/PhotographerList'
import PhotographItem from './js/customElements/PhotographItem'
import AppSelect from "./js/customElements/AppSelect"
import AppMedia from "./js/customElements/AppMedia/AppMedia"
import AppPhoto from "./js/customElements/AppMedia/AppPhoto"
import AppVideo from "./js/customElements/AppMedia/AppVideo"

import updatePhotographeInfo from "./js/photographePage/photographeInfo"

import './scss/main.scss'

customElements.define('photographers-list', PhotographersList, {extends: 'ul',})
customElements.define('photograph-item', PhotographItem, { extends: 'li' })

customElements.define('app-select', AppSelect, { extends: 'select' })

customElements.define('app-media', AppMedia)
customElements.define('app-video', AppVideo)
customElements.define('app-photo', AppPhoto)

updatePhotographeInfo(photographers)