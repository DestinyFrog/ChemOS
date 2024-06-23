import Atom from "../functions/Atom"
import Window from "../features/window"
import './windowAtom.css'
import * as THREE from 'three'
import { ELETRON_COLOR_3D, PROTON_COLOR_3D, ELETRON_RADIUS_3D, PROTON_RADIUS_3D, CIRCUFERENCE, ELETRON_SPEED_3D } from "../configuration"

class WindowAtom3D extends Window {
	public atom:Atom
	public WIDTH:number
	public HEIGHT:number
	public CENTER:{x:number, y:number}

	private camera: THREE.Camera
	private scene: THREE.Scene
	private renderer: THREE.WebGLRenderer
	private eletrons: THREE.Mesh[][] = Array()
	private protons: THREE.Mesh[] = Array()
	// private neutrons: THREE.Mesh[] = Array()

	private eletrons_angle = 0

	private ELETRON_MATERIAL = new THREE.MeshBasicMaterial({
		color: ELETRON_COLOR_3D,
		wireframe: true
	})

	private PROTON_MATERIAL = new THREE.MeshBasicMaterial({
		color: PROTON_COLOR_3D,
		wireframe: true
	})

	public DELAY = 0
	public BACKGROUND_COLOR = "#000000BB"

	constructor(atom:Atom) {
		super( `Átomo - ${atom.name}` )
		this.atom = atom

		this.WIDTH = this.atom.atomic_radius!*4 + 80
		this.HEIGHT = this.atom.atomic_radius!*4 + 80
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }

		const canvas = document.createElement('canvas')
		this.add_to_container(canvas)

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera( 75, this.WIDTH/this.HEIGHT, 0.1, 1000 )
		this.renderer = new THREE.WebGLRenderer({ canvas })

		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.WIDTH, this.HEIGHT)
		this.camera.position.setZ( this.atom.atomic_radius! *2 )
	}

	public render() {
		for (let i = 0; i < this.atom.shells.length; i++) {
			this.eletrons.push([])

			for (let j = 0; j < this.atom.shells[i]; j++) {
				const e = new THREE.SphereGeometry(ELETRON_RADIUS_3D)
				const m = new THREE.Mesh(e, this.ELETRON_MATERIAL)
				this.scene.add(m)
				this.eletrons[i].push(m)
			}
		}

		for (let i = 0; i < this.atom.number; i++) {
			const e = new THREE.SphereGeometry(PROTON_RADIUS_3D)
			const m = new THREE.Mesh(e, this.PROTON_MATERIAL)

			m.position.x = Math.sin(Math.PI*i) + PROTON_RADIUS_3D
			m.position.y = Math.cos(Math.PI*i) + PROTON_RADIUS_3D
			m.position.z = PROTON_RADIUS_3D*i + 3

			console.log(
				Math.sin(Math.PI*i )
			)

			this.scene.add(m)
			this.protons.push(m)
		}

		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ), this.DELAY)
	}

	public destroy(): void {}

	private draw() {
		if( this.eletrons_angle > CIRCUFERENCE - ELETRON_SPEED_3D)
			this.eletrons_angle  = 0; else
			this.eletrons_angle += ELETRON_SPEED_3D

		for (let i = 0; i < this.eletrons.length; i++) {
			const distance = this.atom.atomic_radius! / this.eletrons.length*(1+i)

			for (let j = 0; j < this.eletrons[i].length; j++) {
				const angle = ( CIRCUFERENCE / this.atom!.shells[i] * j ) + this.eletrons_angle

				this.eletrons[i][j].position.x = Math.cos(angle) * distance
				this.eletrons[i][j].position.y = Math.sin(angle) * distance
			}
		}

		this.renderer.render(this.scene, this.camera)
		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ), this.DELAY)
	}
}

export default WindowAtom3D