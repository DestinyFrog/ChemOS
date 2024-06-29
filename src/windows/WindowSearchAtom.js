import Window from "../features/Window"
import Atom from "../models/Atom"
import Window_atom from "./WindowAtom"
import WindowElement from "./WindowElement"

class WindowSearchAtom extends Window {
	constructor() {
		super("Procure por um Átomo")
	}

	Render() {
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
			const d = Atom.SearchAtom(atom_txt)

			if (d == null)
				return

			this._RedirectElement(d)
			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		super.AddToContainer(searchDialog)
	}

	_RedirectElement(atom) {
		super.Close()

		const w2 = new WindowElement(atom)
		w2.Render()

		const w1 = new Window_atom(atom)
		w1.position = {
			x: w2.position.x + w2.size.width,
			y: w2.position.y
		}

		w1.Render()
	}
}

export default WindowSearchAtom