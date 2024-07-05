import Atomo from "./Atomo"

class Molecula {

	/**
	 * @param {String} formula - Formula in String format
	 */
	static SplitMolecule(formula) {
		const res = formula.match( /([A-Z][a-z]?(_\d)?)/g )
		return res.map(a => {
			const [el, n] = a.split('_')
			return {
				element: Atomo.SearchAtom(el),
				number: parseInt(n || '1')
			}
		})
	}

	/**
	 * @param { { element: Atomo, number: number }[] } blocks
	 */
	constructor(blocks) {
		this.blocks = blocks
		this.atoms = []
		this.ligations = []

		this.blocks.sort( (a,b) =>
			a.number < b.number ? -1 : 1 )

		// this.atoms.push( Object.assign({}, this.blocks[0].element) )

		for (let i = 0; i < this.blocks.length; i++) {
			const atomo_atual = this.blocks[i]

			for (let j = 0; j < atomo_atual.number; j++) {
				this.atoms.push( {...atomo_atual.element} )
				this.ligations.push( { a: this.atoms[0], b: this.atoms[ this.atoms.length-1 ] } )
			}
		}
	}

}

export default Molecula