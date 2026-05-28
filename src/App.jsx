import { Navbar, Welcome, Dock } from '#components'
import {Safari, Terminal, Resume} from '#windows';

import { Draggable } from 'gsap/Draggable'
import gsap from "gsap";

gsap.registerPlugin(Draggable)

const App = () => {
	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />
			
			
			<Terminal />
			<Safari />
			<Resume />
			
		</main>
	);
};
export default App;
