
class Atom {
	public static async get_all(): Promise<AtomSchema[]> {
		try {
			const response = await fetch('/data.json')
			const data:AtomSchema[] = await response.json()
			return data
		}
		catch (error) {
			throw error
		}
	}

	public static async search_atom(term:string): Promise<AtomSchema[]> {
		try {
			const response = await fetch('/data.json')
			const data:AtomSchema[] = await response.json()
			const f = data.filter(d => d.symbol == term)

			if (f.length == 0)
				throw new Error('No Atom Found With this Term')
			return f
		}
		catch (error) {
			throw error
		}
	}

	public static type_to_color(atom:AtomSchema): string {
		switch(atom.category) {
			case 'noble gas': return '#9400d3'
			case 'alkali metal': return '#e5b80b'
			case 'alkaline earth metal': return '#FF6600'
			case 'metalloid': return '#8db600'
			case 'nonmetal': return '#008000'
			case 'hydrogen': return '#aaddaa'
			case 'transition metal': return '#970700'
			case 'post-transition metal': return '#ff007f'
			case 'lanthanide': return '#054f77'
			case 'actinide': return '#4169e1'
			case 'unknown': return '#333333'
			default: return '#000000'
		}
	}
}

export default Atom