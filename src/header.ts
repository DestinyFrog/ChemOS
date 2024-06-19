import WindowElement from "./windows/windowElement"
import WindowsLinusPauling from "./windows/windowLinusPauling"
import WindowMolecule from "./windows/windowMolecule"
import WindowPeriodicTable from './windows/windowPeriodicTable'

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

		const button_search_molecule = document.createElement('button')
		button_search_molecule.textContent = 'Molécula'
		button_search_molecule.addEventListener('click', _ => {
			const search_draw_molecule = WindowMolecule.dialog_search()
			app.appendChild(search_draw_molecule)
		})
		header.appendChild(button_search_molecule)

		const button_periodic_table = document.createElement('button')
		button_periodic_table.textContent = 'Tabela Periódica'
		button_periodic_table.addEventListener('click', _ => {
			const search_draw_atom = new WindowPeriodicTable()
			search_draw_atom.render()
		})
		header.appendChild(button_periodic_table)

		const button_linus_pauling = document.createElement('button')
		button_linus_pauling.textContent = 'Diagrama de Linus Pauling'
		button_linus_pauling.addEventListener('click', _ => {
			const w = new WindowsLinusPauling()
			w.render()
		})
		header.appendChild(button_linus_pauling)
	}
}

export default Header