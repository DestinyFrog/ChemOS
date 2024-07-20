import Win from "../features/Win"
import Atomo from "../models/Atomo"
import WindowAtomo from "./WindowAtomo"
import WindowElemento from "./WindowElemento"

class WindowSearchAtom extends Win {
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

			const termo = input.value
			const atomo = Atomo.ProcurarPorTermo(termo)

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
		super.Close()

		const w2 = new WindowElemento(atomo)
		w2.Render()

		const w1 = new WindowAtomo(atomo)
		w1.position = {
			x: w2.position.x + w2.size.width,
			y: w2.position.y
		}

		w1.Render()
	}
}

export default WindowSearchAtom