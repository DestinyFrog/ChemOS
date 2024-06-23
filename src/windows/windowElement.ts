import Atom from "../functions/Atom"
import Window from "../features/window"
import WindowAtom from "./windowAtom"
import './windowElement.css'
import Window_error from "../features/error"

class WindowElement extends Window {
	public atom:Atom

	constructor(atom:Atom) {
		super(`${atom.name}`)
		this.atom = atom
	}

	public render() {
		const div_item = document.createElement('div')
		div_item.className = "item"
		div_item.innerHTML = `
			<p class="item-number">${this.atom.number}</p>
			<p class="item-symbol">${this.atom.symbol}</p>
			<p class="item-name">${this.atom.name}</p>
			<p class="item-mass">${this.atom.atomic_mass}</p>`

		const div_element = document.createElement('div')
		div_element.className = "element-container"
		div_element.style.backgroundColor = this.atom.color

		div_element.appendChild(div_item)
		div_element.innerHTML += `<p class="item-shells">${this.atom.shells.join('</br>')}</p>`

		this.add_to_container(div_element)
	}

	public destroy(): void {}

	public static start_element_with_info(atom:Atom) {
		const w2 = new WindowAtom(atom)
		w2.render()

		const w1 = new WindowElement(atom)
		w1.render()

		const pos = w2.get_position()
		pos.x += w2.get_size().width - w1.get_size().width
		w1.set_position(pos)
	}

	public static dialog_search(): HTMLDialogElement {
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
				if ( input.value == '' ) 
					throw new Error('Input is NULL')

				const atom_txt = input.value
				const d = await Atom.search_atom(atom_txt)
				WindowElement.start_element_with_info(d)
			}
			catch (err) {
				const w = new Window_error(<Error> err)
				w.render()
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