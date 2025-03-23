import React from "react";
import ThemeContext from "../../contexts/ThemeContext";

import NoraImg from "../../assets/images/nora-logo.webp";
import GithubIconWhite from "../../assets/images/github-white.svg";
import GithubIconBlack from "../../assets/images/github-black.svg";
import DiscordIconWhite from "../../assets/images/discord-white.svg";
import DiscordIconBlack from "../../assets/images/discord-black.svg";

const Footer = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <footer
      id="footer"
      className="relative -translate-y-4 rounded-tl-3xl rounded-tr-3xl bg-background-color p-2 shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.10)] dark:bg-dark-background-color"
    >
      <div className="footer-description mb-4 py-8">
        <div className="mx-auto grid w-full max-w-[40rem] grid-cols-2 gap-8 px-6 md:w-4/5 md:px-0 lg:max-w-[55rem]">
          <div className="mb-8 ml-auto max-w-[16rem] lg:max-w-[30rem]">
            <p className="text-right text-2xl font-medium leading-snug shadow-foreground-color drop-shadow-xl lg:text-5xl">
              Enjoy your music library without any hassle
            </p>
          </div>
          <div className="flex max-w-[25rem] flex-col items-start justify-end text-left text-xs lg:text-base">
            <img
              className="mb-4 h-12 w-12 rounded-md shadow-[0px_5px_30px_0px_rgba(0,0,0,0.25)] shadow-foreground-color dark:shadow-dark-foreground-color"
              src={NoraImg}
              alt="Nora logo"
            />
            <p className="mb-2 drop-shadow-xl">
              Nora is an elegant music player built using Electron and React.
            </p>
            <p className="drop-shadow-xl">
              Inspired from{" "}
              <a
                className="hover:underline"
                href="https://play.google.com/store/apps/details?id=com.piyush.music&gl=u"
              >
                Oto Music for Android
              </a>{" "}
              by Piyush Mamidwar.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-footer relative bottom-0 flex flex-col items-center justify-center px-2 text-black dark:text-white lg:flex-row lg:justify-between">
        <div className="order-2 text-center text-xs lg:text-left">
          <p className="mb-[0.1rem]">
            Copyright © 2023{" "}
            <a href="https://github.com/Sandakan" className="underline">
              Sandakan Nipunajith
            </a>
            .
          </p>
          <p>
            Built with <span className="text-red-500">❤</span>{" "}
            by Sandakan and many other contributors.
          </p>
        </div>
        <div className="order-1 flex lg:order-2">
          <a
            href="https://discord.gg/c5rGKnBs4y"
            target="_blank"
            rel="noreferrer"
            className="mr-6 hover:underline"
          >
            <img
              src={isDarkMode ? DiscordIconWhite : DiscordIconBlack}
              alt="Discord logo"
              className="aspect-square h-5 !fill-background-color opacity-75"
            />
          </a>
          <a
            href="https://github.com/Sandakan/Nora"
            target="_blank"
            rel="noreferrer"
            className="mr-0 hover:underline lg:mr-4"
          >
            <img
              src={isDarkMode ? GithubIconWhite : GithubIconBlack}
              alt="Github logo"
              className="aspect-square h-5 !fill-background-color opacity-75"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
