import './window.css'

abstract class Window {
	private div_window:HTMLDivElement
	private div_header:HTMLDivElement
	protected div_container:HTMLDivElement
	private div_footer:HTMLDivElement

	private drag_position = { x:0, y:0} 
	private before_drag_position = { x:0, y:0}

	constructor(title:string) {
		const app = document.querySelector<HTMLDivElement>('#app')!

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

			const mouseMove = (ev:MouseEvent) => {
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

			const mouseMove = (ev:TouchEvent) => {
				this.drag_position.x = this.before_drag_position.x - ev.touches[0].clientX
				this.drag_position.y = this.before_drag_position.y - ev.touches[0].clientY
	
				this.before_drag_position.x = ev.touches.item(0)?.clientX!
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
			this.close()
		})
		this.div_header.appendChild(button_close_window)

		const window_label = document.createElement('p')
		window_label.className = "window-label"
		window_label.textContent = title
		this.div_header.appendChild(window_label)
	}

	public close() {
		this.destroy()
		this.div_window.remove()
	}

	public abstract render(): void
	public abstract destroy(): void

	public set_position({x, y}:{x:number, y:number}) {
		this.div_window.style.top = `${y}px`
		this.div_window.style.left = `${x}px`
	}

	public get_position() {
		return {
			x: parseFloat( this.div_window.style.left.replace('.px','') ),
			y: parseFloat( this.div_window.style.top.replace('.px','') )
		}
	}

	public get_size() {
		return {
			width: this.div_window.clientWidth,
			height: this.div_window.clientHeight
		}
	}

	protected add_to_container(el:HTMLElement) {
		this.div_container.appendChild(el)
	}

	protected add_to_footer(el:HTMLElement) {
		this.div_footer.appendChild(el)
	}

	protected add_to_header(el:HTMLElement) {
		this.div_header.appendChild(el)
	}
}

export default Window