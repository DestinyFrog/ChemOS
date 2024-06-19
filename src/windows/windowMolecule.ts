import Atom from "../functions/Atom";
import Molecule from "../functions/Molecule";
import Window from "./window";

class WindowMolecule extends Window {
	private data

	private ctx
	public WIDTH = 350
	public HEIGHT = 350
	public CENTER:{x:number, y:number}
	
	constructor( molecule_form:string ) {
		super("Molecula")

		this.data = new Molecule(molecule_form)
		console.log(this.data)

		const canvas = document.createElement('canvas')
		this.div_container.appendChild(canvas)

		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.ctx = canvas.getContext('2d')!
		this.ctx.lineWidth = 1
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
	}

	public render(): void {
		this.ctx.fillStyle = Atom.type_to_color( this.data.atoms[this.data.central_atom] )

		this.ctx.beginPath()
		this.ctx.arc(this.CENTER.x, this.CENTER.y,
			this.data.atoms[this.data.central_atom].atomic_radius!/2,
			0, Math.PI*2
		)
		this.ctx.fill()

		this.ctx.fillStyle = '#fff'
		this.ctx.fillText(this.data.atoms[this.data.central_atom].symbol, this.CENTER.x, this.CENTER.y)

		let angle = 0
		this.data.ligations.forEach(({p1, p2}) => {
			this.ctx.fillStyle = Atom.type_to_color( this.data.atoms[p2] )

			angle += Math.PI*2 / this.data.ligations.length
			const distance = this.data.atoms[p2].atomic_radius!/2 + this.data.atoms[p1].atomic_radius!/2
			const x = this.CENTER.x + Math.cos(angle) * distance
			const y = this.CENTER.y + Math.sin(angle) * distance

			this.ctx.beginPath()
			this.ctx.arc(x,y,
				this.data.atoms[p2].atomic_radius!/2,
				0, Math.PI*2
			)
			this.ctx.fill()

			this.ctx.fillStyle = '#fff'
			this.ctx.fillText(this.data.atoms[p2].symbol, x, y)
		})
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
