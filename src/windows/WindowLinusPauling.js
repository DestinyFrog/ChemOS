import Window from "../features/Window";

class WindowLinusPauling extends Window {
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

	constructor() {
		super("Diagrama Linus Pauling")

		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		this.WIDTH = this.OFFSET*2 + this.UNIT*4
		this.HEIGHT = this.OFFSET*2 + this.UNIT*7
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this._ctx = canvas.getContext('2d')
		this._ctx.lineWidth = 2
		this._ctx.textAlign = 'left'
	}

	Render() {
		this._Draw()
	}

	_Draw() {
		this._ctx.fillStyle = '#ffffff'
		this._ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		this._ctx.strokeStyle = '#333333'
		for (let i = 1; i < 9; i++) {
			let y = this.OFFSET+ this.UNIT*i
			let x =  this.OFFSET-4
			if (y>this.OFFSET+this.UNIT*7){
				y = this.OFFSET+this.UNIT*7
				x =  this.OFFSET-4+this.UNIT
			}

			this._ctx.moveTo( this.OFFSET+ Math.ceil(i/2)*this.UNIT, this.OFFSET+ i*this.UNIT - Math.ceil(i/2)*this.UNIT )
			this._ctx.lineTo( x, y )
		}
		this._ctx.stroke()

		this.diagram.forEach((d, idx) => {
			for (let i = d.min; i <= d.max; i++) {
				const txt = `${i}${d.sublevel}`

				this._ctx.font = '15px Arial'
				this._ctx.fillText(txt, this.OFFSET+ idx*this.UNIT, this.OFFSET+ i*this.UNIT)

				this._ctx.font = '9px Arial'
				this._ctx.fillText(d.eletrons.toString(), this.OFFSET+ idx*this.UNIT +18, this.OFFSET+ i*this.UNIT -10)
			}
		})

		const camadas = [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ]
		for (let i = 0; i < camadas.length; i++) {
			this._ctx.font = '12px Arial'
			this._ctx.fillText( camadas[i], 8, (1+i)*this.UNIT + this.OFFSET )
		}
	}
}

export default WindowLinusPauling