import Window from "../features/Window"
import "./WindowAtomo.css"
import { CANVAS_BACKGROUND_COLOR, CIRCUFERENCE, DELAY, ELETRONS_SPEED_LEVELS, ELETRON_COLOR, ELETRON_LAYER_COLOR, ELETRON_RADIUS, ELETRON_SPEED, NUCLEUM_RADIUS, PROTON_COLOR, PROTON_RADIUS } from "../configuration"

class WindowAtomo extends Window {
	constructor(atomo) {
		super( `Átomo - ${atomo.nome}` )
		this.atomo = atomo

		this._sequenceIndex = 1
		this._eletronsAngle = 0
		this._offset = 40

		this.WIDTH = (this.atomo.raio_atomico || 100)*2 + this._offset*2
		this.HEIGHT = (this.atomo.raio_atomico || 100)*2 + this._offset*2
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }
	}

	Render() {
		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		canvas.width = this.WIDTH
		canvas.height = this.HEIGHT

		this._ctx = canvas.getContext('2d')
		this._ctx.lineWidth = 1

		const velocity_button = document.createElement('button')
		velocity_button.className = 'velocity-button'
		velocity_button.textContent = `${ELETRONS_SPEED_LEVELS[this._sequenceIndex]}x`
		velocity_button.addEventListener('click', _ => {
			this._sequenceIndex++
			if (this._sequenceIndex >= ELETRONS_SPEED_LEVELS.length)
				this._sequenceIndex = 0

			velocity_button.textContent = `${ELETRONS_SPEED_LEVELS[this._sequenceIndex]}x`
		})
		this.AddToFooter(velocity_button)

		requestAnimationFrame( () => this._Draw() )
	}

	_Draw() {
		if (ELETRONS_SPEED_LEVELS[this._sequenceIndex] != 0) {

			if(this._eletronsAngle > CIRCUFERENCE - ELETRON_SPEED)
				this._eletronsAngle = this._eletronsAngle - 360; else
				this._eletronsAngle += ELETRON_SPEED * ELETRONS_SPEED_LEVELS[this._sequenceIndex]

			this._ctx.fillStyle = CANVAS_BACKGROUND_COLOR
			this._ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

			// Draw Proton
			this._ctx.fillStyle = PROTON_COLOR
			for (let i = 0; i < this.atomo.numero_atomico; i++) {
				const angle = Math.floor( Math.random() * ELETRONS_SPEED_LEVELS[this._sequenceIndex] * CIRCUFERENCE )
				const distance = Math.floor(Math.random() * NUCLEUM_RADIUS)

				this._ctx.beginPath()
				this._ctx.arc(
					this.CENTER.x + Math.cos(angle) * distance,
					this.CENTER.y + Math.sin(angle) * distance,
					PROTON_RADIUS, 0, CIRCUFERENCE)
				this._ctx.fill()
				this._ctx.closePath()
			}

			// Draw Eletron Layer
			this._ctx.strokeStyle = ELETRON_LAYER_COLOR
			for (let i = 1; i <= this.atomo.periodo; i++) {
				this._ctx.beginPath()
				this._ctx.arc(this.CENTER.x, this.CENTER.y, (this.atomo.raio_atomico || 100)/this.atomo.periodo*i + NUCLEUM_RADIUS, 0, CIRCUFERENCE)
				this._ctx.stroke()
				this._ctx.closePath()
			}

			// Draw Eletron
			this._ctx.fillStyle = ELETRON_COLOR
			for (let i = 0; i < this.atomo.periodo; i++) {
				// Cada camada

				for (let j = 1; j <= this.atomo.camadas[i]; j++) {
					// Cada eletron da camada

					const angle = ( CIRCUFERENCE / this.atomo.camadas[i] * j ) + this._eletronsAngle
					const distance = (this.atomo.raio_atomico || 100) / this.atomo.periodo*(1+i) + NUCLEUM_RADIUS

					this._ctx.beginPath()
					this._ctx.arc(
						this.CENTER.x + Math.cos(angle) * distance,
						this.CENTER.y + Math.sin(angle) * distance,
						ELETRON_RADIUS, 0, CIRCUFERENCE)
					this._ctx.fill()
					this._ctx.closePath()
				}
			}
		}

		setTimeout( () =>
			requestAnimationFrame( () => this._Draw() ),
			DELAY)
	}
}

export default WindowAtomo