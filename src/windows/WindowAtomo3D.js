import Window from "../features/Window"
import "./WindowAtomo.css"
import { CIRCUFERENCE, ELETRONS_SPEED_LEVELS, ELETRON_SPEED } from "../configuration"
import * as THREE from 'three'

class WindowAtomo3D extends Window {
	_sequenceIndex = 1
	_eletronsAngle = 0
	_offset = 30

	WIDTH = 300
	HEIGHT = this.WIDTH

	scene = new THREE.Scene()
	renderer = new THREE.WebGLRenderer()
	camera = new THREE.PerspectiveCamera(75, this.WIDTH/this.HEIGHT, 0.1, 1000)

	proton_material = new THREE.MeshBasicMaterial( { color: 0x0000ff } )
	eletron_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
	proton_geometry = new THREE.SphereGeometry(4)
	eletron_geometry = new THREE.SphereGeometry(8)
	protons = []
	eletrons = []

	constructor(atomo) {
		super( `Átomo - ${atomo.nome}` )
		this.atomo = atomo

		this.position = {x: 10, y: 10}

		const proton = new THREE.Mesh( this.proton_geometry, this.proton_material )
		this.scene.add(proton)

		for (let i = 0; i < this.atomo.camadas.length; i++) {
			this.protons.push([])
			this.eletrons.push([])

			const distance = (this.WIDTH-this._offset*2) / this.atomo.periodo*(1+i)
			const camada_material = new THREE.MeshBasicMaterial( { color: 0x444444 } )
			const camada_geometry = new THREE.TorusGeometry(distance, 2, 40, 40)
			const camada = new THREE.Mesh( camada_geometry, camada_material )
			camada.rotation.x = 80.1
			this.scene.add(camada)

			for (let j = 0; j < this.atomo.camadas[i]; j++) {
				const eletron = new THREE.Mesh( this.eletron_geometry, this.eletron_material )
				this.eletrons[i].push(eletron)
				this.scene.add(eletron)

				/*
				const proton = new THREE.Mesh( this.proton_geometry, this.proton_material )
				// proton.position.x = j*1 * (j%2 == 0 ? 1 : -1)
				// proton.position.y = i*1
				this.protons[i].push(proton)
				this.scene.add(proton)
				*/
			}
		}
	}

	Render() {
		this.camera.rotation.x = -0.9
		this.camera.position.y = 300
		this.camera.position.z = 300

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

		this.renderer.setSize(this.WIDTH, this.HEIGHT)
		this.AddToContainer(this.renderer.domElement)

		this.renderer.setAnimationLoop(() => this._Draw())
	}

	_Draw() {
		if (ELETRONS_SPEED_LEVELS[this._sequenceIndex] != 0) {
			if(this._eletronsAngle > CIRCUFERENCE - ELETRON_SPEED)
				this._eletronsAngle = this._eletronsAngle - 360
			else
				this._eletronsAngle += ELETRON_SPEED * ELETRONS_SPEED_LEVELS[this._sequenceIndex]

				for (let i = 0; i < this.atomo.camadas.length; i++) {
					for (let j = 0; j < this.atomo.camadas[i]; j++) {
						const angle = ( CIRCUFERENCE / this.atomo.camadas[i] * j ) + this._eletronsAngle
						const distance = (this.WIDTH-this._offset*2) / this.atomo.periodo*(1+i)

						this.eletrons[i][j].position.x = Math.cos(angle) * distance
						this.eletrons[i][j].position.z = Math.sin(angle) * distance
					}
				}
		}

		this.renderer.render(this.scene, this.camera)
	}
}

export default WindowAtomo3D