import Window from "./window"
import "./error.css"

class Window_error extends Window {
	private err: Error

	constructor(err: Error) {
		super("Erro")
		this.err = err
	}

	public render(): void {
		const log = document.createElement('h4')
		log.className = "log-error"
		log.textContent = `${this.err.name}: ${this.err.message}`
		this.add_to_container(log)

		throw this.err
	}

	public destroy(): void {}
}

export default Window_error