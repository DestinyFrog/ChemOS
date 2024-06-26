import Atom from "../models/Atom";
import Window from "../features/window";
import WindowElement from "./windowElement";
import './windowPeriodicTable.css'

class Window_periodic_table extends Window {
	private type: string = 'normal'
	private data: Atom[] | undefined
	private table: HTMLDivElement

	constructor() {
		super("Tabela Periódica")
		this.div_container.style.display = 'flex'

		this.table = document.createElement('div')
	}

	public async render(): Promise<void> {
		this.data = await Atom.get_all()

		this.table.id = "periodic-table"
		this.add_to_container(this.table)
		this.load_table()

		this.add_to_container( this.generate_menu() )
	}

	private load_table() {
		this.table.innerHTML = ''

		for(const atom of this.data!) {
			const block = document.createElement('div')
			block.className = "periodic-table-element"
			block.style.gridRowStart = `${atom.ypos}`
			block.style.gridColumnStart = `${atom.xpos}`

			block.addEventListener('click', async _ => {
				const d = await Atom.search_atom(atom.symbol)
				WindowElement.start_element_with_info(d)
			})
			this.generate_block(block, atom)
			this.table.appendChild(block)
		}
	}

	private generate_block(el:HTMLDivElement, atom:Atom) {
		switch(this.type) {
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

	private generate_menu() {
		const menu = document.createElement('div')
		menu.id = 'periodic-table-menu'

		const menu_item_normal= document.createElement('button')
		menu_item_normal.textContent = 'Normal'
		menu_item_normal.addEventListener('click', () => this.set_type('normal'))
		menu.appendChild( menu_item_normal )

		const menu_item_raio_atomico = document.createElement('button')
		menu_item_raio_atomico.textContent = 'Raio Atômico'
		menu_item_raio_atomico.addEventListener('click', () => this.set_type('raio_atomico'))
		menu.appendChild( menu_item_raio_atomico )

		const menu_item_eletronegatividade= document.createElement('button')
		menu_item_eletronegatividade.textContent = 'Eletronegatividade'
		menu_item_eletronegatividade.addEventListener('click', () => this.set_type('eletronegatividade'))
		menu.appendChild( menu_item_eletronegatividade )

		return menu
	}

	private set_type(value:string) {
		this.type = value
		this.load_table()
	}

	public destroy(): void {}
}

export default Window_periodic_table