import logoSrc from './../assets/icon/logo.svg'

/**
 * insertion du miens du logo
 */
export default function logoSetup() {
    const logoEl = document.querySelector('.header__logo')
    logoEl.src = logoSrc
}