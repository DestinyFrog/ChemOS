import './window.css'

abstract class Window {
	private div_window:HTMLDivElement
	private div_header:HTMLDivElement
	protected div_container:HTMLDivElement

	constructor() {
		const app = document.querySelector<HTMLDivElement>('#app')!

		this.div_window = document.createElement('div')
		this.div_window.className = "window"
		app.appendChild(this.div_window)

		this.div_window.addEventListener('drag', ev => {
			this.div_window.style.top = `${ev.clientY}px`
			this.div_window.style.left = `${ev.clientX}px`
		})

		this.div_header = document.createElement('div')
		this.div_header.className = "window-header"
		app.appendChild(this.div_header)
		this.div_window.appendChild(this.div_header)

		this.div_container = document.createElement('div')
		this.div_container.className = "window-container"
		app.appendChild(this.div_container)
		this.div_window.appendChild(this.div_container)

		const button_close_window = document.createElement('button')
		button_close_window.className = "window-closer"
		button_close_window.addEventListener('click', _ => {
			this.div_window.remove()
		})
		this.div_header.appendChild(button_close_window)
	}

	public abstract render(): void
}

export default Window