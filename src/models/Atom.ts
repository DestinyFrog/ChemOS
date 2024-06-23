import { atom_schema } from "./atom_schema"

class Atom {
	public name: string
	public atomic_radius: null | number
	public eletronegativity: null | number
	public atomic_mass: number
	public category: string
	public number: number
	public period: number
	public group: number
	public symbol: string
	public phase: string
	public xpos: number
	public ypos: number
	public shells: number[]
	public electron_configuration: string
	public color: string

	constructor(
		{name, atomic_radius, eletronegativity, atomic_mass, category, number, period, group, symbol, phase, xpos, ypos, shells, electron_configuration}
		:atom_schema) {
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

		this.color = this.get_color()
	}

	public get_ligations(): number {
		return this.shells[ this.shells.length-1 ] > 3 ?
		8 - this.shells[ this.shells.length-1 ] :
		this.shells[ this.shells.length-1 ]
	}

	private get_color(): string {
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

	public static async get_all(): Promise<Atom[]> {
		try {
			const response = await fetch('/data.json')
			const data:atom_schema[] = await response.json()
			return data.map(d => new Atom(d))
		}
		catch (error) { throw error }
	}

	public static async search_atom(term:string): Promise<Atom> {
		try {
			const response = await fetch('/data.json')
			const data:atom_schema[] = await response.json()
			const f = data.filter(d => d.symbol == term)

			if (f.length == 0)
				throw new Error('No Atom Found With this Term')

			return new Atom(f[0])
		}
		catch (error) { throw error }
	}

}

export default Atom