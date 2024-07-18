
/**
 * @typedef AtomoDeLigacao
 * @prop {string} simbolo
 * @prop {string|undefined} geometria
 * @prop { { para:number, eletrons:number|undefined }[] } ligacoes
 */

/**
 * @typedef Molecula
 * @prop {string} nome Nome da Molécula
 * @prop {string} formula Fórmula da Molécula
 * @prop {AtomoDeLigacao[]} atomos Lista de Atomo compondo a Molécula
 */

class Molecula {
	/**
	 * Returns all the Molecules list
	 * @returns { Promise<Molecula[]> }
	*/
	static async GetAll() {
		const response = await fetch("molecula.json")
		const data = await response.json()
		return data
	}

	/**
	 * Pegar algumas Moléculas por um termo
	 * associando por 'nome' ou 'fórmula'
	 * @param {String} term
	 */
	static async SearchFor(term) {
		const data = await this.GetAll()
		return data.find(d => d.nome == term || d.formula == term)
	}

	/**
	 * @param {String} term
	 */
	static async SearchForMany(term) {
		const data = await this.GetAll()
		return data.filter(d =>
			d.nome.includes(term) || d.formula.includes(term) )
	}
}

export default Molecula