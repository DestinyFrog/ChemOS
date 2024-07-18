import WindowError from "../features/WindowError"

class Atomo {
	constructor(d) {
		this.nome					= d.nome
		this.raio_atomico			= d.raio_atomico
		this.eletronegatividade		= d.eletronegatividade
		this.massa_atomica			= d.massa_atomica
		this.categoria				= d.categoria
		this.numero_atomico			= d.numero_atomico
		this.periodo				= d.periodo
		this.familia				= d.familia
		this.simbolo				= d.simbolo
		this.fase					= d.fase
		this.xpos					= d.xpos
		this.ypos					= d.ypos
		this.camadas				= d.camadas
		this.configuracao_eletronica= d.configuracao_eletronica
		this.color					= this.cor
	}

	get cor() {
		switch(this.categoria) {
			case 'gás nobre':				return '#9400d3'
			case 'metal alcalino':			return '#e5b80b'
			case 'metal alcalino terroso':	return '#FF6600'
			case 'metaloide':				return '#8db600'
			case 'ametal':					return '#008000'
			case 'hidrogênio':				return '#8c0250'
			case 'metal de transição':		return '#970700'
			case 'outros metais':			return '#ff007f'
			case 'lantanídeo':				return '#054f77'
			case 'actinídeo':				return '#4169e1'
			case 'desconhecido':			return '#333333'
			default:						return '#000000'
		}
	}

	static data = null
	static async StartGlobalData() {
		try {
			const response = await fetch('./atomo.json')
			const data = await response.json()
			this.data = data.map(d => new Atomo(d))
		}
		catch (error) { throw error }
	}

	static SearchAtom(term) {
		try {
			const f = Atomo.data.filter(({simbolo, nome}) => simbolo == term || nome == term)

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

export default Atomo