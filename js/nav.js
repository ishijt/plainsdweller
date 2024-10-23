const nav = document.querySelector('nav')

const startFloating = () => {
    nav.classList.add('floating')
}

window.addEventListener('load', () => {
    startFloating()
})