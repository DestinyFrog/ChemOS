import Window from "../features/window";
import Atom from "../models/Atom";
import Window_atom from "./windowAtom";
import WindowElement from "./windowElement";

class Window_dialog_search_atom extends Window {
	constructor() { super("Procure por um Átomo") }

	public redirect_element(atom:Atom) {
		this.close()

		const w2 = new WindowElement(atom)
		w2.render()

		const w1 = new Window_atom(atom)
		const pos = w1.get_position()
		pos.x = w2.get_position().x + w2.get_size().width
		pos.y = w2.get_position().y
		w1.set_position(pos)

		w1.render()
	}

	public render(): void {
		const searchDialog = document.createElement('div')
		searchDialog.id = 'dialog-search-atom'
		searchDialog.style.padding = '10px'

		const label = document.createElement('h2')
		label.textContent = 'Procure um Átomo'

		const input = document.createElement('input')
		input.type = 'text'

		const submitButton = document.createElement('button')
		submitButton.textContent = 'Search'
		submitButton.addEventListener('click', async (_) => {
			if ( input.value == '' ) 
				throw new Error('Input is NULL')

			const atom_txt = input.value
			const d = Atom.search_atom(atom_txt)

			if (d == null)
				return

			this.redirect_element(d!)
			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		this.add_to_container(searchDialog)
	}

	public destroy(): void {}
}

export default Window_dialog_search_atom