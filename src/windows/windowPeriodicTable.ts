import Atom from "../functions/Atom";
import Window from "../features/window";
import WindowElement from "./windowElement";
import './windowPeriodicTable.css'

class Window_periodic_table extends Window {
	constructor() {
		super("Tabela Periódica")
	}

	public async render(): Promise<void> {
		const data = await Atom.get_all()

		const table = document.createElement('div')
		table.id = "periodic-table"

		for(const atom of data) {
			const div = document.createElement('td')
			div.className = "periodic-table-element"
			div.textContent = atom.symbol
			div.style.gridRowStart = `${atom.ypos}`
			div.style.gridColumnStart = `${atom.xpos}`
			div.style.backgroundColor = atom.color

			div.addEventListener('click', async _ => {
				const d = await Atom.search_atom(atom.symbol)
				WindowElement.start_element_with_info(d)
			})

			table.appendChild(div)
			this.add_to_container(table)
		}
	}

	public destroy(): void {}
}

export default Window_periodic_table