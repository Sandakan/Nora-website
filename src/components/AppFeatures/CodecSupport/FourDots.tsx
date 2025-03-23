const FourDots = () => {
  return (
    <div className="my-4 grid animate-spin-fast grid-cols-2 grid-rows-2 gap-1 transition-transform">
      <span className="!h-2 !w-2 rounded-full bg-font-color/75 dark:bg-foreground-color/75">
      </span>
      <span className="!h-2 !w-2 rounded-full bg-font-color/75 dark:bg-foreground-color/75">
      </span>
      <span className="!h-2 !w-2 rounded-full bg-font-color/75 dark:bg-foreground-color/75 ">
      </span>
      <span className="!h-2 !w-2 rounded-full bg-font-color/75 dark:bg-foreground-color/75 ">
      </span>
    </div>
  );
};

export default FourDots;
