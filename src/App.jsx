import { Navbar, Welcome, Dock } from '#components'
import {Safari, Terminal, Resume, Finder, Text, Image, Contact} from '#windows';

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
			<Finder />
			<Text />
			<Image />
			<Contact />
		</main>
	);
};
export default App;
