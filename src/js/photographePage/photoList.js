import media from "./../../data/media.json"

const grilleEl = document.getElementById('photo-list')

if (window.location.pathname.startsWith('/photographers')) {
    const selectEl = document.getElementById('filter')

    selectEl.addEventListener('change', (e) => {
        const pId = parseInt(window.location.hash.split('/')[1])
        console.log(pId)
        updatePhotoList(pId, e.target.value)
    })
}

/**
 * Mise en place de la grille de photo
 */
export default function updatePhotoList(pId, sortBy = 'popularity') {
    grilleEl.innerHTML = ""
    const photoList = media.filter(p => p.photographerId === pId)

    let sortedPhotoList = []

    switch (sortBy) {
        case "popularity":
            sortedPhotoList = photoList.sort(sortByLikes)
            break
        case "date":
            sortedPhotoList = photoList.sort(sortByDate)
            break
        case "title":
            sortedPhotoList = photoList.sort(sortByTitle)
            break
        default:
            sortedPhotoList = photoList.sort(sortByLikes)
            break
    }

    sortedPhotoList.forEach(p => {
        const mediaEl = createMedia(p)
        grilleEl.appendChild(mediaEl)
    })
}

function sortByLikes(a, b) {
    return b.likes - a.likes;
}

function sortByTitle(a, b) {
    const titleA = a.image ? a.image : a.video
    const titleB = b.image ? b.image : b.video

    if (titleA < titleB) {
        return -1
    }
    if (titleA > titleB) {
        return 1
    }
    return 0
}

function sortByDate(a, b) {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA < dateB) {
        return -1
    }
    if (dateA > dateB) {
        return 1
    }
    return 0
}

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