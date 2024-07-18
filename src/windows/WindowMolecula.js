import Window from "../features/Window"

class WindowMolecula extends Window {
	offset = 30
	offset_line = 15
	radius = 80

	bigger_x = 0
	bigger_y = 0
	smaller_x = 0
	smaller_y = 0

	geometria_molecular = {
		"tetraédrica": [90, 210, 260, 350],
		"piramidal": [350, 210, 260],
		"angular V": [80, 190],
		"trigonal plana": [300, 120],
		"angular": [120, 240],
		"linear": [180, 0],
		"binaria": [180, 0]
	}

	constructor(data) {
		super(`Molécula - ${data.nome}`)
		this.data = data
	}

	Render() {
		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		// Setup Context
		const ctx = canvas.getContext('2d')

		this.walk(this.data.atomos, 
			(atomo, ordem, camada, pai) => {
				let geo = this.geometria_molecular[ pai?.geometria || "linear" ][ordem] || 0
	
				atomo.angle = (pai?.angle || 0) + (geo/180*Math.PI) * (pai?.angle>Math.PI?-1:1)
				atomo.pos = {
					x: (pai?.pos.x || 0) + Math.cos(atomo.angle) * (camada > 0 ? this.radius : 0),
					y: (pai?.pos.y || 0) + Math.sin(atomo.angle) * (camada > 0 ? this.radius : 0)
				}

				if (pai) {
					atomo.line = {
						a: {
							x: (pai?.pos.x || 0) + Math.cos(atomo.angle || 0) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin(atomo.angle || 0) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos(atomo.angle+Math.PI || 0) * this.offset_line,
							y: atomo.pos.y + Math.sin(atomo.angle+Math.PI || 0) * this.offset_line
						}
					}
				}
			}
		)

		this.set_size()
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.data.atomos.forEach( ({simbolo, pos: {x, y}, line}) => {
			const _x = x + -this.smaller_x + this.offset
			const _y = y + -this.smaller_y + this.offset
			this.setup_context(ctx)

			ctx.beginPath()
			ctx.arc(_x, _y, this.offset_line, 0, Math.PI*2)
			ctx.fillStyle = "#400"
			ctx.fill()

			ctx.beginPath()
			ctx.arc(_x, _y, this.offset_line, 0, Math.PI*2)
			ctx.stroke()
			ctx.closePath()

			ctx.fillStyle = "#fff"
			ctx.fillText(simbolo, _x, _y)

			if (line) {
				let lax = line.a.x + -this.smaller_x + this.offset
				let lay = line.a.y + -this.smaller_y + this.offset
				let lbx = line.b.x + -this.smaller_x + this.offset
				let lby = line.b.y + -this.smaller_y + this.offset

				ctx.beginPath()
				ctx.moveTo( lax, lay )
				ctx.lineTo( lbx, lby )
				ctx.stroke()
			}
		})
	}

	setup_context(ctx) {
		ctx.lineWidth = 3
		ctx.fillStyle = "#ffffff"
		ctx.font = 'bold 20px serif'
		ctx.textAlign = 'center'
		ctx.textBaseline =  'middle'
		ctx.strokeStyle = '#ffffff'
	}

	set_size() {
		for ( const {pos: {x, y}} of this.data.atomos ) {
			if ( x > this.bigger_x )	this.bigger_x = x
			if ( x < this.smaller_x )	this.smaller_x = x
			if ( y > this.bigger_y )	this.bigger_y = y
			if ( y < this.smaller_y )	this.smaller_y = y
		}

		this.WIDTH = (-this.smaller_x + this.bigger_x) + this.offset*2
		this.HEIGHT = (-this.smaller_y + this.bigger_y) + this.offset*2
	}

	walk(lista, f, index=0, ordem=0, camadas=0, pai=null) {
		f(lista[index], ordem, camadas, pai)
		camadas++
		lista[index].ligacoes?.forEach(
			(p, idx) =>
				this.walk(lista, f, p.para, idx, camadas, lista[index])
		)
	}
}

export default WindowMolecula