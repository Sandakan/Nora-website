import React from "react";
import { appInfo } from "../../../package.json";

import NoraImg from "../../assets/images/nora-logo.webp";
import GithubIconLight from "../../assets/images/github-light.svg";
import GithubIconDark from "../../assets/images/github-dark.svg";
import ThemeContext from "../../contexts/ThemeContext";

const Header = () => {
  const { isDarkMode, updateTheme } = React.useContext(ThemeContext);
  return (
    <header className="absolute z-10 h-20 w-full rounded-bl-2xl rounded-br-2xl px-8 pt-8 sm:px-4 sm:py-1">
      <nav className="flex h-full items-center justify-end text-font-color dark:text-dark-font-color sm:justify-between">
        <a
          href="/"
          className="logo-and-title-container order-2 flex items-center sm:order-1"
        >
          <img
            className="aspect-square h-16 rounded-md p-0 sm:h-12 sm:rounded-sm sm:p-2"
            src={NoraImg}
            alt="Nora logo"
          />
          <span className="hidden text-2xl sm:inline">Nora</span>
        </a>
        <div className="links-container order-1 mr-2 hidden grid-flow-col items-center gap-8 sm:order-2 sm:grid">
          <a
            href={appInfo.changelog_url}
            className="hidden hover:underline md:block"
            title="Nora's Changelog"
          >
            Changelog
          </a>
          <a href="#downloadPrompt" className="hidden hover:underline md:block">
            Download
          </a>
          <a href="#footer" className="hidden hover:underline md:block">
            About
          </a>
          <a
            href="https://github.com/Sandakan/Nora"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            title="Nora's Github Repository"
          >
            <img
              src={isDarkMode ? GithubIconDark : GithubIconLight}
              alt="Github logo"
              className="aspect-square h-6 !fill-background-color"
            />
          </a>

          <button
            className="flex"
            onClick={() => updateTheme()}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-rounded">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
