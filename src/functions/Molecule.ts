import Atom from "./Atom"

export interface Ligation {
	p1:number
	p2:number
}

class Molecule {
	public central_atom: number
	public atoms: atom_schema[]
	public ligations: Ligation[]

	constructor(formula:string) {
		const splited = formula.match( /[A-Z][a-z]?_?\d?/g )

		this.atoms = Array()
		this.ligations = Array()

		splited?.forEach(d => {
			let [el, n1] = d.split('_')
			const [s] = Atom.search_atom(el)
			let n = parseInt(n1) || 1
			for (let i = 0; i < n; i++ )
				this.atoms.push(s)
		})

		let max_max_eletron = 0
		this.central_atom = 0
		this.atoms.forEach( (d,idx) => {
			let m = d.max_eletron || 8
			if (max_max_eletron < m - d.shells[ d.shells.length-1 ] ) {
				max_max_eletron = m - d.shells[ d.shells.length-1 ]
				this.central_atom = idx
			}
		})

		for (let i = 0; i < this.atoms.length; i++) {
			if ( i == this.central_atom) continue
			this.ligations.push({p1: this.central_atom, p2: i})
		}
	}

	public static split_atoms( formula:string ) {
		const splited = formula.match( /[A-Z][a-z]?_?\d?/g )

		let data = splited?.map(d => {
			const [el, n] = d.split('_')
			const [s] = Atom.search_atom(el)
			return { el: s, n: parseInt(n) || 1 }
		})

		return data
	}

}

export default Molecule