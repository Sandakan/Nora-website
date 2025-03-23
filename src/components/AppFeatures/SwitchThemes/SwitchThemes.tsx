import React from "react";

import SwitchThemeDarkImg from "../../../assets/images/switch-themes-dark.webp";
import SwitchThemeLightImg from "../../../assets/images/switch-themes-light.webp";
import useOnScreen from "../../../hooks/useOnScreen";

const SwitchThemes = () => {
  const themesContainerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(themesContainerRef, { threshold: [0.8] });

  return (
    <div
      className="relative grid h-[28rem] grid-rows-[1fr_50%] items-center justify-center gap-20 overflow-x-hidden lg:grid-cols-2 lg:grid-rows-none lg:overflow-x-visible 2xl:h-[35rem]"
      ref={themesContainerRef}
    >
      <div
        className={`absolute bottom-0 left-1/2 z-10 h-[16rem] w-[95%] -translate-x-1/2 rounded-3xl bg-foreground-color transition-transform dark:bg-dark-foreground-color lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-[22rem] lg:-translate-y-1/2 lg:translate-x-12 lg:rounded-none lg:!rounded-bl-3xl lg:!rounded-tl-3xl ${
          isVisible && "lg:!translate-x-0"
        }`}
      >
      </div>
      <div
        className={`saying z-10 order-2 mb-8 text-center font-medium transition-transform lg:order-1 lg:mb-0 lg:text-right ${
          isVisible && "lg:-translate-x-8"
        } `}
      >
        <p className="mb-4 text-4xl leading-tight lg:text-5xl">
          Switch between <br /> light and dark <br /> themes
        </p>
        <p className="dark:text-font-white">
          Now, there’s no need to break your <br /> eyes at night
        </p>
      </div>

      <div className="relative order-1 h-full w-full lg:z-20 lg:order-2">
        <img
          className={`absolute  translate-y-4 rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)] transition-transform duration-300 lg:translate-x-12 ${
            isVisible && `lg:!translate-x-16`
          }`}
          src={SwitchThemeLightImg}
          alt="Switch themes light image"
        />
        <img
          className={`absolute translate-y-24 scale-125 rounded-lg shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] transition-transform duration-300 lg:translate-x-8 lg:translate-y-12 lg:scale-105 ${
            isVisible && `lg:!translate-x-0 lg:!translate-y-20`
          }`}
          src={SwitchThemeDarkImg}
          alt="Switch themes dark image"
        />
      </div>
    </div>
  );
};

export default SwitchThemes;
