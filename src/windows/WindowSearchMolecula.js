import Window from "../features/Window"
import Molecula from "../models/Molecula"
import WindowMoleculaInfo from "./WindowMoleculaInfo"
import WindowMolecula from "./WindowMolecula"

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

		const input = document.createElement('select')
		Molecula.GetAll()
		.then(data => {
			data.forEach(({nome, formula}) => {
				const option = document.createElement('option')
				option.innerText = `[${formula}] ${nome}`
				option.value = nome
				input.appendChild(option)
			})
		})

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

	async _RedirectMolecula(molecula_txt) {
		super.Close()

		const molecula = await Molecula.SearchFor(molecula_txt)

		// const w = new WindowMoleculaInfo(molecula)
		// w.Render()

		const w1 = new WindowMolecula(molecula)
		w1.Render()
	}
}

export default WindowSearchMolecula