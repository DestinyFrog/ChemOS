import WindowSearchAtomo from "../windows/WindowSearchAtomo"
import WindowLinusPauling from "../windows/WindowLinusPauling"
import WindowTabelaPeriodica from '../windows/WindowTabelaPeriodica'
import "./Header.css"
import logo from './logo.svg'
import WindowSearchMolecula from "../windows/WindowSearchMolecula"

class Header {
	_header = document.getElementById('header')
	_img_logo = document.createElement('img')

	Render() {
		this._img_logo.id = 'logo'
		this._img_logo.src = logo
		this._header.appendChild(this._img_logo)

		this._GerarBotaoMenu(WindowSearchAtomo,			'Átomo')
		this._GerarBotaoMenu(WindowTabelaPeriodica,		'Tabela Periódica')
		this._GerarBotaoMenu(WindowLinusPauling,		'Diagrama de Linus Pauling')
		this._GerarBotaoMenu(WindowSearchMolecula,		'Molécula')
	}

	_GerarBotaoMenu(window, nome) {
		const botao = document.createElement('button')
		botao.className = 'menu-button'
		botao.textContent = nome
		botao.addEventListener('click', _ => {
			const w = new window()
			w.Render()
		})

		this._header.appendChild(botao)
	}
}

export default Header