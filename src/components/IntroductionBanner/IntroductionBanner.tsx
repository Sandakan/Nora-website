import React from 'react';

import BackgroundBannerLight from '../../assets/images/waves-light.svg';
import BackgroundBannerDark from '../../assets/images/waves-dark.svg';
import LeftBannerImgLight from '../../assets/images/banner-img-left-light.webp';
import CenterBannerImgLight from '../../assets/images/banner-img-center-light.webp';
import RightBannerImgLight from '../../assets/images/banner-img-right-light.webp';
import LeftBannerImgDark from '../../assets/images/banner-img-left-dark.webp';
import CenterBannerImgDark from '../../assets/images/banner-img-center-dark.webp';
import RightBannerImgDark from '../../assets/images/banner-img-right-dark.webp';
import useOnScreen from '../../hooks/useOnScreen';
import ThemeContext from '../../contexts/ThemeContext';

const IntroductionBanner = () => {
	const { isDarkMode } = React.useContext(ThemeContext);

	const BannerRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(BannerRef, { threshold: [0.9] });

	return (
		<div
			className="relative mb-8 grid h-[80vh] max-h-[50rem] w-full grid-rows-2 items-center overflow-hidden pt-20 shadow-xl sm:h-[calc(100vh-1rem)] md:grid-rows-[1fr_2fr] lg:grid-rows-2 xl:max-h-[55rem]"
			ref={BannerRef}>
			<img
				src={isDarkMode ? BackgroundBannerDark : BackgroundBannerLight}
				alt="Stacked waves banner"
				className="absolute h-full w-full object-cover"
			/>

			<p className="relative bottom-0 z-10 px-8 text-right text-[2.75rem] font-medium leading-[3.5rem] text-font-color dark:text-dark-font-color sm:text-6xl sm:leading-[4.5rem] lg:px-0 lg:text-center lg:leading-[1.25] 2xl:text-8xl">
				Experience Everything <br /> a Music Player Should Have
			</p>

			<div className="app-images-container relative z-10 flex h-full w-full justify-center overflow-hidden bg-[linear-gradient(0deg,_rgba(0,0,0,0.25)_0%,_rgba(255,255,255,0)_10%)]">
				<img
					src={isDarkMode ? LeftBannerImgDark : LeftBannerImgLight}
					alt="Banner left image"
					className={`absolute right-0 z-10 translate-x-12 translate-y-24 rotate-0 scale-95 rounded-xl shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] brightness-95 transition-transform duration-300 sm:translate-y-16 lg:right-auto lg:z-0 lg:w-3/5 lg:-translate-x-[14rem] lg:translate-y-12 lg:-rotate-1 ${
						isVisible && 'lg:!-rotate-2 xl:!-translate-x-[16rem] 2xl:!-translate-x-[20rem] 3xl:!-translate-x-[24rem]'
					} `}
				/>
				<img
					src={isDarkMode ? CenterBannerImgDark : CenterBannerImgLight}
					alt="Center banner image"
					className={`absolute bottom-0 right-0 z-20 translate-x-8 scale-110 rounded-xl shadow-[0px_15px_30px_0px_rgba(0,0,0,0.25)] transition-transform duration-300 sm:scale-100 lg:bottom-auto lg:right-auto lg:w-4/5 lg:translate-x-0 lg:scale-95 ${
						isVisible && 'lg:!scale-100'
					} `}
				/>
				<img
					src={isDarkMode ? RightBannerImgDark : RightBannerImgLight}
					alt="Banner left image"
					className={`absolute right-0 translate-x-24 translate-y-2 rotate-0 scale-95 rounded-xl shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] brightness-95 transition-transform duration-300 lg:right-auto lg:w-3/5 lg:translate-x-[14rem] lg:translate-y-12 lg:rotate-1 ${
						isVisible && 'lg:!rotate-2 xl:!translate-x-[16rem] 2xl:!translate-x-[20rem] 3xl:!translate-x-[24rem]'
					} `}
				/>
			</div>
		</div>
	);
};

export default IntroductionBanner;
