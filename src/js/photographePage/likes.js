
const totalLikesEl = document.getElementById('p-totalLikes')

export default function updateLikes() {

    const mediaList = Array.from(document.querySelectorAll('app-photo, app-video'))

    mediaList.forEach(m => {
        const likesEl = m.querySelector('.media__likes')

        likesEl.addEventListener('click', () => {
            let likes = localStorage.getItem(+m.id)
            likes++
            localStorage.setItem(+m.id, likes)
            const ico = likesEl.childNodes[1]
            likesEl.innerText = likes
            likesEl.appendChild(ico)

            updateTotalLikes(mediaList)
        })
    })

    updateTotalLikes(mediaList)
}

function updateTotalLikes(mediaListEl) {
    const idList = mediaListEl.map(m => m.id)
    
    const totalLikes = idList.reduce((prev, next) => {
        return prev + parseInt(localStorage.getItem(+next))
    }, 0)

    totalLikesEl.innerText = totalLikes
}