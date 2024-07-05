import Window from "../features/Window"
import Molecula from "../models/Molecula"
import WindowMolecula3D from "./WindowMolecula3D"

class WindowSearchMolecula extends Window {
	constructor() {
		super("Procure por uma Molécula")
	}

	Render() {
		const searchDialog = document.createElement('div')
		searchDialog.id = 'dialog-search-atom'
		searchDialog.style.padding = '10px'

		const label = document.createElement('h2')
		label.textContent = 'Procure uma Molécula'

		const input = document.createElement('input')
		input.type = 'text'

		const submitButton = document.createElement('button')
		submitButton.textContent = 'Search'
		submitButton.addEventListener('click', async (_) => {
			if ( input.value == '' ) 
				throw new Error('Input is NULL')

			const txt = input.value

			if (txt == null)
				return

			this._RedirectMolecula(txt)
			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		super.AddToContainer(searchDialog)
	}

	_RedirectMolecula(molecula_txt) {
		super.Close()

		const molecula_data = Molecula.SplitMolecule(molecula_txt)
		const molecula = new Molecula(molecula_data)
		const w = new WindowMolecula3D(molecula)
		w.Render()
	}
}

export default WindowSearchMolecula