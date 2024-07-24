
/**
 * @typedef AtomoDeLigacao
 * @prop {string} simbolo
 * @prop {string|undefined} geometria
 * @prop { { para:number, eletrons:number|undefined }[] } ligacoes
 */

/**
 * @typedef MoleculaData
 * @prop {string} nome Nome da Molécula
 * @prop {string} formula Fórmula da Molécula
 * @prop {AtomoDeLigacao[]} atomos Lista de Atomo compondo a Molécula
 */

class Molecula {
	/**
	 * Returns all the Molecules list
	 * @returns { Promise<MoleculaData[]> }
	*/
	static async EncontrarTodos() {
		const response = await fetch("molecula.json")
		const data = await response.json()
		return data
	}

	/**
	 * Pegar uma Moléculas por um termo
	 * associando por 'nome' ou 'fórmula'
	 * @param {String} term
	 * @returns {Promise<MoleculaData>}
	 */
	static async ProcurarUmPorTermo(term) {
		const data = await this.EncontrarTodos()
		return data.find(d => d.nome == term || d.formula == term)
	}

	/** 
	 * Pegar algumas Moléculas por um termo
	 * associando por 'nome' ou 'fórmula'
	 * @param {String} term
	 * @returns {Promise<MoleculaData[]>}
	 */
	static async ProcurarPorTermo(term) {
		const data = await this.EncontrarTodos()
		return data.filter(d =>
			d.nome.includes(term) || d.formula.includes(term) )
	}
}

export default Molecula