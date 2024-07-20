// Util
export const CIRCUFERENCIA = Math.PI*2

/**
 * Altera para maiúsculo a primeira letra da cada palavra
 * @param {string} text
 * @return {string}
 */
export function Capitalize(texto) {
	return texto.split(' ').map(d => {
		if ( ['de'].includes(d) ) return d
		const e = d.split('')
		e[0] = e[0].toUpperCase()
		return e.join('')
	} ).join(' ')
}