import { Capitalize, GrauParaRadiano } from "../configuration"
import Win from "../features/Win"

class WindowMolecula extends Win {
	borda = 30
	borda_linha = 15
	raio = 60

	parte_triangulo = Math.PI/20

	geometria_molecular = {
		"octaédrica": [270, ['t',195], ['f',165], 90, ['t',345], ['f',15]],
		"bipiramidal": [270, 180, 90, ['t',345], ['f',15]],
		"tetraédrica": [270, 170, ['f',70], ['t',25] ],
		"piramidal": [170, ['f',70], ['t',25]],
		"trigonal plana": [30, 150, 270],
		"angular V": [80, 190],
		"angular": [149.6, 30,4],
		"linear": [ 0, 180],
		"binaria": [ 180 ]
	}

	constructor(data) {
		super( Capitalize(data.nome) )
		this.data = data
	}

	Render() {
		this.canvas = document.createElement('canvas')
		this.AddToContainer(this.canvas)

		// Setup Context
		this.ctx = this.canvas.getContext('2d')
		this.ctx.imageSmoothingEnabled = false

		function walk(lista, f, index=0, ordem=0, camadas=0, pai=null) {
			f(lista[index], ordem, camadas, pai)
			camadas++
			lista[index].ligacoes?.forEach(
				(d, idx) =>
					walk(lista, f, d.para, idx, camadas, lista[index])
			)
		}

		walk(this.data.atomos,
			(atomo, ordem, camada, pai) => {
				const geo = this.geometria_molecular[ pai?.geometria || "linear" ][ordem]
				let angulo_ligacao = 0

				if (typeof(geo) == "number") {
					atomo.tipo = 's'
					angulo_ligacao = geo
				} else {
					atomo.tipo = geo[0]
					angulo_ligacao = geo[1]
				}

				atomo.pai = pai
				atomo.ligacao = pai?.ligacoes[ordem]

				atomo.angulo = (pai?.angulo || 0) + GrauParaRadiano(angulo_ligacao) * (pai?.angulo > Math.PI ? -1 : 1)

				atomo.pos = {
					x: (pai?.pos.x || 0) + Math.cos(atomo.angulo) * (camada > 0 ? this.raio : 0),
					y: (pai?.pos.y || 0) + Math.sin(atomo.angulo) * (camada > 0 ? this.raio : 0)
				}
			}
		)

		this._Definir_Tamanho()

		this.data.atomos.forEach(filho => {
			const {simbolo, pos} = filho
			this._Desenhar_Moleculas(pos, simbolo)
			this._Desenhar_Ligacoes(filho, filho.pai)
		})
	}

	/** Desenhar o símbolo das moléculas
	 * @param { { x: number, y: number } } pos
	 * @param {string} simbolo
	 */
	_Desenhar_Moleculas(pos, simbolo) {
		// Configurar Context2D
		this.ctx.fillStyle = "#ffffff"
		this.ctx.font = '18px Courier New monospace'
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline =  'middle'

		const x = pos.x - this.menor_x + this.borda
		const y = pos.y - this.menor_y + this.borda
		this.ctx.fillText(simbolo, x, y)
	}

	/** Desenhar as ligações das moléculas
	 * @param { {x:number, y:number} } filho 
	 * @param { {x:number, y:number} | null } pai
	 */
	_Desenhar_Ligacoes(filho, pai=null) {
		// configuraçoes da linha
		this.ctx.lineWidth = 2
		this.ctx.strokeStyle = '#fff'

		// informaçoes do pai e do filho
		const {x: filho_x, y: filho_y} = filho.pos
		const {x: pai_x, y: pai_y} = pai?.pos || {x:0, y:0}

		if (pai) {
			const pai_orbita_x = this.borda_linha * Math.cos(filho.angulo) + pai_x
			const pai_orbita_y = this.borda_linha * Math.sin(filho.angulo) + pai_y

			// orbita no angulo do filho
			const filho_orbita_x = this.borda_linha * Math.cos(filho.angulo+Math.PI) + filho_x
			const filho_orbita_y = this.borda_linha * Math.sin(filho.angulo+Math.PI) + filho_y

			// Posiçao em orbita
			const linha_ax = pai_orbita_x   - this.menor_x + this.borda
			const linha_ay = pai_orbita_y   - this.menor_y + this.borda
			const linha_bx = filho_orbita_x - this.menor_x + this.borda
			const linha_by = filho_orbita_y - this.menor_y + this.borda

			const distancia = this.raio - this.borda_linha*2

			// Tipo de ligaçao geometrica
			switch (filho.tipo) {
				case 's':
					this.ctx.beginPath()
					this.ctx.moveTo(linha_ax, linha_ay)
					this.ctx.lineTo(linha_bx, linha_by)
					this.ctx.stroke()
					break

				case 'f':
					this.ctx.beginPath()
					this.ctx.arc(
						linha_ax, linha_ay,
						distancia,
						filho.angulo-this.parte_triangulo,
						filho.angulo+this.parte_triangulo
					)
					this.ctx.lineTo(linha_ax, linha_ay)
					this.ctx.fill()
					break

				case 't':
					const quantidade_de_traços = 7
					for (let i = 0; i < Math.ceil(quantidade_de_traços/2); i++) {
						this.ctx.beginPath()
						this.ctx.arc(
							linha_ax, linha_ay,
							distancia/quantidade_de_traços * (i*2),
							filho.angulo-this.parte_triangulo,
							filho.angulo+this.parte_triangulo
						)

						this.ctx.arc(
							linha_ax, linha_ay,
							distancia/quantidade_de_traços * (i*2+1),
							filho.angulo+this.parte_triangulo,
							filho.angulo-this.parte_triangulo,
							true
						)
						this.ctx.fill()
					}
					break
			}
		}
	}

	/** Definir o tamanho da tela */
	_Definir_Tamanho() {
		this.maior_x = 0
		this.maior_y = 0
		this.menor_x = 0
		this.menor_y = 0

		for ( const {pos: {x, y}} of this.data.atomos ) {
			if ( x > this.maior_x )	this.maior_x = x
			if ( x < this.menor_x )	this.menor_x = x
			if ( y > this.maior_y )	this.maior_y = y
			if ( y < this.menor_y )	this.menor_y = y
		}

		this.LARGURA = (-this.menor_x + this.maior_x) + this.borda*2
		this.ALTURA = (-this.menor_y + this.maior_y) + this.borda*2

		this.canvas.width = this.LARGURA
		this.canvas.height = this.ALTURA
	}
}

export default WindowMolecula