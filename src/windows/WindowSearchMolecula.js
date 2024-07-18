import { Capitalize } from "../configuration"
import Window from "../features/Window"
import Molecula from "../models/Molecula"
import WindowMolecula from "./WindowMolecula"
import "./WindowSearchMolecula.css"

class WindowSearchMolecula extends Window {
	constructor() {
		super("Procure por uma Molécula")
	}

	Render() {
		const searchDialog = document.createElement('div')
		searchDialog.id = 'dialog-search-molecula'
		searchDialog.style.padding = '10px'

		const label = document.createElement('h2')
		label.textContent = 'Procure uma Molécula'

		const input = document.createElement('input')
		input.id = 'search-input'
		input.name = 'molecula'
		input.autocomplete = false
		input.type = 'text'

		const recomendation = document.createElement('ul')
		recomendation.id = 'recomendation-list'

		input.addEventListener('input', _ => {
			const txt = input.value
			Molecula.SearchForMany(txt)
			.then( data => {
				recomendation.innerHTML = ""

				data.forEach(({nome, formula}) => {
					const line = document.createElement('li')
					line.innerText = `${formula} - ${ Capitalize(nome) }`
					line.value = nome
					line.addEventListener('click', _ => {
						recomendation.innerHTML = ""
						input.value = nome
					} )
					recomendation.appendChild(line)
					
				})
			} )
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
		searchDialog.appendChild(recomendation)

		super.AddToContainer(searchDialog)
	}

	async _RedirectMolecula(molecula_txt) {
		super.Close()

		const molecula = await Molecula.SearchFor(molecula_txt)

		const w1 = new WindowMolecula(molecula)
		w1.Render()
	}
}

export default WindowSearchMolecula