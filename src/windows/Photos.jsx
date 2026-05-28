import {Mail, Search} from 'lucide-react';

import WindowWrapper from '#hoc/WindowWrapper.jsx';
import {WindowControls} from '#components';
import {gallery, photosLinks} from '#constants';
import useWindowStore from '#store/window.js';

const Photos = () => {
	const {openWindow} = useWindowStore();
	
	
	return (
		<>
			<div id="window-header">
				<WindowControls target="photos"/>
				
				<div className="w-full flex justify-end items-center gap-3 text-grey-50">
					<Mail className="icon"/>
					<Search/>
				</div>
				
				<div className="flex w-full">
					<div className="sidebar">
						<h2>Photos</h2>
						<ul>
							{photosLinks.map(({id, icon, title}) => (
								<li key={id}>
									<img src={icon} alt={title}/>
									<p>{title}</p>
								</li>
							))}
						</ul>
					</div>
					
					<div className="gallery">
						<ul>
							{gallery.map(({ id, img}) =>(
								<li
								key={id}
								onClick={() => openWindow("imagefile", {
									id,
									name: "Gallery image",
									icon: "/images/image.png",
									kind: "file",
									fileType: "image",
									imageUrl: img,
								})
								}
								>
								<img src={img} alt={id}/>
								</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

const PhotoWindow = WindowWrapper(Photos,"photos")
export default PhotoWindow;
