import Window from "../features/window";

class Windows_Linus_Pauling extends Window {
	private ctx: CanvasRenderingContext2D;
	private OFFSET = 30
	private UNIT = 36
	private WIDTH: number
	private HEIGHT: number

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
		this.add_to_container(canvas)

		this.WIDTH = this.OFFSET*2 + this.UNIT*4
		this.HEIGHT = this.OFFSET*2 + this.UNIT*7
		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.ctx = canvas.getContext('2d')!
		this.ctx.lineWidth = 2
		this.ctx.textAlign = 'left'
	}

	public render(): void {
		this.draw()
	}

	private draw(): void {
		this.ctx.fillStyle = '#ffffff'
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		this.ctx.strokeStyle = '#333333'
		for (let i = 1; i < 9; i++) {
			let y = this.OFFSET+ this.UNIT*i
			let x =  this.OFFSET-4
			if (y>this.OFFSET+this.UNIT*7){
				y = this.OFFSET+this.UNIT*7
				x =  this.OFFSET-4+this.UNIT
			}

			this.ctx.moveTo( this.OFFSET+ Math.ceil(i/2)*this.UNIT, this.OFFSET+ i*this.UNIT - Math.ceil(i/2)*this.UNIT )
			this.ctx.lineTo( x, y )
		}
		this.ctx.stroke()

		this.diagram.forEach((d, idx) => {
			for (let i = d.min; i <= d.max; i++) {
				const txt = `${i}${d.sublevel}`

				this.ctx.font = '15px Arial'
				this.ctx.fillText(txt, this.OFFSET+ idx*this.UNIT, this.OFFSET+ i*this.UNIT)

				this.ctx.font = '9px Arial'
				this.ctx.fillText(d.eletrons.toString(), this.OFFSET+ idx*this.UNIT +18, this.OFFSET+ i*this.UNIT -10)
			}
		})

		const camadas = [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ]
		for (let i = 0; i < camadas.length; i++) {
			this.ctx.font = '12px Arial'
			this.ctx.fillText( camadas[i], 8, (1+i)*this.UNIT + this.OFFSET )
		}
	}

	public destroy(): void {}
}

export default Windows_Linus_Pauling