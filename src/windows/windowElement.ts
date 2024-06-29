import Atom from "../models/Atom"
import Window from "../features/window"
import './windowElement.css'

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
}

export default WindowElement