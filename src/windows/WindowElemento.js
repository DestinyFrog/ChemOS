import { Capitalize } from "../configuration"
import Win from "../features/Win"
import Atomo from "../models/Atomo"
import WindowAtomo from "./WindowAtomo"
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
		const { numero_atomico, simbolo, nome, massa_atomica, camadas } = this.atomo

		const div_item = document.createElement('div')
		div_item.className = "item"
		div_item.innerHTML = `
			<p class="item-number">${numero_atomico}</p>
			<p class="item-symbol">${simbolo}</p>
			<p class="item-name">${Capitalize(nome)}</p>
			<p class="item-mass">${massa_atomica}</p>`

		const div_elemento = document.createElement('div')
		div_elemento.className = "element-container"
		div_elemento.style.backgroundColor = Atomo.FiltrarCor(this.atomo)
		div_elemento.appendChild(div_item)
		div_elemento.innerHTML += `<p class="item-shells">${camadas.join('</br>')}</p>`

		const button_abrir_diagrama = document.createElement('button')
		button_abrir_diagrama.textContent = "Diagrama"
		button_abrir_diagrama.addEventListener('click', _ => this._AbrirJanela() )

		const button_visualizar = document.createElement('button')
		button_visualizar.textContent = "Visualizar"
		button_visualizar.addEventListener('click', _ => this._AbrirVisualizaçao() )

		super.AddToFooter(button_abrir_diagrama)
		super.AddToFooter(button_visualizar)
		super.AddToContainer(div_elemento)
	}

	_AbrirJanela() {
		const w = new WindowLinusPauling(this.atomo)
		w.Render()
	}

	_AbrirVisualizaçao() {
		const w = new WindowAtomo(this.atomo)
		w.Render()
	}
}

export default WindowElemento