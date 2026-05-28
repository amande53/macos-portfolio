import { locations } from '#constants';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import useWindowStore from '#store/window.js';
import useLocationStore from '#store/Location.js';
import {useRef} from 'react';

gsap.registerPlugin(Draggable);

const Home = () => {
	const {openWindow} = useWindowStore()
	const { setActiveLocation } = useLocationStore()
	const containerRef = useRef(null);
	const projects = locations.work?.children ?? [];
	
	
	const handleOpenProjectFinder = (project) => {
		setActiveLocation(project)
		openWindow("finder")
	}
	
	
	useGSAP(() => {
		const folders = containerRef.current?.querySelectorAll('.folder');
		if (!folders?.length) return;
		
		const instances = Draggable.create(folders);
		
		return () => {
			instances.forEach((instance) => instance.kill());
		};
	}, []);
	
	return (
		<section id="home" ref={containerRef}>
			<ul>
				{projects.map((project) => (
					<li
						key={project.id}
						className={
						clsx("group folder",
							project.position)}
						onClick={() => handleOpenProjectFinder(project)}
					>
						<img
							src="/images/folder.png"
							alt={project.name}
						/>
						
						<p>{project.name}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Home;
