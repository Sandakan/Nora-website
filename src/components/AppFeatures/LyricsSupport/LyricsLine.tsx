import React from "react";

type Props = { line: string; isActive: boolean; index: number };

const LyricsLine = (props: Props) => {
  const { line, isActive, index } = props;
  const lineRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (isActive && lineRef.current) {
      lineRef.current.scroll({ behavior: "smooth", top: index + 50 });
    }
  }, [index, isActive]);

  return (
    <span
      className={`mb-1 md:mb-4 ${
        isActive && "scale-75 opacity-25"
      } transition-[transform,scale]`}
      ref={lineRef}
    >
      {line}
    </span>
  );
};

export default LyricsLine;
