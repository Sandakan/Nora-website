import React from 'react';

import BackgroundBannerLight from '../../assets/waves-light.svg';
import BackgroundBannerDark from '../../assets/waves-dark.svg';
import LeftBannerImgLight from '../../assets/banner-img-left-light.webp';
import CenterBannerImgLight from '../../assets/banner-img-center-light.webp';
import RightBannerImgLight from '../../assets/banner-img-right-light.webp';
import LeftBannerImgDark from '../../assets/banner-img-left-dark.webp';
import CenterBannerImgDark from '../../assets/banner-img-center-dark.webp';
import RightBannerImgDark from '../../assets/banner-img-right-dark.webp';
import useOnScreen from '../../hooks/useOnScreen';
import ThemeContext from '../../contexts/ThemeContext';

const IntroductionBanner = () => {
	const { isDarkMode } = React.useContext(ThemeContext);

	const BannerRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(BannerRef, { threshold: [0.9] });

	return (
		<div
			className="relative mb-8 grid h-[calc(100vh-1rem)] w-full grid-rows-2 items-center overflow-hidden"
			ref={BannerRef}>
			<img
				src={isDarkMode ? BackgroundBannerDark : BackgroundBannerLight}
				alt="Stacked waves banner"
				className="absolute h-full w-full object-cover"
			/>

			<p className="z-10 text-center text-6xl font-medium leading-[1.25] text-font-color dark:text-font-color-dark">
				Experience Everything <br /> a Music Player Should Have
			</p>

			<div className="app-images-container relative z-10 flex h-full w-full justify-center overflow-hidden bg-[linear-gradient(0deg,_rgba(0,0,0,0.25)_0%,_rgba(255,255,255,0)_10%)]">
				<img
					src={isDarkMode ? LeftBannerImgDark : LeftBannerImgLight}
					alt="Banner left image"
					className={`absolute w-3/5 -translate-x-[14rem] translate-y-12 -rotate-1 scale-95 rounded-xl shadow-xl brightness-95 transition-transform duration-300 ${
						isVisible && '-rotate-2'
					} `}
				/>
				<img
					src={isDarkMode ? CenterBannerImgDark : CenterBannerImgLight}
					alt="Center banner image"
					className={`absolute z-10 w-4/5 scale-95 rounded-xl shadow-xl transition-transform duration-300 ${
						isVisible && '!scale-100'
					} `}
				/>
				<img
					src={isDarkMode ? RightBannerImgDark : RightBannerImgLight}
					alt="Banner left image"
					className={`absolute w-3/5 translate-x-[14rem] translate-y-12 rotate-1 scale-95 rounded-xl shadow-xl brightness-95 transition-transform duration-300 ${
						isVisible && 'rotate-2'
					} `}
				/>
			</div>
		</div>
	);
};

export default IntroductionBanner;
