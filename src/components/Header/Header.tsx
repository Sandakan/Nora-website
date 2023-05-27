import React from 'react';

import NoraImg from '../../assets/nora-logo.webp';
import GithubIconLight from '../../assets/github-light.svg';
import GithubIconDark from '../../assets/github-dark.svg';
import ThemeContext from '../../contexts/ThemeContext';

const Header = () => {
	const { isDarkMode, toggleDarkMode } = React.useContext(ThemeContext);
	return (
		<header className="absolute z-10 h-20 w-full rounded-bl-2xl rounded-br-2xl px-4 py-1">
			<nav className="flex h-full items-center justify-between text-font-color dark:text-font-color-dark">
				<div className="logo-and-title-container flex items-center">
					<img className="aspect-square h-12 p-2" src={NoraImg} alt="Nora logo" />
					<span className="text-2xl">Nora</span>
				</div>
				<div className="links-container mr-2 grid grid-flow-col items-center gap-8">
					<a href="#" className="hover:underline">
						Changelog
					</a>
					<a href="#" className="hover:underline">
						Download
					</a>
					<a href="#" className="hover:underline">
						About
					</a>
					<a href="#" className="hover:underline">
						<img
							src={isDarkMode ? GithubIconDark : GithubIconLight}
							alt="Github logo"
							className="aspect-square h-6 !fill-background-color"
						/>
					</a>

					<button
						className="flex"
						onClick={toggleDarkMode}
						title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
						<span className="material-symbols-rounded">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
