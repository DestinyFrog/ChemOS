import Header from './features/Header'
import WindowError from './features/WindowError'
import Atom from './models/Atom'
import './style.css'

try {
	await Atom.StartGlobalData()
	Header.Render()
}
catch (err) {
	const w = new WindowError(err)
	w.Render()
}