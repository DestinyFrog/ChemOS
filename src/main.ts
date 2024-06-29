import Window_error from './features/error'
import Header from './features/header'
import Atom from './models/Atom'
import './style.css'

try {
	await Atom.start_global_data()
	Header.render()
}
catch (err) {
	const w = new Window_error(<Error> err)
	w.render()
}