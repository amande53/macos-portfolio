import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { WindowControls } from '#components';
import useWindowStore from '#store/window.js';

const Text = () => {
	const { windows } = useWindowStore();
	const data = windows.txtfile?.data;

	if (!data) return null;

	const { name, subtitle, image, description } = data;

	return (
		<>
			<div id="window-header">
				<WindowControls target="txtfile" />
				<h2>{name}</h2>
			</div>

			<div className="bg-white p-6 overflow-y-auto h-full max-h-[80vh] custom-scrollbar">
				<div className="max-w-2xl mx-auto">
					{image && (
						<img
							src={image}
							alt={name}
							className="w-full h-auto rounded-lg mb-6 shadow-sm"
						/>
					)}

					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						{name}
					</h1>

					{subtitle && (
						<p className="text-xl text-gray-600 mb-6 italic">
							{subtitle}
						</p>
					)}

					<div className="space-y-4">
						{description?.map((paragraph, index) => (
							<p key={index} className="text-gray-800 leading-relaxed">
								{paragraph}
							</p>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
