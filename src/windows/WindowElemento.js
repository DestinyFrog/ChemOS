import { Capitalize } from "../configuration"
import Win from "../features/Win"
import Atomo from "../models/Atomo"
import './WindowElemento.css'
import WindowLinusPauling from "./WindowLinusPauling"

class WindowElemento extends Win {

	/**
	 * @param {import("../models/Atomo").AtomoData} atomo 
	 */
	constructor(atomo) {
		super(`${Capitalize(atomo.nome)}`)
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
		div_element.style.backgroundColor = Atomo.FiltrarCor(this.atomo)

		div_element.appendChild(div_item)
		div_element.innerHTML += `<p class="item-shells">${this.atomo.camadas.join('</br>')}</p>`

		const button_abrir_diagrama = document.createElement('button')
		button_abrir_diagrama.textContent = "Diagrama"
		button_abrir_diagrama.addEventListener('click', _ => {
			const w = new WindowLinusPauling(this.atomo)
			w.Render()
		})
		super.AddToFooter(button_abrir_diagrama)
	
		this.AddToContainer(div_element)
	}
}

export default WindowElemento