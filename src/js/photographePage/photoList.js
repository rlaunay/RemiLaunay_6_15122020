import media from "./../../data/media.json"

const grilleEl = document.getElementById('photo-list')


/**
 * Mise en place de la grille de photo
 */
export default function updatePhotoList(pId) {
    const photoList = media.filter(p => p.photographerId === pId)

    photoList.forEach(p => {
        const mediaEl = createMedia(p)
        grilleEl.appendChild(mediaEl)
    })
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