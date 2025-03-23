/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import ThemeContext from '../../contexts/ThemeContext';

import FeedbackComponent from './FeedbackComponent';
import useOnScreen from '../../hooks/useOnScreen';

import SoftpediaIconLightImg from '../../assets/images/softpedia-icon-light.svg';
import SoftpediaIconDarkImg from '../../assets/images/softpedia-icon-dark.svg';
import RedditLogoLightImg from '../../assets/images/reddit-logo-light.svg';
import RedditLogoDarkImg from '../../assets/images/reddit-logo-dark.svg';
import patternLight from '../../assets/images/pattern-light.svg';
import patternDark from '../../assets/images/pattern-dark.svg';

const feedbackList = [
	{
		feedback:
			'A sleek music player with a modern design, this solution seeks to provide users with a seamless experience when it comes to listening to their favorite local tunes.',
		user: 'Robert Condorache • Softpedia',
		link: 'https://www.softpedia.com/get/Multimedia/Audio/Audio-Players/Oto-Music-for-Desktop.shtml',
		images: {
			light: SoftpediaIconLightImg,
			dark: SoftpediaIconDarkImg,
			className: 'h-6 py-1',
		},
	},
	{
		feedback:
			'The application interface adopts rounded corners in a large area, the fonts and icons are round and cute, and the visual effect is very comfortable.',
		user: 'Apps Worth Watching in the Near Future • SSPAI',
		link: 'https://sspai.com/post/78669',
		// images: {
		// 	light: SoftpediaIconLightImg,
		// 	dark: SoftpediaIconDarkImg,
		// 	className: 'h-6 py-1',
		// },
	},
	{
		feedback: 'Just found the most beautiful music player for Windows: Nora',
		user: 'r/windowapps • Reddit',
		link: 'https://www.reddit.com/r/windowsapps/comments/11xgg99/just_found_the_most_beautiful_music_player_for/',
		images: {
			light: RedditLogoLightImg,
			dark: RedditLogoDarkImg,
			className: 'h-10',
		},
	},
];
// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Feedback = () => {
	const { isDarkMode } = React.useContext(ThemeContext);
	const [visibleFeedbackNumber, setVisibleFeedbackNumber] = React.useState(-1);
	const [isAnimationWorking, setIsAnimationWorking] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(containerRef, {
		threshold: [0.1],
		rootMargin: '5%',
	});

	React.useEffect(() => {
		let intervalId: NodeJS.Timeout | undefined;

		if (isAnimationWorking && isVisible) {
			setVisibleFeedbackNumber(0);

			intervalId = setInterval(
				() =>
					setVisibleFeedbackNumber((prevIndex) => {
						if (prevIndex + 1 >= feedbackList.length) return 0;
						return prevIndex + 1;
					}),
				5000
			);
		} else if (isVisible) {
			clearInterval(intervalId);
			setVisibleFeedbackNumber(0);
		} else {
			clearInterval(intervalId);
			setVisibleFeedbackNumber(-1);
		}

		return () => clearInterval(intervalId);
	}, [isAnimationWorking, isVisible]);

	const visibleFeedbackComponent = React.useMemo(() => {
		return feedbackList.map((x, i) => {
			const { feedback, link, user, images } = x;
			return (
				<FeedbackComponent
					key={i}
					index={i}
					setVisibleFeebackIndex={(val) => setVisibleFeedbackNumber(val)}
					isActive={i === visibleFeedbackNumber}
					feedback={feedback}
					link={link}
					user={user}
					images={images}
				/>
			);
		});
	}, [visibleFeedbackNumber]);

	const navigationDots = React.useMemo(() => {
		return feedbackList.map((_, i) => {
			return (
				<button
					key={i}
					aria-label={`Click to go to feedback ${i + 1}`}
					className={`mr-3 h-3 w-3 rounded-full border-2 border-solid border-font-color bg-transparent transition-[color,border-color,transform] last:mr-0 dark:border-white ${
						i === visibleFeedbackNumber && '!scale-110 !bg-font-color dark:!bg-white'
					}`}
					onClick={() => setVisibleFeedbackNumber(i)}
				/>
			);
		});
	}, [visibleFeedbackNumber]);

	return (
		<div
			className="bg-texture dark:bg-texture-dark mt-12 pb-6 pt-2 shadow-inset-light dark:shadow-inset-dark"
			style={{
				backgroundImage: `url("${isDarkMode ? patternDark : patternLight}")`,
			}}>
			<div className="flex h-[22rem] flex-col items-center justify-center text-center">
				<p className="mb-4 py-2 text-3xl font-medium [text-wrap:balance]">What Users think about Nora</p>
				<div
					className={`grid grid-cols-[repeat(3,100%)] gap-12 overflow-y-scroll px-[25%] pb-6 md:overflow-hidden`}
					ref={containerRef}>
					{visibleFeedbackComponent}
				</div>
			</div>
			<div className="mb-4 mt-4 flex flex-col items-center justify-center">
				<div className="flex items-center justify-center">{navigationDots}</div>
				<button
					className="mt-4 flex w-fit items-center text-sm"
					title={`${isAnimationWorking ? 'Stop' : 'Start'} Animation`}
					onClick={() => setIsAnimationWorking((prevState) => !prevState)}>
					<span className="material-symbols-rounded">
						{isAnimationWorking ? 'motion_photos_paused' : 'slow_motion_video'}
					</span>
				</button>
			</div>
		</div>
	);
};

export default Feedback;
