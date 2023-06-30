import React from 'react';
import ThemeContext from '../../contexts/ThemeContext';

type Props = {
	feedback: string;
	link: string;
	user: string;
	isActive: boolean;
	images?: { light: string; dark: string; className: string };
	index: number;
	setVisibleFeebackIndex: (value: number) => void;
};

const FeedbackComponent = (props: Props) => {
	const { isDarkMode } = React.useContext(ThemeContext);
	const { feedback, link, user, isActive, images, index, setVisibleFeebackIndex } = props;

	const feedbackComponentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (isActive && feedbackComponentRef.current)
			feedbackComponentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}, [isActive]);

	return (
		<div
			className={`mx-auto flex min-h-[10rem] w-[60%] min-w-[12rem] max-w-[50rem] scale-75 cursor-pointer flex-col items-center justify-center rounded-xl bg-background-color px-10 py-2 opacity-75 shadow-xl transition-[opacity,transform,filter] dark:bg-dark-background-color sm:min-h-[14rem] sm:w-[70%] sm:px-12 sm:py-8 md:w-[90%] md:py-12 lg:min-h-[15rem] ${
				isActive && '!scale-100 !opacity-100'
			} `}
			onClick={() => setVisibleFeebackIndex(index)}
			ref={feedbackComponentRef}>
			<q className="text-base dark:text-white sm:text-xl md:text-2xl"> {feedback} </q>
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="mt-4 flex flex-col items-center text-sm underline opacity-80 md:text-base">
				{user}
				{images && (
					<img src={isDarkMode ? images.dark : images.light} className={`hidden sm:block ${images.className}`} alt="" />
				)}
			</a>
		</div>
	);
};

export default FeedbackComponent;
