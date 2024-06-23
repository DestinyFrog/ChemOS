import Atom from "../models/Atom"
import Window from "../features/window"
import "./windowAtom.css"
import { CANVAS_BACKGROUND_COLOR, CIRCUFERENCE, DELAY, ELETRON_COLOR, ELETRON_LAYER_COLOR, ELETRON_RADIUS, ELETRON_SPEED, NUCLEUM_RADIUS, PROTON_COLOR, PROTON_RADIUS } from "../configuration"

class Window_atom extends Window {
	private atom:Atom
	private WIDTH:number
	private HEIGHT:number
	private CENTER:{x:number, y:number}

	private eletrons_angle = 0

	private ctx:CanvasRenderingContext2D

	constructor(atom:Atom) {
		super( `Átomo - ${atom.name}` )
		this.atom = atom

		this.WIDTH = (this.atom!.atomic_radius || 100)*2 + 80
		this.HEIGHT = (this.atom!.atomic_radius || 100)*2 + 80
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }

		const canvas = document.createElement('canvas')
		this.add_to_container(canvas)

		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this.ctx = canvas.getContext('2d')!
		this.setup_context()
	}

	private setup_context() {
		this.ctx.lineWidth = 1
	}

	public render() {
		requestAnimationFrame( () => this.draw() )
	}

	public destroy(): void {}

	private draw() {
		if(this.eletrons_angle > CIRCUFERENCE - ELETRON_SPEED)
			this.eletrons_angle = 0; else
			this.eletrons_angle += ELETRON_SPEED

		this.ctx.fillStyle = CANVAS_BACKGROUND_COLOR
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		this.ctx.fillStyle = PROTON_COLOR
		for (let i = 0; i < this.atom!.number; i++) {
			const angle = Math.floor( Math.random() * CIRCUFERENCE )
			const distance =  Math.floor(Math.random() * NUCLEUM_RADIUS)

			this.ctx.beginPath()
			this.ctx.arc(
				this.CENTER.x + Math.cos(angle) * distance,
				this.CENTER.y + Math.sin(angle) * distance,
				PROTON_RADIUS, 0, CIRCUFERENCE)
			this.ctx.fill()
			this.ctx.closePath()
		}

		this.ctx.strokeStyle = ELETRON_LAYER_COLOR
		for (let i = 1; i <= this.atom.period; i++) {
			this.ctx.beginPath()
			this.ctx.arc(this.CENTER.x, this.CENTER.y, (this.atom!.atomic_radius || 100)/this.atom.period*i + NUCLEUM_RADIUS, 0, CIRCUFERENCE)
			this.ctx.stroke()
			this.ctx.closePath()
		}


		this.ctx.fillStyle = ELETRON_COLOR
		for (let i = 0; i < this.atom!.period; i++) {
			// Cada camada

			for (let j = 1; j <= this.atom!.shells[i]; j++) {
				// Cada eletron da camada

				const angle = ( CIRCUFERENCE / this.atom!.shells[i] * j ) + this.eletrons_angle
				const distance = (this.atom!.atomic_radius || 100) /this.atom!.period*(1+i) + NUCLEUM_RADIUS

				this.ctx.beginPath()
				this.ctx.arc(
					this.CENTER.x + Math.cos(angle) * distance,
					this.CENTER.y + Math.sin(angle) * distance,
					ELETRON_RADIUS, 0, CIRCUFERENCE)
				this.ctx.fill()
				this.ctx.closePath()
			}
		}

		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ),
			DELAY)
	}
}

export default Window_atom