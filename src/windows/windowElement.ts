import Atom from "../functions/Atom"
import Window from "./window"
import WindowAtom from "./windowAtom"

class WindowElement extends Window {
	public atom:AtomSchema

	constructor(atom:AtomSchema) {
		super(`Element - ${atom.name}`)
		this.atom = atom
		this.div_container.style.backgroundColor = Atom.type_to_color(atom)
		console.log(atom.category)
	}

	public render() {
		const parameters_list =`
		<div class="element-container">
			<p class="item item-number">${this.atom?.number}</p>
			<p class="item item-symbol">${this.atom?.symbol}</p>
			<p class="item item-name">${this.atom?.name}</p>
			<p class="item item-mass">${this.atom?.atomic_mass}</p>
		</div>`
		this.div_container.innerHTML = parameters_list
	}

	public destroy(): void {}

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
		submitButton.addEventListener('click', async (_) => {
			try {
				// TODO: Return error if input is 'null'
				const atom_txt = input.value

				const atoms: AtomSchema[] = await Atom.search_atom(atom_txt)

				const w1 = new WindowElement(atoms[0])
				w1.render()

				const w2 = new WindowAtom(atoms[0])
				w2.render()
			}
			catch (err) {
				// TODO: Treat error if find nothing
				throw err
			}

			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		return searchDialog
	}
}

export default WindowElement