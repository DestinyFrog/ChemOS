import WindowError from "../features/WindowError"

/**
 * @typedef AtomoData
 * @prop {string} nome
 * @prop {number|null} raio_atomico distância do á camadas mais externa de elétrons (nanômetro nm)
 * @prop {number|null} eletronegatividade tendência á atrair outros elétrons em uma ligação química
 * @prop {number|null} massa_atomica massa do átomo (unidade de massa atômica 'u')
 * @prop {string} categoria categorias que dividem elementos pelas suas propriedades físicas e químicas
 * @prop {number} numero_atomico número atômico
 * @prop {number} periodo
 * @prop {number} familia
 * @prop {string} simbolo
 * @prop {string} fase estado físico natural do elemento
 * @prop {number} xpos posição no eixo X da Tabela Periódica
 * @prop {number} ypos posição no eixo Y da Tabela Periódica
 * @prop {number[]} camadas elétrons por camada
 * @prop {string} configuracao_eletronica Configuração Eletrônica no formato escrito
 */

class Atomo {
	/** @type {AtomoData[]} */
	static data = undefined

	/** Carregar todos os dados dos Átomos
	 * @returns {Promise<>}
	 */
	static async CarregarTodos() {
		try {
			const response = await fetch('./atomo.json')
			Atomo.data = await response.json()
		}
		catch (error) { throw error }
	}

	/** Procurar um Átomo por um termo
	 * que relaciona 'simbolo' ou 'nome'
	 * @param {string} termo
	 * @returns {Promise<AtomoData>}
	 */
	static ProcurarPorTermo(termo) {
		try {
			const f = Atomo.data.filter(({simbolo, nome}) => simbolo == termo || nome == termo)

			if (f.length == 0)
				throw new Error('No Atom Found With this Term')

			return f[0]
		}
		catch (error) {
			const w = new WindowError(error)
			w.Renderizar()
			return null
		}
	}

	/** Transforma o tipo do elemento em uma cor
	 * @param {AtomoData} atomo
	 * @returns {string}
	 */
	static FiltrarCor(atomo) {
		switch(atomo.categoria) {
			case 'gás nobre':				return '#9400d3'
			case 'metal alcalino':			return '#e5b80b'
			case 'metal alcalino terroso':	return '#FF6600'
			case 'metaloide':				return '#8db600'
			case 'ametal':					return '#008000'
			case 'hidrogênio':				return '#8c0250'
			case 'metal de transição':		return '#970700'
			case 'outros metais':			return '#ff007f'
			case 'lantanídeo':				return '#054f77'
			case 'actinídeo':				return '#4169e1'
			case 'desconhecido':			return '#333333'
			default:						return '#000000'
		}
	}
}

export default Atomo