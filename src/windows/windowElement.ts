import Atom from "../functions/Atom"
import Window from "./window"
import WindowAtom from "./windowAtom"
import './windowElement.css'

class WindowElement extends Window {
	public atom:atom_schema

	constructor(atom:atom_schema) {
		super(`${atom.name}`)
		this.atom = atom
		this.div_container.style.backgroundColor = Atom.type_to_color(atom)
	}

	public render() {
		const parameters_list =`
		<div class="element-container">
		<div class="item">
			<p class="item-number">${this.atom?.number}</p>
			<p class="item-symbol">${this.atom?.symbol}</p>
			<p class="item-name">${this.atom?.name}</p>
			<p class="item-mass">${this.atom?.atomic_mass}</p>
			</div>
			<p class="item-shells">${this.atom?.shells.join('</br>')}</p>
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

				const atoms: atom_schema[] = await Atom.search_atom(atom_txt)

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