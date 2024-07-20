import Win from "../features/Win"

class WindowLinusPauling extends Win {
	OFFSET = 26
	UNIT = 30

	diagram = [
		{
			min: 1,
			max: 7,
			eletrons: 2,
			sublevel: 's'
		},
		{
			min: 2,
			max: 7,
			eletrons: 6,
			sublevel: 'p'
		},
		{
			min: 3,
			max: 6,
			eletrons: 10,
			sublevel: 'd'
		},
		{
			min: 4,
			max: 5,
			eletrons: 14,
			sublevel: 'f'
		}
	]

	camadas = [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ]

	constructor() {
		super("Diagrama Linus Pauling")

		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		this.WIDTH = this.OFFSET*2 + this.UNIT*5
		this.HEIGHT = this.OFFSET*2 + this.UNIT*7
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.ctx = canvas.getContext('2d')
		this.ctx.lineWidth = 2
		this.ctx.textAlign = 'left'
	}

	Render() {
		this.Desenhar()
	}

	Desenhar() {
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		this.Desenhar_Linhas()

		this.ctx.fillStyle = "#fff"
		this.diagram.forEach((d, idx) => {
			for (let i = d.min; i <= d.max; i++) {
				const txt = `${i}${d.sublevel}`

				this.ctx.font = (this.UNIT-12).toString()+'px Arial'
				this.ctx.fillText(txt, this.OFFSET+ (idx+1)*this.UNIT+6, this.OFFSET+ i*this.UNIT -3)

				this.ctx.font = (this.UNIT-20).toString()+'px Arial'
				this.ctx.fillText(d.eletrons.toString(), this.OFFSET+ (idx+1)*this.UNIT + (this.UNIT-6), this.OFFSET+ (i-1)*this.UNIT + 16 )
			}
		})

		for (let i = 0; i < this.camadas.length; i++) {
			this.ctx.font = (this.UNIT-14).toString()+'px Arial'
			this.ctx.fillText( this.camadas[i], this.OFFSET + 8, (1+i)*this.UNIT + this.OFFSET - 3 )
		}
	}

	Desenhar_Linhas() {
		// desenhar linhas
		this.ctx.strokeStyle = '#444'

		for (let i = 0; i <= 6; i++) {
			this.ctx.moveTo( this.OFFSET+ this.UNIT*(Math.floor(i/2+0.1)+2), this.OFFSET + this.UNIT*Math.ceil(i/2) )
			this.ctx.lineTo( this.OFFSET+this.UNIT, this.OFFSET + this.UNIT*(i+1) )
			this.ctx.closePath()
		}

		this.ctx.moveTo( this.OFFSET+this.UNIT*5, this.OFFSET + this.UNIT*4 )
		this.ctx.lineTo( this.OFFSET+this.UNIT*2, this.OFFSET + this.UNIT*7 )
		this.ctx.closePath()

		this.ctx.stroke()

		// desenhar triangulos
		const a = 6
		this.ctx.beginPath()
		this.ctx.fillStyle = "#444"

		for (let b = 1; b < 8; b++) {
			this.ctx.moveTo( this.OFFSET+this.UNIT, this.OFFSET+this.UNIT*b )
			this.ctx.lineTo( this.OFFSET+this.UNIT, this.OFFSET+this.UNIT*b-a )
			this.ctx.lineTo( this.OFFSET+this.UNIT+a, this.OFFSET+this.UNIT*b )
		}

		this.ctx.moveTo( this.OFFSET+this.UNIT*2, this.OFFSET+this.UNIT*7 )
		this.ctx.lineTo( this.OFFSET+this.UNIT*2, this.OFFSET+this.UNIT*7-a )
		this.ctx.lineTo( this.OFFSET+this.UNIT*2+a, this.OFFSET+this.UNIT*7 )

		this.ctx.closePath()
		this.ctx.fill()
	}
}

export default WindowLinusPauling