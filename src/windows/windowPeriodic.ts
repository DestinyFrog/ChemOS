import Atom from "../functions/Atom";
import Window from "./window";
import WindowAtom from "./windowAtom";
import WindowElement from "./windowElement";
import './windowPeriodicTable.css'

class WindowPeriodicTable extends Window {
	private table:HTMLDivElement

	constructor() {
		super("Periodic Table")
		this.table = document.createElement('div')
		this.table.id = "periodic-table"

		this.div_container.appendChild(this.table)
	}

	public async render(): Promise<void> {
		const data = await Atom.get_all()

		for(const atom of data) {
			const div = document.createElement('td')
			div.className = "periodic-table-element"
			div.textContent = atom.symbol
			div.style.gridRowStart = `${atom.ypos}`
			div.style.gridColumnStart = `${atom.xpos}`
			div.style.backgroundColor = Atom.type_to_color(atom)

			div.addEventListener('click', async _ => {
				const atoms: AtomSchema[] = await Atom.search_atom(atom.symbol)
	
				const w1 = new WindowElement(atoms[0])
				w1.render()

				const w2 = new WindowAtom(atoms[0])
				w2.render()
			})

			this.table.appendChild(div)
		}
	}

	public destroy(): void {}
}

export default WindowPeriodicTable