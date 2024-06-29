import WindowSearchAtom from "../windows/WindowSearchAtom"
import WindowsLinusPauling from "../windows/WindowLinusPauling"
import WindowPeriodicTable from '../windows/WindowPeriodicTable'
import "./Header.css"

class Header {
	static Render() {
		const header = document.getElementById('header')

		const img_logo = document.createElement('img')
		img_logo.id = 'logo'
		img_logo.src = './logo.svg'
		header.appendChild(img_logo)

		const button_search_atom = document.createElement('button')
		button_search_atom.textContent = 'Átomo'
		button_search_atom.addEventListener('click', _ => {
			const w = new WindowSearchAtom();
			w.Render()
		})
		header.appendChild(button_search_atom)

		const button_periodic_table = document.createElement('button')
		button_periodic_table.textContent = 'Tabela Periódica'
		button_periodic_table.addEventListener('click', _ => {
			const w = new WindowPeriodicTable()
			w.Render()
		})
		header.appendChild(button_periodic_table)

		const button_linus_pauling = document.createElement('button')
		button_linus_pauling.textContent = 'Diagrama de Linus Pauling'
		button_linus_pauling.addEventListener('click', _ => {
			const w = new WindowsLinusPauling()
			w.Render()
		})
		header.appendChild(button_linus_pauling)
	}
}

export default Header