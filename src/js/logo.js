import logoSrc from './../assets/icon/logo.svg'

export default function logoSetup() {
    const logoEl = document.querySelector('.header__logo')
    logoEl.src = logoSrc
}