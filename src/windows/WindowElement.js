import Window from "../features/Window"
import './WindowElement.css'

class WindowElement extends Window {
	constructor(atomo) {
		super(`${atomo.nome}`)
		this.atomo = atomo
	}

	Render() {
		const div_item = document.createElement('div')
		div_item.className = "item"
		div_item.innerHTML = `
			<p class="item-number">${this.atomo.numero_atomico}</p>
			<p class="item-symbol">${this.atomo.simbolo}</p>
			<p class="item-name">${this.atomo.nome}</p>
			<p class="item-mass">${this.atomo.massa_atomica}</p>`

		const div_element = document.createElement('div')
		div_element.className = "element-container"
		div_element.style.backgroundColor = this.atomo.cor

		div_element.appendChild(div_item)
		div_element.innerHTML += `<p class="item-shells">${this.atomo.camadas.join('</br>')}</p>`

		this.AddToContainer(div_element)
	}
}

export default WindowElement