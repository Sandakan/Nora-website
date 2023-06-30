import React from 'react';

import AppInterfaceLeftImg from '../../../assets/images/app-interface-left.webp';
import AppInterfaceCenterImg from '../../../assets/images/app-interface-center.webp';
import AppInterfaceRightImg from '../../../assets/images/app-interface-right.webp';
import useOnScreen from '../../../hooks/useOnScreen';

const AppInterface = () => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(containerRef, { threshold: [0.5] });

	return (
		<div
			className="mx-auto grid h-[15rem] w-[95%] max-w-[120rem] grid-rows-[1fr_clamp(4rem,60%,12rem)] rounded-3xl bg-foreground-color shadow-[0px_-19px_36px_-22px_rgba(0,0,0,0.5)_inset] dark:bg-dark-foreground-color sm:h-[18rem] md:grid-rows-[1fr_clamp(10rem,70%,16rem)] lg:h-[25rem]"
			ref={containerRef}>
			<div className="flex items-center justify-center">
				<p className="saying text-center text-4xl font-medium [text-wrap:balance] lg:text-5xl">
					With an inspiring user interface
				</p>
			</div>
			<div className="relative flex items-center justify-center overflow-hidden">
				<img
					src={AppInterfaceLeftImg}
					className={`absolute top-0 -translate-x-4 translate-y-6 scale-[0.75] rounded-xl shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] transition-transform sm:-translate-y-4 lg:-translate-x-20 ${
						isVisible && '!-translate-x-8 md:!-translate-x-20 lg:!-translate-x-28'
					}`}
					alt="App interface left image"
				/>
				<img
					src={AppInterfaceCenterImg}
					className={`absolute top-0 z-10 translate-y-2 scale-[0.75] rounded-xl shadow-[0px_15px_30px_0px_rgba(0,0,0,0.25)] transition-transform sm:-translate-y-4 ${
						isVisible && '!-translate-y-2 sm:!-translate-y-8 md:!-translate-y-12 lg:!-translate-y-16'
					}`}
					alt="App interface center image"
				/>
				<img
					src={AppInterfaceRightImg}
					className={`absolute top-0 translate-x-4 translate-y-8 scale-[0.75] rounded-xl shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] transition-transform sm:!translate-y-0 lg:translate-x-20 ${
						isVisible && '!translate-x-8 md:!translate-x-20 lg:!translate-x-28'
					}`}
					alt="App interface right image"
				/>
			</div>
		</div>
	);
};

export default AppInterface;
