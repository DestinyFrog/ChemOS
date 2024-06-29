import WindowError from "../features/WindowError"

class Atom {
	constructor(
		{name, atomic_radius, eletronegativity, atomic_mass, category, number, period, group, symbol, phase, xpos, ypos, shells, electron_configuration}) {
		this.name = name
		this.atomic_radius = atomic_radius
		this.eletronegativity = eletronegativity
		this.atomic_mass = atomic_mass
		this.category = category
		this.number = number
		this.period = period
		this.group = group
		this.symbol = symbol
		this.phase = phase
		this.xpos = xpos
		this.ypos = ypos
		this.shells = shells
		this.electron_configuration = electron_configuration
	}

	get ligations() {
		return this.shells[ this.shells.length-1 ] > 3 ?
		8 - this.shells[ this.shells.length-1 ] :
		this.shells[ this.shells.length-1 ]
	}

	get color() {
		switch(this.category) {
			case 'gás nobre':				return '#9400d3'
			case 'metal alcalino':			return '#e5b80b'
			case 'metal alcalino terroso':	return '#FF6600'
			case 'metaloide':				return '#8db600'
			case 'não-metal':				return '#008000'
			case 'hidrogênio':				return '#aaddaa'
			case 'metal de transição':		return '#970700'
			case 'metal pós-transição':		return '#ff007f'
			case 'lantanídeo':				return '#054f77'
			case 'actínideo':				return '#4169e1'
			case 'desconhecido':			return '#333333'
			default:						return '#000000'
		}
	}

	static data = null
	static async StartGlobalData() {
		try {
			const response = await fetch('./data.json')
			const data = await response.json()
			this.data = data.map(d => new Atom(d))
		}
		catch (error) { throw error }
	}

	static SearchAtom(term) {
		try {
			const f = Atom.data.filter(d => d.symbol == term || d.name == term)

			if (f.length == 0)
				throw new Error('No Atom Found With this Term')

			return f[0]
		}
		catch (error) {
			const w = new WindowError(error)
			w.Render()
			return null
		}
	}

}

export default Atom