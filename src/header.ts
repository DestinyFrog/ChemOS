import WindowElement from "./windows/windowElement"
import WindowPeriodicTable from './windows/windowPeriodic'

class Header {
	public static draw(app:HTMLDivElement) {
		const header = document.getElementById('header')!

		const button_search_atom = document.createElement('button')
		button_search_atom.textContent = 'Átomo'
		button_search_atom.addEventListener('click', _ => {
			const search_draw_atom = WindowElement.dialog_search()
			app.appendChild(search_draw_atom)
		})
		header.appendChild(button_search_atom)

		const button_periodic_table = document.createElement('button')
		button_periodic_table.textContent = 'Tabela Periódica'
		button_periodic_table.addEventListener('click', _ => {
			const search_draw_atom = new WindowPeriodicTable()
			search_draw_atom.render()
		})
		header.appendChild(button_periodic_table)
	}
}

export default Header