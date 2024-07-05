import { CIRCUFERENCE } from "../configuration"
import Window from "../features/Window"
import Molecula from "../models/Molecula"
import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

class WindowMolecula3D extends Window {
	WIDTH = 300
	HEIGHT = 300

	scene = new THREE.Scene()
	renderer = new THREE.WebGLRenderer()
	camera = new THREE.PerspectiveCamera(75, this.WIDTH/this.HEIGHT, 0.1, 1000)

	/**
	 * @param {Molecula} molecula
	 */
	constructor(molecula) {
		super("Molécula")
		this.molecula = molecula
	}

	Render() {
		// this.camera.rotation.z = 0.89
		// this.camera.rotation.x = -0.1
		this.camera.position.y = 160

		const length = this.molecula.atoms.length

		this.scene.add(new THREE.GridHelper(4000, 50, 0xffffff));

		this.molecula.atoms.forEach( (atomo, idx) => {
			const material = new THREE.MeshBasicMaterial( { color: new THREE.Color(atomo.color) } )
			const geometry = new THREE.SphereGeometry(atomo.raio_atomico)

			const mesh = new THREE.Mesh(geometry, material)

			mesh.position.x = Math.cos( (CIRCUFERENCE/(length-1)) * idx ) * (idx!=0 ? atomo.raio_atomico*3 : 0)
			mesh.position.y = Math.sin( (CIRCUFERENCE/(length-1)) * idx ) * (idx!=0 ? atomo.raio_atomico*3 : 0) + 100

			this.scene.add(mesh)
			atomo.mesh = mesh
		})

		this.media = this.molecula.atoms.reduce((d, cur) => {
			return {
				x: d.x + cur.mesh.position.x,
				y: d.y + cur.mesh.position.y,
				z: d.z + cur.mesh.position.z
			}
		}, {x: 0, y: 0, z: 0})

		// this.media.x = this.media.x / this.molecula.atoms.length
		// this.media.y = this.media.y / this.molecula.atoms.length
		// this.media.z = this.media.z / this.molecula.atoms.length

		this.molecula.ligations.forEach( (ligation) => {
			const material = new THREE.LineDashedMaterial( {
				color: 0xffffff,
				linewidth: 10
			} )

			const a = ligation.a.mesh.position
			const b = ligation.b.mesh.position

			const points = [a, b]
			const geometry = new THREE.BufferGeometry().setFromPoints( points );

			const mesh = new THREE.Line(geometry, material)
			this.scene.add(mesh)
		} )

		this.renderer.setSize(this.WIDTH, this.HEIGHT)
		this.AddToContainer(this.renderer.domElement)
		this.renderer.render(this.scene, this.camera)

		this.renderer.setAnimationLoop(() => this._SpinCamera())
	}

	_cameraAngle = 0
	_SpinCamera() {
		if(this._cameraAngle > CIRCUFERENCE)
			this._cameraAngle = this._cameraAngle - CIRCUFERENCE; else
			this._cameraAngle += 0.02

		this.camera.position.x = Math.sin(this._cameraAngle) * 600
		this.camera.position.z = Math.cos(this._cameraAngle) * 600

		this.camera.rotation.y = this._cameraAngle
		this.renderer.render(this.scene, this.camera)
	}
}

export default WindowMolecula3D