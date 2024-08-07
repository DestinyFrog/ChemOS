import Win from "../features/Win"
import Atomo from "../models/Atomo"
import WindowElemento from "./WindowElemento"

class WindowSearchAtom extends Win {
	constructor() {
		super("Procure por um Átomo")
		super.Centralize()
	}

	Renderizar() {
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

			const termo = input.value
			const atomo = await Atomo.ProcurarPorTermo(termo)

			if (atomo == null)
				return

			this.redirecionar_elemento(atomo)
			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		super.AddToContainer(searchDialog)
	}

	/**
	 * Redireciona para um novo elemento
	 * @param {string} atomo
	 */
	redirecionar_elemento(atomo) {
		const w = new WindowElemento(atomo)
		w.Renderizar()

		super.Close()
	}
}

export default WindowSearchAtom