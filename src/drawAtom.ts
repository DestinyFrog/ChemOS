const WIDTH = 500
const HEIGHT = 500
const DELAY = 50

const ELETRON_RADIUS = 2
const PROTON_RADIUS = 4
let ELETRONS_ANGLE = 0

class DrawAtom {
	private static atom:AtomSchema

	private static draw_atom(ctx:CanvasRenderingContext2D) {
		if( ELETRONS_ANGLE > Math.PI*2)
			ELETRONS_ANGLE = 0
		else
			ELETRONS_ANGLE += 0.05

		ctx.fillStyle = '#000000'
		ctx.clearRect(0,0,WIDTH,HEIGHT)

		ctx.fillStyle = '#dd0000'
		for (let i = 0; i < this.atom.number; i++) {
			const angle = Math.floor( Math.random() * Math.PI*2 )

			ctx.beginPath()
			ctx.arc(
				WIDTH/2 + Math.cos(angle) * Math.floor(Math.random()*this.atom.number),
				HEIGHT/2 + Math.sin(angle) * Math.floor(Math.random()*this.atom.number),
				PROTON_RADIUS,
				0, Math.PI*2)
			ctx.fill()
			ctx.closePath()
		}

		/*
		ctx.strokeStyle = '#aaaaaa'
		for (let i = 1; i <= this.atom.period; i++) {
			ctx.beginPath()
			ctx.arc(WIDTH/2, HEIGHT/2, this.atom.atomic_radius!/this.atom.period*i, 0, Math.PI*2)
			ctx.stroke()
			ctx.closePath()
		}
		*/

		ctx.fillStyle = '#0000FF'
		for (let i = 0; i < this.atom.period; i++) {
			for (let j = 0; j <= this.atom.shells[i]; j++) {
				const angle = ( (Math.PI*2) / this.atom.shells[i] * j ) + ELETRONS_ANGLE

				ctx.beginPath()
				ctx.arc(
					WIDTH/2 + Math.cos(angle) * (this.atom.atomic_radius!/this.atom.period*(1+i)  + 20),
					HEIGHT/2 + Math.sin(angle) * (this.atom.atomic_radius!/this.atom.period*(1+i) + 20),
					ELETRON_RADIUS,
					0, Math.PI*2)
				ctx.fill()
				ctx.closePath()
			}
		}

		setTimeout(
			() => requestAnimationFrame( () => DrawAtom.draw_atom(ctx) ),
			DELAY
		)
	}

	static draw(atom:AtomSchema) {
		DrawAtom.atom = atom
		let block:HTMLDivElement

		if ( document.getElementById('atomd-block') == null ) {
			block = document.createElement('div')
			block.id = 'atomd-block'
			block.classList.add('block')
			document.querySelector<HTMLDivElement>('#app')!.appendChild(block)
		} else {
			block = <HTMLDivElement> document.getElementById('atomd-block')
			block.innerHTML = ''
		}

		// TODO: do something if atom is null

		const canvas = document.createElement('canvas')
		canvas.width = WIDTH
		canvas.height = HEIGHT
		const ctx = canvas.getContext('2d')!

		ctx.lineWidth = 1

		DrawAtom.draw_atom(ctx)

		block.appendChild(canvas)
	}
}

export default DrawAtom
