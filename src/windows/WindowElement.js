import Window from "../features/Window"
import './WindowElement.css'

class WindowElement extends Window {
	constructor(atom) {
		super(`${atom.name}`)
		this.atom = atom
	}

	Render() {
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

		this.AddToContainer(div_element)
	}
}

export default WindowElement