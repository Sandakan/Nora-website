import './index.css';
import Header from './components/Header/Header';
import IntroductionBanner from './components/IntroductionBanner/IntroductionBanner';
import React from 'react';
import DownloadPrompt from './components/DownloadPrompt/DownloadPrompt';
import ThemeContext from './contexts/ThemeContext';

function App() {
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	React.useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setIsDarkMode(true);
		} else {
			setIsDarkMode(false);
		}
	}, []);

	const toggleDarkMode = React.useCallback(() => setIsDarkMode((prevState) => !prevState), []);

	return (
		<div
			className={`app ${
				isDarkMode ? 'dark bg-background-color-dark text-font-color-dark' : 'bg-background-color text-font-color'
			}  pb-4`}>
			<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
				<Header />
				<IntroductionBanner />
				<DownloadPrompt />
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
