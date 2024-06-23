import Atom from "./Atom"

export class Ligation {
	public eletronegativity: number

	constructor (
		public p1:Atom,
		public p2:Atom,
	) {
		// TODO: Treat eletronegativity possibly 'null'
		this.eletronegativity = p1.eletronegativity! - p2.eletronegativity!
	}
}

class Molecule {
	// public type: ligation_type
	public ligations: Ligation[] = Array()

	public static async split_molecule(formula:string): Promise<Atom[]> {
		const atoms: Atom[] = Array()
		const splited = formula.match( /[A-Z][a-z]?_?\d?/g )

		if (splited == null)
			throw new Error('Molecula Invalida')

		for (const d of splited) {
			let [el, n1] = d.split('_')
			var s = await Atom.search_atom(el)
			let n = parseInt(n1) || 1

			for (let i = 0; i < n; i++ )
				atoms.push( s )
		}

		return atoms
	}

	constructor(
		public atoms: Atom[])
	{
		this.atoms.sort( (a,b) =>
			(a.get_ligations() > b.get_ligations()) ? -1 : 1 )

		let m = 0
		for (let i = 1; i < this.atoms.length; i++) {
			if (atoms[m].shells[atoms[m].shells.length-1] < i) {
				m++
			}

			const l = new Ligation( atoms[m], atoms[i] )
			this.ligations.push(l)
		}
	}

}

export default Molecule