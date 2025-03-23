import React, { useCallback, useEffect } from 'react';
import UAParser from 'ua-parser-js';
import ThemeContext from '../../contexts/ThemeContext.tsx';
import packageJson from '../../../package.json' with { type: 'json' };

import ReleaseNotesContext from '../../contexts/ReleaseNotesContext.tsx';
import patternLight from '../../assets/images/pattern-light.svg';
import patternDark from '../../assets/images/pattern-dark.svg';
import { fetchLatestRelease, selectAssetForCurrentSystem } from '../../utils/getLatestReleaseForCurrentSystem.ts';
import { faApple, faGithub, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const parser = new UAParser();
const currentOs = parser.getOS().name;
const currentArch = parser.getCPU().architecture;

const DownloadPrompt = () => {
	const { isDarkMode } = React.useContext(ThemeContext);
	const releaseNotes = React.useContext(ReleaseNotesContext);

	const [assets, setAssets] = React.useState<ReturnType<typeof selectAssetForCurrentSystem>>();

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

	useEffect(() => {
		fetchLatestRelease().then((data) => {
			if (data && currentOs && currentArch) {
				const asset = selectAssetForCurrentSystem(data, currentOs, currentArch);

				if (asset) setAssets(asset);
			}
			return null;
		});
	}, []);

	// const downloadUrl = useMemo(() => {
	//   if (asset) {
	//     if(Array.isArray(asset)) return asset[0]?.download_url
	//     return asset.metadata?.download_url;
	//   }
	//   return undefined;
	// },[])

	const osIcon = useCallback((os: string) => {
		switch (os) {
			case 'win':
				return faWindows;
			case 'linux':
				return faLinux;
			case 'mac':
				return faApple;
			default:
				return undefined;
		}
	}, []);

	return (
		<>
			{releaseNotes && (
				<div
					id="downloadPrompt"
					className="outline-3 mx-auto mb-12 flex w-[95%] max-w-[2048px] flex-col items-center justify-center rounded-xl p-4 text-center shadow-lg outline outline-foreground-color dark:outline-dark-foreground-color"
					style={{
						backgroundImage: `url("${isDarkMode ? patternDark : patternLight}")`,
					}}>
					<p className="font-medium text-font-color-2 dark:text-dark-font-color-2">
						<span className="text-font-color dark:text-font-white">v{latestVersion?.version}</span> is out now!
					</p>
					<p className="text-center text-3xl font-medium dark:text-font-white">
						With support for <span className="text-font-color-2 dark:text-dark-font-color-2">Windows</span>,{' '}
						<span className="text-font-color-2 dark:text-dark-font-color-2">Linux</span>
						<sup className="">1</sup> and <span className="text-font-color-2 dark:text-dark-font-color-2">macOS</span>
					</p>

					<p className="mt-2 text-xs">
						Operating System: {currentOs} | Architecture: {currentArch}
					</p>

					<div className="download-buttons-container mt-2 flex items-center justify-center gap-2">
						{Array.isArray(assets) ? (
							assets.map((asset) => {
								const icon = osIcon(asset.os);

								return (
									<a
										href={asset.download_url}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-2 flex items-center rounded-full border-2 border-solid border-[#fff] bg-foreground-color px-8 py-2 text-lg font-medium transition-colors hover:border-foreground-color dark:border-dark-foreground-color dark:text-font-color dark:hover:border-foreground-color">
										{icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
										Download for {asset.os}
									</a>
								);
							})
						) : (
							<a
								href={packageJson.appInfo.nora_releases_url}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-2 flex items-center rounded-full border-2 border-solid border-[#fff] bg-foreground-color px-8 py-2 text-lg font-medium transition-colors hover:border-foreground-color dark:border-dark-foreground-color dark:text-font-color dark:hover:border-foreground-color">
								<FontAwesomeIcon icon={faGithub} className="mr-2" />
								Download from Github
							</a>
						)}
					</div>

					<p className="mt-2 text-xs">Clicking Download Now will redirect you to Nora's Github Releases Page.</p>

					<p className="text-xs">
						Visit{' '}
						<a
							href={packageJson.appInfo.changelog_url}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
							title="Nora's Changelog">
							Changelog
						</a>{' '}
						to see what's changed in this release.
					</p>
				</div>
			)}
		</>
	);
};

export default DownloadPrompt;
