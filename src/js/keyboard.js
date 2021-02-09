
/**
 * Gere les evenemenment clavier
 *  -   Permet en cas d appui sur la touche 5 de recentrer le focus sur le logo du site
 */
export default function keyboardEvent() {
    document.addEventListener('keyup', (e) => {
        console.log(e.key)
        if (e.key === "5") {
            e.preventDefault()
            document.getElementById('logo-btn').focus()
        }
    })
}