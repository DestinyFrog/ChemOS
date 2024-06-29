import Atom from "../models/Atom"
import WindowElement from "./WindowElement"
import './WindowPeriodicTable.css'
import WindowAtom from "./WindowAtom"
import Window from '../features/Window'

class WindowPeriodicTable extends Window {
	constructor() {
		super("Tabela Periódica")
		this.div_container.style.display = 'flex'
		this._type = "normal"
	}

	/**
	 * @param {string} value
	*/
	set type(value) {
		this._type = value
		this._LoadTable()
	}

	Render() {
		this.table = document.createElement('div')
		this.table.id = "periodic-table"
		this.AddToContainer(this.table)
		this.AddToContainer( this._GenerateMenu() )
		this._LoadTable()
	}

	_LoadTable() {
		this.table.innerHTML = ''

		for(const atom of Atom.data) {
			const block = document.createElement('div')
			block.className = "periodic-table-element"
			block.style.gridRowStart = `${atom.ypos}`
			block.style.gridColumnStart = `${atom.xpos}`

			block.addEventListener('click', async _ => {
				let w = new WindowElement(atom)
				w.Render()

				w = new WindowAtom(atom)
				w.Render()
			})

			this._GenerateBlock(block, atom)
			this.table.appendChild(block)
		}
	}

	_GenerateBlock(el, atom) {
		switch(this._type) {
			case 'normal':
				el.textContent = atom.symbol
				el.style.backgroundColor = atom.color
				break

			case 'raio_atomico':
				const r = document.createElement('div')
				r.className = 'circle'
				r.style.width = `${100 * (atom.atomic_radius||0) / 350}%`
				r.style.backgroundColor = `rgb(255,${Math.floor(255 * (atom.atomic_radius||0) / 350)},0)`
				el.appendChild(r)
				break

			case 'eletronegatividade':
				el.textContent = (atom.eletronegativity || 'X').toString()
				break
		}
	}

	_GenerateMenu() {
		const menu = document.createElement('div')
		menu.id = 'periodic-table-menu'

		const menu_item_normal= document.createElement('button')
		menu_item_normal.textContent = 'Normal'
		menu_item_normal.addEventListener('click', () => {
			this.type = 'normal'
		})
		menu.appendChild( menu_item_normal )

		const menu_item_raio_atomico = document.createElement('button')
		menu_item_raio_atomico.textContent = 'Raio Atômico'
		menu_item_raio_atomico.addEventListener('click', () => {
			this.type = 'raio_atomico'
		})
		menu.appendChild( menu_item_raio_atomico )

		const menu_item_eletronegatividade= document.createElement('button')
		menu_item_eletronegatividade.textContent = 'Eletronegatividade'
		menu_item_eletronegatividade.addEventListener('click', () => {
			this.type = 'eletronegatividade'
		})
		menu.appendChild( menu_item_eletronegatividade )

		return menu
	}
}

export default WindowPeriodicTable