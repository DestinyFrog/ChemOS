import Header from './features/Header'
import WindowError from './features/WindowError'
import Atomo from './models/Atomo'
import './style.css'

( async () => {

	try {
		await Atomo.StartGlobalData()
	}
	catch (err) {
		const w = new WindowError(err)
		w.Render()
	}
	finally {
		const header = new Header()
		header.Render()
	}

} ).call(this)