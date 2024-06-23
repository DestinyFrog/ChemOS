import Atom from "../functions/Atom"
import { CIRCUFERENCE } from "../util"
import Window from "../features/window"
import './windowAtom.css'

import * as THREE from 'three'

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
	private neutrons: THREE.Mesh[] = Array()

	private ELETRONS_ANGLE = 0
	private ELETRON_RADIUS = 1
	private ELETRON_SPEED = 0.03
	private LAYER_COLOR = '#FFFFFF33'
	private ELETRON_COLOR = '#0000ff'
	private ELETRON_MATERIAL = new THREE.MeshBasicMaterial({
		color: this.ELETRON_COLOR,
		wireframe: true
	})
	
	private PROTON_RADIUS = 5
	private PROTON_COLOR = "#FF0000"
	private PROTON_MATERIAL = new THREE.MeshBasicMaterial({
		color: this.PROTON_COLOR,
		wireframe: true
	})
	private NUCLEUM_RADIUS = 5

	public DELAY = 0
	public BACKGROUND_COLOR = "#000000BB"

	constructor(atom:Atom) {
		super( `Átomo - ${atom.name}` )
		this.atom = atom

		this.WIDTH = this.atom.atomic_radius!*4 + 80
		this.HEIGHT = this.atom.atomic_radius!*4 + 80
		this.CENTER = { x: this.WIDTH/2, y: this.HEIGHT/2 }

		const canvas = document.createElement('canvas')
		this.div_container.appendChild(canvas)

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
				const e = new THREE.SphereGeometry(this.ELETRON_RADIUS)
				const m = new THREE.Mesh(e, this.ELETRON_MATERIAL)
				this.scene.add(m)
				this.eletrons[i].push(m)
			}
		}

		for (let i = 0; i < this.atom.number; i++) {
			const e = new THREE.SphereGeometry(this.PROTON_RADIUS)
			const m = new THREE.Mesh(e, this.PROTON_MATERIAL)

			m.position.x = Math.sin(Math.PI*i) + this.PROTON_RADIUS
			m.position.y = Math.cos(Math.PI*i) + this.PROTON_RADIUS
			m.position.z = this.PROTON_RADIUS*i + 3

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
		if( this.ELETRONS_ANGLE > CIRCUFERENCE - this.ELETRON_SPEED)
			this.ELETRONS_ANGLE = 0; else
			this.ELETRONS_ANGLE += this.ELETRON_SPEED

		for (let i = 0; i < this.eletrons.length; i++) {
			const distance = this.atom.atomic_radius! / this.eletrons.length*(1+i)

			for (let j = 0; j < this.eletrons[i].length; j++) {
				const angle = ( CIRCUFERENCE / this.atom!.shells[i] * j ) + this.ELETRONS_ANGLE

				this.eletrons[i][j].position.x = Math.cos(angle) * distance
				this.eletrons[i][j].position.y = Math.sin(angle) * distance
			}
		}

		// const angle = this.ELETRONS_ANGLE
		// this.camera.position.x = Math.sin(angle) * (  this.atom.atomic_radius! *2 )
		// this.camera.position.z = Math.cos(angle) * (  this.atom.atomic_radius! *2 )
		// this.camera.rotation.x = this.ELETRONS_ANGLE

		// this.ctx.fillStyle = this.BACKGROUND_COLOR
		// this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)

		/*
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
		*/

		/*
		this.ctx.strokeStyle = this.LAYER_COLOR
		for (let i = 1; i <= this.atom.period; i++) {
			this.ctx.beginPath()
			this.ctx.arc(this.CENTER.x, this.CENTER.y, (this.atom!.atomic_radius || 100)/this.atom.period*i + this.NUCLEUM_RADIUS, 0, CIRCUFERENCE)
			this.ctx.stroke()
			this.ctx.closePath()
		}
		*/

		/*
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
		*/

		this.renderer.render(this.scene, this.camera)
		setTimeout( () =>
			requestAnimationFrame( () => this.draw() ), this.DELAY)
	}
}

export default WindowAtom3D