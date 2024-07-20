import Window from "./Win"
import "./WindowError.css"

class WindowError extends Window {
	constructor(err) {
		super("Erro")
		this.err = err
	}

	Render() {
		const log = document.createElement('h4')
		log.className = "log-error"
		log.textContent = `${this.err.name}: ${this.err.message}`
		super.AddToContainer(log)
		throw this.err
	}
}

export default WindowError