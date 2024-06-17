
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
			case 'noble gas': return '#8C16E0'

			default:
				return ''
		}
	}
}

export default Atom