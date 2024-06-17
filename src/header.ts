import ic_atom from './assets/ic_atom.svg'
import WindowElement from "./windows/windowElement"

class Header {

	public static draw(app:HTMLDivElement) {
		const header = document.getElementById('header')!

		const button_search_atom = document.createElement('button')
		button_search_atom.addEventListener('click', _ => {
			const search_draw_atom = WindowElement.dialog_search()
			app.appendChild(search_draw_atom)
		})
		header.appendChild(button_search_atom)

		const img_button_search_atom = document.createElement('img')
		img_button_search_atom.src = ic_atom
		button_search_atom.appendChild(img_button_search_atom)
	}

}

export default Header