import Window from "../window"

class WindowElement extends Window {
	public atom:AtomSchema|null = null

	public render() {
		// TODO: do something if atom is null

		const parameters_list =`
		<div class="element-container">
			<p class="item item-number">${this.atom?.number}</p>
			<p class="item item-symbol">${this.atom?.symbol}</p>
			<p class="item item-name">${this.atom?.name}</p>
			<p class="item item-mass">${this.atom?.atomic_mass}</p>
		</div>
		`

		this.div_container.innerHTML = parameters_list
	}

	private async searchFor(atom_txt:string) {
		console.log(atom_txt)

		fetch('/data.json')
		.then(resp => resp.json())
		.then((data:Array<AtomSchema>) => {
			const f = data.filter(d => d.symbol == atom_txt)

			if (f.length == 0)
				throw new Error('No Atom Found With this Symbol')

			this.atom = f[0]
			this.render()
		})
		.catch(error => {
			// TODO: do something with error
			throw error
		})
	}

	static dialog_search(): HTMLDialogElement {
		const searchDialog = document.createElement('dialog')
		searchDialog.id = 'dialog-search-atom'
		searchDialog.open = true

		const label = document.createElement('h2')
		label.textContent = 'Procure um Átomo'

		const input = document.createElement('input')
		input.type = 'text'

		const submitButton = document.createElement('button')
		submitButton.textContent = 'Search'
		submitButton.addEventListener('click', _ => {
			// TODO: Return error if input is 'null'
			const atom_txt = input.value
			const window = new WindowElement()
			window.searchFor(atom_txt)
			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		return searchDialog
	}
}

export default WindowElement
