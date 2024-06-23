import Molecule from "../functions/Molecule"
import Window from "../features/window"
import { CIRCUFERENCE } from "../configuration"

class WindowMolecule extends Window {
	private molecule_form:string
	private ctx
	public WIDTH = 450
	public HEIGHT = 450
	public CENTER:{x:number, y:number} = {x:0, y:0}
	private data!: Molecule;
	private canvas:HTMLCanvasElement

	private drawn: {x:number, y:number}[] = []

	constructor(molecule_form:string) {
		super("Molecula")
		this.molecule_form = molecule_form

		this.canvas = document.createElement('canvas')
		this.add_to_container(this.canvas)

		this.ctx = this.canvas.getContext('2d')!
		this.ctx.lineWidth = 1
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
	}

	public async render(): Promise<void> {
		try {
			const resp = await Molecule.split_molecule(this.molecule_form)
			this.data = new Molecule(resp)
		} catch(err) { throw err }

		// const size = this.data.atoms.reduce((acc, cur) =>
			// acc += cur.atomic_radius!*2, 0)

		this.WIDTH = 500
		this.HEIGHT = 500
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }
		this.canvas.width = this.WIDTH
		this.canvas.height = this.HEIGHT

		console.table(this.data.ligations)
		this.draw()
	}

	public draw(): void {
		const proportion = 0.5

		// Draw Central Atom
		this.ctx.beginPath()
		this.ctx.fillStyle = this.data.atoms[0].color
		this.ctx.arc(this.CENTER.x, this.CENTER.y,this.data.atoms[0].atomic_radius!*proportion,0, CIRCUFERENCE)
		this.ctx.fill()
		this.ctx.fillStyle = '#fff'
		this.ctx.fillText(this.data.atoms[0].symbol, this.CENTER.x, this.CENTER.y)

		let ord = 0
		let count = 0
		let angle = 0
		let focus_x = this.CENTER.x
		let focus_y = this.CENTER.y

		for (let i = 0; i < this.data.ligations.length; i++) {
			this.ctx.fillStyle = this.data.ligations[i].p2.color

			angle += 0.4
			const distance = this.data.ligations[i].p2.atomic_radius!*proportion + this.data.ligations[i].p1.atomic_radius!*proportion

			let x = focus_x + Math.cos(angle) * distance
			let y = focus_y + Math.sin(angle) * distance
			this.drawn.push( {x,y} )

			count++
			if ( count >= this.data.ligations[i].p1.get_ligations() ) {
				count = 0
				ord++
				focus_x = this.drawn[ord].x
				focus_y = this.drawn[ord].y
			}

			this.ctx.beginPath()
			this.ctx.arc(x,y,this.data.ligations[i].p2.atomic_radius!*proportion,0, CIRCUFERENCE)
			this.ctx.fill()
			this.ctx.fillStyle = '#fff'
			this.ctx.fillText(this.data.ligations[i].p2.symbol, x, y)
		}

	}

	static dialog_search(): HTMLDialogElement {
		const searchDialog = document.createElement('dialog')
		searchDialog.id = 'dialog-search-atom'
		searchDialog.open = true

		const label = document.createElement('h2')
		label.textContent = 'Digite uma Molécula'

		const input = document.createElement('input')
		input.type = 'text'

		const submitButton = document.createElement('button')
		submitButton.textContent = 'Search'
		submitButton.addEventListener('click', async (_) => {
			try {
				// TODO: Return error if input is 'null'
				const txt = input.value

				const w1 = new WindowMolecule(txt)
				w1.render()
			}
			catch (err) {
				// TODO: Treat error if find nothing
				throw err
			}

			searchDialog.remove()
		})

		searchDialog.appendChild(label)
		searchDialog.appendChild(input)
		searchDialog.appendChild(submitButton)

		return searchDialog
	}

	public destroy(): void {}
}

export default WindowMolecule
