import Window_dialog_search_atom from "../windows/windowDialogSearchAtom"
import WindowsLinusPauling from "../windows/windowLinusPauling"
import WindowPeriodicTable from '../windows/windowPeriodicTable'
import "./header.css"

class Header {
	public static render() {
		const header = document.getElementById('header')!

		const img_logo = document.createElement('img')
		img_logo.id = 'logo'
		img_logo.src = './logo.svg'
		header.appendChild(img_logo)

		const button_search_atom = document.createElement('button')
		button_search_atom.textContent = 'Átomo'
		button_search_atom.addEventListener('click', _ => {
			const window = new Window_dialog_search_atom();
			window.render()
		})
		header.appendChild(button_search_atom)

		/*
		const button_search_molecule = document.createElement('button')
		button_search_molecule.textContent = 'Molécula'
		button_search_molecule.addEventListener('click', _ => {
			const search_draw_molecule = WindowMolecule.dialog_search()
			app.appendChild(search_draw_molecule)
		})
		header.appendChild(button_search_molecule)
		*/

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