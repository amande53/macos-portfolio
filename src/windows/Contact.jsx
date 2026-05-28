import WindowWrapper from '#hoc/WindowWrapper.jsx';
import {WindowControls} from '#components';
import {socials} from '#constants';

const Contact = () => {
	return (
		<>
			<div id="window-header">
				<WindowControls target="contact"/>
				<h2>Contact Me</h2>
			</div>
			
			<div className="p-5 space-y-5">
				<img src="/images/adrian.jpg" alt="Adrian" className="w-20 rounded-full"/>
			</div>
			
			<h3>Get in touch</h3>
			<p>Feel free to reach out via email or social media.</p>
			<ul>
				{socials.map(({id, bg, link, icon, text}) => (
					<li
						key={id}
						style={{backgroundColor: bg}}>
						<a href={link} target="_blank" rel="noopener noreferrer">
						<img src={icon} alt={text} className="size-5"/>
							<p>{text}</p>
						</a>
					</li>
				))}
					</ul>
					</>
					);
				};

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;
