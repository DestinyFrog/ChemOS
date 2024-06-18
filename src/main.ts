import Header from './header'
import './style.css'
import WindowsLinusPauling from './windows/windowLinusPauling'

const app = document.querySelector<HTMLDivElement>('#app')!

// Setup Header
Header.draw(app)

const w = new WindowsLinusPauling(null)
w.render()