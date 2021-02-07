

export default function keyboardEvent() {
    document.addEventListener('keyup', (e) => {
        console.log(e.key)
        if (e.key === "5") {
            e.preventDefault()
            document.getElementById('logo-btn').focus()
        }
    })
}