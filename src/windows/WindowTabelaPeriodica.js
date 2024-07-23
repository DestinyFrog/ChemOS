import Atomo from "../models/Atomo"
import WindowElemento from "./WindowElemento"
import './WindowTabelaPeriodica.css'
import WindowAtomo from "./WindowAtomo"
import Window from '../features/Win'

// Maior raio atomico
const RAIO_ATOMICO_CESIO = 298

class WindowTabelaPeriodica extends Window {
	container = document.createElement("div")
	tipo = "normal"
	tabela = document.createElement('div')
	openMenu = false

	constructor() {
		super("Tabela Periódica")
		super.position = { x: 20, y: 10 }
	}

	Render() {
		this.tabela.id = "periodic-table"
		this.container.id = "container-tabela-periodica"

		this.container.appendChild(this.tabela)
		this.AddToContainer(this.container)
		this.GerarMenu()

		this.CarregarTabela()
	}

	LimparTabela() {
		this.tabela.innerHTML = ''
	}

	/**
	 * @param {string} valor
	*/
	MudarTipo(valor) {
		this.tipo= valor
		this.CarregarTabela()
	}

	CarregarTabela() {
		this.LimparTabela()

		for(const atomo of Atomo.data) {
			const celula = document.createElement('div')
			celula.className = "periodic-table-element"
			celula.style.gridRowStart = `${atomo.ypos}`
			celula.style.gridColumnStart = `${atomo.xpos}`
			celula.addEventListener('click', _ =>
				this.AbrirAtomoWindow(atomo)
			)

			this.GerarCelula(celula, atomo)
			this.tabela.appendChild(celula)
		}
	}

	AbrirAtomoWindow(atomo) {
		const w = new WindowElemento(atomo)
		w.Render()
	}

	GerarCelula(celula, atomo) {
		switch(this.tipo) {
			case 'normal':
				celula.textContent = atomo.simbolo
				celula.style.backgroundColor = Atomo.FiltrarCor(atomo)
				break

			case 'raio_atomico':
				const r = document.createElement('div')
				r.className = 'circle'
				r.style.width = `${100 * (atomo.raio_atomico||0) / RAIO_ATOMICO_CESIO}%`
				r.style.backgroundColor = `rgb(255,${Math.floor(255 * (atomo.raio_atomico||0) / RAIO_ATOMICO_CESIO)},0)`
				celula.appendChild(r)
				break

			case 'eletronegatividade':
				celula.textContent = (atomo.eletronegatividade || 'X').toString()
				break
		}
	}

	GerarMenu() {
		this.menu = document.createElement('div')
		this.menu.id = 'menu-tabela-periodica'
		this.menu.style.display = this.openMenu ? 'flex' : 'none'

		this.menu_item_normal = document.createElement('button')
		this.menu_item_normal.className = 'periodic-table-menu-item'
		this.menu_item_normal.textContent = 'Normal'
		this.menu_item_normal.addEventListener('click', () => this.MudarTipo('normal'))
		this.menu.appendChild( this.menu_item_normal )

		this.menu_item_raio_atomico = document.createElement('button')
		this.menu_item_raio_atomico.className = 'periodic-table-menu-item'
		this.menu_item_raio_atomico.textContent = 'Raio Atômico'
		this.menu_item_raio_atomico.addEventListener('click', () => this.MudarTipo('raio_atomico'))
		this.menu.appendChild( this.menu_item_raio_atomico )

		this.menu_item_eletronegatividade = document.createElement('button')
		this.menu_item_eletronegatividade.className = 'periodic-table-menu-item'
		this.menu_item_eletronegatividade.textContent = 'Eletronegatividade'
		this.menu_item_eletronegatividade.addEventListener('click', () => this.MudarTipo('eletronegatividade') )
		this.menu.appendChild( this.menu_item_eletronegatividade )

		const hide_button = document.createElement('button')
		hide_button.id = 'hide-button'
		hide_button.textContent = '>'
		hide_button.addEventListener('click', _ => {
			this.openMenu = !this.openMenu
			this.menu.style.display = this.openMenu ? 'flex' : 'none'
			hide_button.textContent = this.openMenu ? '<' : '>'
		})

		this.container.appendChild(hide_button)
		this.container.appendChild(this.menu)
	}
}

export default WindowTabelaPeriodica