import {Tooltip} from 'react-tooltip';
import { useRef } from "react";
import  gsap from 'gsap'
import { dockApps } from "#constants";
import {useGSAP} from '@gsap/react';


const Dock = () => {
	const dockRef = useRef(null);
	
	useGSAP( () => {
		const dock = dockRef.current
		if (!dock) return () => {}
		
		const icons = dock.querySelectorAll('.dock-icon');
		let dockLeft = 0;
		let frameId = null;
		let latestClientX = 0;
		
		const updateDockBounds = () => {
			dockLeft = dock.getBoundingClientRect().left;
		}
		
		const animateIcons = (mouseX) => {
			icons.forEach((icon) => {
				const {left: iconLeft, width} = icon.getBoundingClientRect();
				const center = iconLeft-dockLeft+width/2;
				const distance = Math.abs(mouseX-center);
				
				const intensity = Math.exp(-(distance ** 2.5) / 1750);
				
				gsap.to(icon, {
					scale: 1 + 0.25 * intensity,
					y: -15 * intensity,
					duration: 0.2,
					ease: 'power1.out'
				})
			})
		}
		
		const handleMouseMove = (e) => {
			latestClientX = e.clientX;
			if (frameId) return;
			
			frameId = requestAnimationFrame(() => {
				frameId = null;
				const left = dockLeft;
				animateIcons(latestClientX - left)
			})
		}
		
		const resetIcons =() => {
			icons.forEach((icon) => {
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: 'power1.out'
				})
			})
		}
		
		updateDockBounds()
		
		const resizeObserver = window.ResizeObserver
			? new ResizeObserver(updateDockBounds)
			: null;
		
		window.addEventListener('resize', updateDockBounds)
		resizeObserver?.observe(dock)
		dock.addEventListener('mousemove', handleMouseMove)
		dock.addEventListener('mouseleave', resetIcons)
		
		return () => {
			if (frameId) {
				cancelAnimationFrame(frameId)
			}
			window.removeEventListener('resize', updateDockBounds)
			resizeObserver?.disconnect()
			dock.removeEventListener('mousemove', handleMouseMove)
			dock.removeEventListener('mouseleave', resetIcons)
		}
	}, []);
	
	
	
	const toggleApp = (app) => {
		console.log(app);
	};
	
	return (
		<section id="dock">
			<div ref={dockRef} className="dock-container">
				{dockApps.map(({ id, name, icon, canOpen }) => (
					<div key={id ?? name} className="relative flex justify-center">
						<button
							type="button"
							className="dock-icon"
							aria-label={name}
							data-tooltip-id="dock-tooltip"
							data-tooltip-content={name}
							data-tooltip-disable={!canOpen}
							disabled={!canOpen}
							onClick={() => toggleApp({ id, canOpen })}
						>
							<img
								src={`/images/${icon}`}
								alt={name}
								loading="lazy"
								className={canOpen ? "" : "opacity-60"}
							/>
						</button>
					</div>
				))}
				<Tooltip  id="dock-tooltip" place="top" className="tooltip"/>
			</div>
		</section>
	);
};

export default Dock;
