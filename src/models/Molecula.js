import Atomo from "./Atomo"

class Molecula {

	/**
	 * @param {String} term
	 */
	static async SearchFor(term) {
		const response = await fetch("molecula.json")
		const data = await response.json()
		return data.find(d => d.nome == term || d.formula == term)
	}

	static async GetAll() {
		const response = await fetch("molecula.json")
		const data = await response.json()
		return data
	}

	constructor(data) {
		this.data = data
	}

}

export default Molecula