import Atomo from "../models/Atomo"
import WindowElemento from "./WindowElement"
import './WindowTabelaPeriodica.css'
import WindowAtomo from "./WindowAtomo"
import Window from '../features/Window'

class WindowTabelaPeriodica extends Window {
	_container = document.createElement("div")
	_tipo = "normal"
	_tabela = document.createElement('div')
	_openMenu = false

	constructor() {
		super("Tabela Periódica")
		this.position = { x: 10, y: 10 }
	}

	/**
	 * @param {string} valor
	*/
	set tipo(valor) {
		this._tipo= valor
		this._CarregarTabela()
	}

	Render() {
		this._tabela.id = "periodic-table"
		this._container.id = "container-tabela-periodica"

		this._container.appendChild(this._tabela)
		this.AddToContainer(this._container)
		this._GerarMenu()

		this._CarregarTabela()
	}

	_LimparTabela() {
		this._tabela.innerHTML = ''
	}

	_CarregarTabela() {
		this._LimparTabela()

		for(const atomo of Atomo.data) {
			const celula = document.createElement('div')
			celula.className = "periodic-table-element"
			celula.style.gridRowStart = `${atomo.ypos}`
			celula.style.gridColumnStart = `${atomo.xpos}`
			celula.addEventListener('click', _ =>
				this._AbrirAtomoWindow(atomo) )

			this._GerarCelula(celula, atomo)
			this._tabela.appendChild(celula)
		}
	}

	_AbrirAtomoWindow(atomo) {
		const w1 = new WindowElemento(atomo)
		w1.Render()

		const w2 = new WindowAtomo(atomo)
		w2.Render()
	}

	_GerarCelula(celula, atomo) {
		switch(this._tipo) {
			case 'normal':
				celula.textContent = atomo.simbolo
				celula.style.backgroundColor = atomo.cor
				break

			case 'raio_atomico':
				const r = document.createElement('div')
				r.className = 'circle'
				r.style.width = `${100 * (atomo.raio_atomico||0) / 350}%`
				r.style.backgroundColor = `rgb(255,${Math.floor(255 * (atomo.raio_atomico||0) / 350)},0)`
				celula.appendChild(r)
				break

			case 'eletronegatividade':
				celula.textContent = (atomo.eletronegatividade || 'X').toString()
				break
		}
	}

	_GerarMenu() {
		const menu = document.createElement('div')
		menu.id = 'periodic-table-menu'
		menu.style.display = this._openMenu ? 'flex' : 'none'

		const hide_button = document.createElement('button')
		hide_button.textContent = '>'
		hide_button.addEventListener('click', _ => {
			this._openMenu = !this._openMenu
			menu.style.display = this._openMenu ? 'flex' : 'none'
			hide_button.textContent = this._openMenu ? '<' : '>'
		})
		this._container.appendChild(hide_button)

		const menu_item_normal= document.createElement('button')
		menu_item_normal.className = 'periodic-table-menu-item'
		menu_item_normal.textContent = 'Normal'
		menu_item_normal.addEventListener('click', () => this.tipo = 'normal')
		menu.appendChild( menu_item_normal )

		const menu_item_raio_atomico = document.createElement('button')
		menu_item_raio_atomico.className = 'periodic-table-menu-item'
		menu_item_raio_atomico.textContent = 'Raio Atômico'
		menu_item_raio_atomico.addEventListener('click', () => this.tipo = 'raio_atomico')
		menu.appendChild( menu_item_raio_atomico )

		const menu_item_eletronegatividade= document.createElement('button')
		menu_item_eletronegatividade.className = 'periodic-table-menu-item'
		menu_item_eletronegatividade.textContent = 'Eletronegatividade'
		menu_item_eletronegatividade.addEventListener('click', () => this.tipo = 'eletronegatividade')
		menu.appendChild( menu_item_eletronegatividade )

		this.AddToContainer(menu)
		this._container.appendChild(menu)
	}
}

export default WindowTabelaPeriodica