const nav = document.querySelector('nav')
let lastScroll = 0
let navTimeout

const hideNav = () => {
    nav.classList.add('hidden')
}

const showNav = () => {
    nav.classList.remove('hidden')
}

const startNavTimeout = () => {
    clearTimeout(navTimeout)
    navTimeout = setTimeout(hideNav), 6000
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    scrollTop > lastScroll ? hideNav : showNav
    lastScroll = scrollTop
    startNavTimeout()
})

nav.addEventListener('mouseenter', () => {
    showNav()
    clearTimeout(navTimeout)
})

nav.addEventListener('mouseleave', () => {
    startNavTimeout()
})

nav.addEventListener('load', () => {
    startNavTimeout()
})