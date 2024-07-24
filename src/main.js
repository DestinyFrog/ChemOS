import Header from './features/Header'
import WindowError from './features/WindowError'
import Atomo from './models/Atomo'
import Molecula from './models/Molecula'
import './style.css'
import WindowMolecula from './windows/WindowMolecula'

( async () => {

	try {
		await Atomo.CarregarTodos()
	}
	catch (err) {
		const w = new WindowError(err)
		w.Renderizar()
	}
	finally {
		const header = new Header()
		header.Renderizar()
	}

} ).call(this)