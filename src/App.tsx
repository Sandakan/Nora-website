import React from 'react';
import { Changelog } from './@types/app';
import './index.css';
import { appInfo } from '../package.json';

import ReleaseNotesContext from './contexts/ReleaseNotesContext';
import ThemeContext from './contexts/ThemeContext';

import Header from './components/Header/Header';
import IntroductionBanner from './components/IntroductionBanner/IntroductionBanner';
import DownloadPrompt from './components/DownloadPrompt/DownloadPrompt';
import SwitchThemes from './components/AppFeatures/SwitchThemes/SwitchThemes';
import CodecSupport from './components/AppFeatures/CodecSupport/CodecSupport';
import EditMetadata from './components/AppFeatures/EditMetadata/EditMetadata';
import LyricsSupport from './components/AppFeatures/LyricsSupport/LyricsSupport';
import Suggestions from './components/AppFeatures/Suggestions/Suggestions';
import AppInterface from './components/AppFeatures/AppInterface/AppInterface';
import Feedback from './components/Feedback/Feedback';
import Footer from './components/Footer/Footer';

function App() {
	const [isDarkMode, setIsDarkMode] = React.useState(false);
	const [releaseNotes, setReleaseNotes] = React.useState<Changelog>();

	const updateTheme = React.useCallback((theme?: 'dark' | 'light') => {
		setIsDarkMode((prevState) => {
			let darkMode = !prevState;

			if (theme) {
				darkMode = theme === 'dark';
			}
			localStorage.theme = darkMode ? 'dark' : 'light';
			return darkMode;
		});
	}, []);

	React.useEffect(() => {
		const doesUserPreferDarkMode =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

		if (doesUserPreferDarkMode) updateTheme('dark');
		else updateTheme('light');
	}, [updateTheme]);

	React.useEffect(() => {
		fetch(appInfo.release_notes_url)
			.then((res) => {
				if (res.ok) return res.json();
				throw Error(res.statusText);
			})
			.then((res) => setReleaseNotes(res))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div
			className={`app overflow-x-hidden ${
				isDarkMode ? 'dark bg-dark-background-color text-dark-font-color' : 'bg-background-color text-font-color'
			}`}>
			<ThemeContext.Provider value={{ isDarkMode, updateTheme }}>
				<Header />
				<IntroductionBanner />
				<div className="features relative mx-auto grid max-w-[100rem] grid-flow-row gap-12 lg:overflow-visible">
					<ReleaseNotesContext.Provider value={releaseNotes}>
						<DownloadPrompt />
					</ReleaseNotesContext.Provider>
					<SwitchThemes />
					<CodecSupport />
					<EditMetadata />
					<LyricsSupport />
					<Suggestions />
					<AppInterface />
				</div>
				<Feedback />
				<Footer />
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
