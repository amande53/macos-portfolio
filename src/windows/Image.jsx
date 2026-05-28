import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { WindowControls } from '#components';
import useWindowStore from '#store/window.js';

const Image = () => {
	const { windows } = useWindowStore();
	const data = windows.imgfile?.data;

	if (!data) return null;

	const { name, imageUrl } = data;

	return (
		<>
			<div id="window-header">
				<WindowControls target="imgfile" />
				<h2>{name}</h2>
			</div>

			<div className="bg-white p-4 flex items-center justify-center h-full max-h-[85vh] overflow-hidden">
				<img
					src={imageUrl}
					alt={name}
					className="max-w-full max-h-full object-contain shadow-md rounded"
				/>
			</div>
		</>
	);
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
