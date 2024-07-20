import Win from "../features/Win"
import "./WindowAtomo.css"
import { Capitalize, CIRCUFERENCIA } from "../configuration"

// informaçoes do Eletron
const NIVEIS_VELOCIDADE_ELETRON = [0, 1, 2, 5, 10]
const RAIO_ELETRON = 3
const VELOCIDADE_ELETRON = 0.03
const COR_CAMADA_ELETRON = '#FFFFFF33'
const COR_ELETRON = '#0000ff'

// Informaçoes do Nucleo/Proton
const RAIO_PROTON = 3
const COR_PROTON = "#FF0000"
const RAIO_NUCLEO = 10

// Canvas Configuration
const COR_FUNDO_CANVAS = "#000000BB"
const RAIO_ATOMICO_PADRAO = 80

// Frames
const DELAY = 40

class WindowAtomo extends Win {
	indice_velocidade = 1
	angulo_eletrons = 0
	borda = 40

	/**
	 * @param {import("../models/Atomo").AtomoData} atomo
	 */
	constructor(atomo) {
		super( `Átomo - ${ Capitalize(atomo.nome) }` )
		this.atomo = atomo

		this.LARGURA = (this.atomo.raio_atomico || RAIO_ATOMICO_PADRAO)*2 + this.borda*2
		this.ALTURA = (this.atomo.raio_atomico || RAIO_ATOMICO_PADRAO)*2 + this.borda*2
		this.CENTRO = { x: this.LARGURA/2, y: this.ALTURA/2 }
	}

	Render() {
		const canvas = document.createElement('canvas')
		this.AddToContainer(canvas)

		canvas.width = this.LARGURA
		canvas.height = this.ALTURA

		this.ctx = canvas.getContext('2d')
		this.ctx.lineWidth = 1

		// Botao que altera a velocidade
		const velocity_button = document.createElement('button')
		velocity_button.className = 'velocity-button'
		velocity_button.textContent = `${NIVEIS_VELOCIDADE_ELETRON[this.indice_velocidade]}x`
		velocity_button.addEventListener('click', _ => {
			this.indice_velocidade++
			if (this.indice_velocidade>= NIVEIS_VELOCIDADE_ELETRON.length)
				this.indice_velocidade= 0

			velocity_button.textContent = `${NIVEIS_VELOCIDADE_ELETRON[this.indice_velocidade]}x`
		})
		this.AddToFooter(velocity_button)

		requestAnimationFrame( () => this.Desenhar() )
	}

	Desenhar() {
		// Se a velocidade de for igual a 0
		// pula a atualizaçao do canvas
		if (NIVEIS_VELOCIDADE_ELETRON[this.indice_velocidade] != 0) {

			// Aumenta o angulo do eletron correspondente a velocidade
			if(this.angulo_eletrons > CIRCUFERENCIA - VELOCIDADE_ELETRON)
				this.angulo_eletrons = this.angulo_eletrons - CIRCUFERENCIA + VELOCIDADE_ELETRON
			else
				this.angulo_eletrons += VELOCIDADE_ELETRON * NIVEIS_VELOCIDADE_ELETRON[this.indice_velocidade]

			// reiniciar o canvas
			this.ctx.fillStyle = COR_FUNDO_CANVAS
			this.ctx.clearRect(0,0,this.LARGURA,this.ALTURA)

			// Desenhar os Protons do nucleo
			this.ctx.fillStyle = COR_PROTON
			for (let i = 0; i < this.atomo.numero_atomico; i++) {
				const angulo = Math.floor(Math.random() * NIVEIS_VELOCIDADE_ELETRON[this.indice_velocidade] * CIRCUFERENCIA)
				const distancia = Math.floor(Math.random() * RAIO_NUCLEO)

				const x = this.CENTRO.x + Math.cos(angulo) * distancia
				const y = this.CENTRO.y + Math.sin(angulo) * distancia

				this.ctx.beginPath()
				this.ctx.arc(x, y, RAIO_PROTON, 0, CIRCUFERENCIA)
				this.ctx.fill()
				this.ctx.closePath()
			}

			// Desenhar as camadas da eletrosfera
			this.ctx.strokeStyle = COR_CAMADA_ELETRON
			for (let i = 1; i <= this.atomo.periodo; i++) {
				this.ctx.beginPath()
				this.ctx.arc(this.CENTRO.x, this.CENTRO.y, (this.atomo.raio_atomico || RAIO_ATOMICO_PADRAO)/this.atomo.periodo*i + RAIO_NUCLEO, 0, CIRCUFERENCIA)
				this.ctx.stroke()
				this.ctx.closePath()
			}

			// Desenhar os Eletrons
			this.ctx.fillStyle = COR_ELETRON
			for (let i = 0; i < this.atomo.periodo; i++) {
				// Desenhar os Eletrons de cada camada

				for (let j = 1; j <= this.atomo.camadas[i]; j++) {
					// Desenhar cada Eletron

					const angulo = (CIRCUFERENCIA / this.atomo.camadas[i] * j) + this.angulo_eletrons
					const distancia = (this.atomo.raio_atomico || RAIO_ATOMICO_PADRAO) / this.atomo.periodo*(1+i) + RAIO_NUCLEO

					const x = this.CENTRO.x + Math.cos(angulo) * distancia
					const y = this.CENTRO.y + Math.sin(angulo) * distancia

					this.ctx.beginPath()
					this.ctx.arc(x, y, RAIO_ELETRON, 0, CIRCUFERENCIA)
					this.ctx.fill()
					this.ctx.closePath()
				}
			}
		}

		setTimeout( () => requestAnimationFrame( () => this.Desenhar() ), DELAY)
	}
}

export default WindowAtomo