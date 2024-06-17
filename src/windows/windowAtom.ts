import Window from "./window"
import './windowAtom.css'

const CIRCUFERENCE = Math.PI*2

class WindowAtom extends Window {
	public atom:AtomSchema
	public WIDTH:number
	public HEIGHT:number
	public CENTER:{x:number, y:number}

	private ELETRONS_ANGLE = 0
	private ELETRON_RADIUS = 3
	private ELETRON_SPEED = 0.03
	private LAYER_COLOR = '#FFFFFF33'
	private ELETRON_COLOR = '#0000ff'
	
	private PROTON_RADIUS = 3
	private PROTON_COLOR = "#FF0000"
	private NUCLEUM_RADIUS = 10

	public DELAY = 40
	public BACKGROUND_COLOR = "#000000BB"

	public ctx:CanvasRenderingContext2D

	public animation_frame:number = 0

	constructor(atom:AtomSchema) {
		super( `Atom - ${atom.name}` )
		this.atom = atom

		this.WIDTH = (this.atom!.atomic_radius || 100)*2 + 80
		this.HEIGHT = (this.atom!.atomic_radius || 100)*2 + 80
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }

		const canvas = document.createElement('canvas')
		this.div_container.appendChild(canvas)

		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.ctx = canvas.getContext('2d')!
		this.ctx.lineWidth = 1
	}

	public render() {
		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ), this.DELAY)
	}

	public destroy(): void {
		cancelAnimationFrame(this.animation_frame)
	}

	private draw() {
		if( this.ELETRONS_ANGLE > CIRCUFERENCE - this.ELETRON_SPEED)
			this.ELETRONS_ANGLE = 0
		else
			this.ELETRONS_ANGLE += this.ELETRON_SPEED

		this.ctx.fillStyle = this.BACKGROUND_COLOR
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		this.ctx.fillStyle = this.PROTON_COLOR
		for (let i = 0; i < this.atom!.number; i++) {
			const angle = Math.floor( Math.random() * CIRCUFERENCE )
			const distance =  Math.floor(Math.random()*this.NUCLEUM_RADIUS)

			this.ctx.beginPath()
			this.ctx.arc(
				this.CENTER.x + Math.cos(angle) * distance,
				this.CENTER.y + Math.sin(angle) * distance,
				this.PROTON_RADIUS,
				0, CIRCUFERENCE)
			this.ctx.fill()
			this.ctx.closePath()
		}

		this.ctx.strokeStyle = this.LAYER_COLOR
		for (let i = 1; i <= this.atom.period; i++) {
			this.ctx.beginPath()
			this.ctx.arc(this.CENTER.x, this.CENTER.y, (this.atom!.atomic_radius || 100)/this.atom.period*i + this.NUCLEUM_RADIUS, 0, CIRCUFERENCE)
			this.ctx.stroke()
			this.ctx.closePath()
		}


		this.ctx.fillStyle = this.ELETRON_COLOR
		
		for (let i = 0; i < this.atom!.period; i++) {
			// Cada camada

			for (let j = 1; j <= this.atom!.shells[i]; j++) {
				// Cada eletron da camada

				const angle = ( CIRCUFERENCE / this.atom!.shells[i] * j ) + this.ELETRONS_ANGLE
				const distance = (this.atom!.atomic_radius || 100) /this.atom!.period*(1+i) + this.NUCLEUM_RADIUS

				this.ctx.beginPath()
				this.ctx.arc(
					this.CENTER.x + Math.cos(angle) * distance,
					this.CENTER.y + Math.sin(angle) * distance,
					this.ELETRON_RADIUS, 0, CIRCUFERENCE)
				this.ctx.fill()
				this.ctx.closePath()
			}
		}

		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ), this.DELAY)
	}
}

export default WindowAtom