import { Capitalize } from "../configuration"
import Win from "../features/Win"

class WindowMolecula extends Win {
	offset = 30
	offset_line = 15
	radius = 80

	bigger_x = 0
	bigger_y = 0
	smaller_x = 0
	smaller_y = 0

	geometria_molecular = {
		"octaédrica": [270, 195, 165, 90, 345, 15],
		"bipiramidal": [270, 180, 90, 345, 15],
		"tetraédrica": [270, 170, 70, 25],
		"piramidal": [160, 70, 25],
		"trigonal plana": [30, 150, 270],
		"angular V": [80, 190],
		"angular": [149.6, 30,4],
		"linear": [0, 180],
		"binaria": [180]
	}

	constructor(data) {
		super( Capitalize(data.nome) )
		this.data = data
	}

	Render() {
		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		// Setup Context
		const ctx = canvas.getContext('2d')

		this.walk(this.data.atomos,
			(atomo, ordem, camada, pai) => {
				const geo = this.geometria_molecular[ pai?.geometria || "linear" ][ordem] || 0
	
				atomo.angle = (pai?.angle || 0) + (geo/180*Math.PI) * (pai?.angle>Math.PI?-1:1)
				atomo.pos = {
					x: (pai?.pos.x || 0) + Math.cos(atomo.angle) * (camada > 0 ? this.radius : 0),
					y: (pai?.pos.y || 0) + Math.sin(atomo.angle) * (camada > 0 ? this.radius : 0)
				}

				if (pai)
					atomo.line = this.draw_lines(atomo, pai, ordem)
			}
		)

		this.set_size()
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.data.atomos.forEach( ({simbolo, pos: {x, y}, line}) => {
			const _x = x + -this.smaller_x + this.offset
			const _y = y + -this.smaller_y + this.offset
			this.setup_context(ctx)

			ctx.fillStyle = "#fff"
			ctx.fillText(simbolo, _x, _y)

			if (line) {
				line.forEach( ({a,b}) => {
					let lax = a.x + -this.smaller_x + this.offset
					let lay = a.y + -this.smaller_y + this.offset
					let lbx = b.x + -this.smaller_x + this.offset
					let lby = b.y + -this.smaller_y + this.offset

					ctx.beginPath()
					ctx.moveTo( lax, lay )
					ctx.lineTo( lbx, lby )
					ctx.stroke()
				})
			}
		})
	}

	setup_context(ctx) {
		ctx.lineWidth = 1
		ctx.fillStyle = "#ffffff"
		ctx.font = 'bold 16px serif'
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

	draw_lines(atomo, pai, ordem) {
		switch (pai.ligacoes[ordem].eletrons) {
			case 1:
				return [
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos(atomo.angle || 0) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin(atomo.angle || 0) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos(atomo.angle+Math.PI || 0) * this.offset_line,
							y: atomo.pos.y + Math.sin(atomo.angle+Math.PI || 0) * this.offset_line
						}
					}
				]

			case 2:
				return [
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos((atomo.angle || 0) - 0.2) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin((atomo.angle || 0) - 0.2) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos((atomo.angle+Math.PI || 0) + 0.2) * this.offset_line,
							y: atomo.pos.y + Math.sin((atomo.angle+Math.PI || 0) + 0.2) * this.offset_line
						}
					},
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos((atomo.angle || 0) + 0.2) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin((atomo.angle || 0) + 0.2) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos((atomo.angle+Math.PI || 0) - 0.2) * this.offset_line,
							y: atomo.pos.y + Math.sin((atomo.angle+Math.PI || 0) - 0.2) * this.offset_line
						}
					}
				]

			case 3:
				return [
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos(atomo.angle || 0) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin(atomo.angle || 0) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos(atomo.angle+Math.PI || 0) * this.offset_line,
							y: atomo.pos.y + Math.sin(atomo.angle+Math.PI || 0) * this.offset_line
						}
					},
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos((atomo.angle || 0) - 0.3) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin((atomo.angle || 0) - 0.3) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos((atomo.angle+Math.PI || 0) + 0.3) * this.offset_line,
							y: atomo.pos.y + Math.sin((atomo.angle+Math.PI || 0) + 0.3) * this.offset_line
						}
					},
					{
						a: {
							x: (pai?.pos.x || 0) + Math.cos((atomo.angle || 0) + 0.3) * this.offset_line,
							y: (pai?.pos.y || 0) + Math.sin((atomo.angle || 0) + 0.3) * this.offset_line
						},
						b: {
							x: atomo.pos.x + Math.cos((atomo.angle+Math.PI || 0) - 0.3) * this.offset_line,
							y: atomo.pos.y + Math.sin((atomo.angle+Math.PI || 0) - 0.3) * this.offset_line
						}
					}
				]
		}
	}

	walk(lista, f, index=0, ordem=0, camadas=0, pai=null) {
		f(lista[index], ordem, camadas, pai)
		camadas++
		lista[index].ligacoes?.forEach(
			(d, idx) =>
				this.walk(lista, f, d.para, idx, camadas, lista[index])
		)
	}
}

export default WindowMolecula