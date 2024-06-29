import './Window.css'

class Window {
	drag_position = { x:0, y:0} 
	before_drag_position = { x:0, y:0}

	Render() {}
	Destroy() {}

	constructor(title) {
		const app = document.querySelector('#app')

		this.div_window = document.createElement('div')
		this.div_window.className = "window"
		this.div_window.style.top = `${ Math.random() * (document.body.clientHeight - 300) }px`
		this.div_window.style.left = `${ Math.random() * (document.body.clientWidth - 300) }px`
		app.appendChild(this.div_window)

		this.div_header = document.createElement('div')
		this.div_header.className = "window-header"
		app.appendChild(this.div_header)
		this.div_window.appendChild(this.div_header)

		this.div_header.addEventListener('mousedown', ev => {
			this.before_drag_position.x = ev.clientX
			this.before_drag_position.y = ev.clientY

			const mouseMove = (ev) => {
				this.drag_position.x = this.before_drag_position.x - ev.clientX
				this.drag_position.y = this.before_drag_position.y - ev.clientY

				this.before_drag_position.x = ev.clientX
				this.before_drag_position.y = ev.clientY

				this.div_window.style.top = `${this.div_window.offsetTop - this.drag_position.y}px`
				this.div_window.style.left = `${this.div_window.offsetLeft - this.drag_position.x}px`
			}

			document.addEventListener('mousemove', mouseMove)
			document.addEventListener('mouseup', _ =>
				document.removeEventListener('mousemove', mouseMove) )
		})

		this.div_header.addEventListener('touchstart', ev => {
			this.before_drag_position.x = ev.touches[0].clientX
			this.before_drag_position.y = ev.touches[0].clientY

			const mouseMove = (ev) => {
				this.drag_position.x = this.before_drag_position.x - ev.touches[0].clientX
				this.drag_position.y = this.before_drag_position.y - ev.touches[0].clientY
	
				this.before_drag_position.x = ev.touches.item(0)?.clientX
				this.before_drag_position.y = ev.touches[0].clientY

				this.div_window.style.top = `${this.div_window.offsetTop - this.drag_position.y}px`
				this.div_window.style.left = `${this.div_window.offsetLeft - this.drag_position.x}px`
			}

			document.addEventListener('touchmove', mouseMove)
			document.addEventListener('touchend', _ =>
				document.removeEventListener('touchmove', mouseMove) )
		})

		this.div_container = document.createElement('div')
		this.div_container.className = "window-container"
		app.appendChild(this.div_container)
		this.div_window.appendChild(this.div_container)

		this.div_footer = document.createElement('div')
		this.div_header.className = "window-footer"
		app.appendChild(this.div_footer)
		this.div_window.appendChild(this.div_footer)

		const button_close_window = document.createElement('button')
		button_close_window.className = "window-closer"
		button_close_window.addEventListener('click', _ => {
			this.Close()
		})
		this.div_header.appendChild(button_close_window)

		const window_label = document.createElement('p')
		window_label.className = "window-label"
		window_label.textContent = title
		this.div_header.appendChild(window_label)
	}

	Close() {
		this.Destroy()
		this.div_window.remove()
	}

	set position ({x, y}) {
		this.div_window.style.top = `${y}px`
		this.div_window.style.left = `${x}px`
	}

	get position () {
		return {
			x: parseFloat( this.div_window.style.left.replace('.px','') ),
			y: parseFloat( this.div_window.style.top.replace('.px','') )
		}
	}

	get size() {
		return {
			width: this.div_window.clientWidth,
			height: this.div_window.clientHeight
		}
	}

	AddToContainer(el) {
		this.div_container.appendChild(el)
	}

	AddToFooter(el) {
		this.div_footer.appendChild(el)
	}

	AddToHeader(el) {
		this.div_header.appendChild(el)
	}
}

export default Window