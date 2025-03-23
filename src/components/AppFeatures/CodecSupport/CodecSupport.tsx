import React from "react";
import ThemeContext from "../../../contexts/ThemeContext";

// import FourDots from './FourDots';
import TripleDots from "./TripleDots";
import patternLight from "../../../assets/images/pattern-light.svg";
import patternDark from "../../../assets/images/pattern-dark.svg";

const CodecSupport = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div
      className="mx-auto grid h-[22.5rem] w-[95%] grid-rows-3 gap-12 overflow-hidden rounded-3xl  py-4 shadow-inset-light dark:shadow-inset-dark md:grid-cols-3 md:grid-rows-none md:px-8"
      style={{
        backgroundImage: `url("${isDarkMode ? patternDark : patternLight}")`,
      }}
    >
      <div className="flac-group flex items-center justify-center md:flex-col">
        <span className="text-4xl font-medium drop-shadow-xl">MP3</span>
        <TripleDots />
        <span className="text-6xl font-semibold drop-shadow-xl md:text-8xl">
          FLAC
        </span>
        <TripleDots />
        <span className="text-4xl font-medium drop-shadow-xl">M4R</span>
      </div>
      <div className="saying-group flex flex-col items-center justify-center text-center">
        {/* <FourDots /> */}
        <p className="mt-4 rounded-full bg-foreground-color px-8 py-4 text-3xl font-medium dark:bg-foreground-color dark:text-font-color md:px-12 md:py-6 md:text-4xl">
          Supports
        </p>
        <p className="mt-2 px-2 dark:text-font-white">
          Support for lossless audio through FLAC and WAV.
        </p>
      </div>
      <div className="wav-group flex items-center justify-center md:flex-col">
        <span className="text-4xl font-medium drop-shadow-xl">AAC</span>
        <TripleDots />
        <span className="text-6xl font-semibold drop-shadow-xl md:text-8xl">
          WAV
        </span>
        <TripleDots />
        <span className="text-4xl font-medium drop-shadow-xl">OGG</span>
      </div>
    </div>
  );
};

export default CodecSupport;
