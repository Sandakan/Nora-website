import React from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import { appInfo } from '../../../package.json';

import ReleaseNotesContext from '../../contexts/ReleaseNotesContext';
// import { getVersionInfo } from '../../utils/getVersionInfo';
import patternLight from '../../assets/images/pattern-light.svg';
import patternDark from '../../assets/images/pattern-dark.svg';

const DownloadPrompt = () => {
	const { isDarkMode } = React.useContext(ThemeContext);
	const releaseNotes = React.useContext(ReleaseNotesContext);
	const latestVersion = React.useMemo(() => {
		if (releaseNotes?.versions) {
			const sortedVersions = releaseNotes.versions.sort((a, b) => {
				const timeOfA = new Date(a.releaseDate).getTime;
				const timeOfB = new Date(b.releaseDate).getTime;

				if (timeOfA > timeOfB) return 1;
				if (timeOfB > timeOfA) return -1;
				return 0;
			});

			return sortedVersions[0];
		}
		return undefined;
	}, [releaseNotes?.versions]);

	return (
		<>
			{releaseNotes && (
				<div
					id="downloadPrompt"
					className="outline-3 mx-auto mb-12 flex w-[95%] max-w-[2048px] flex-col items-center justify-center rounded-xl p-4 text-center shadow-lg outline outline-foreground-color dark:outline-dark-foreground-color"
					style={{ backgroundImage: `url("${isDarkMode ? patternDark : patternLight}")` }}>
					<p className="font-medium text-font-color-2 dark:text-dark-font-color-2">
						<span className="text-font-color dark:text-font-white">v{latestVersion?.version}</span> is out now!
					</p>
					<p className="text-center text-3xl font-medium dark:text-font-white">
						With support for <span className="text-font-color-2 dark:text-dark-font-color-2">Windows</span> and{' '}
						<span className="text-font-color-2 dark:text-dark-font-color-2">Linux</span>
						<sup className="">1</sup>
					</p>

					<a
						href={appInfo.nora_releases_url}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-2 rounded-full border-2 border-solid border-[#fff] bg-foreground-color px-8 py-2 text-lg font-medium transition-colors hover:border-foreground-color dark:border-dark-foreground-color dark:text-font-color dark:hover:border-foreground-color">
						Download Now
					</a>
					<p className="mt-2 text-xs">Clicking Download Now will redirect you to Nora’s Github Releases Page.</p>
					<p className="text-xs">
						Visit{' '}
						<a
							href={appInfo.changelog_url}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
							title="Nora's Changelog">
							Changelog
						</a>{' '}
						to see what’s changed in this release.
					</p>
				</div>
			)}
		</>
	);
};

export default DownloadPrompt;
