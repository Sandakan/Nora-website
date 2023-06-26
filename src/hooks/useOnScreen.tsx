import React from 'react';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function useOnScreen(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		//  console.log(ref.current);

		if (prefersReducedMotion) setIsVisible(true);
		else {
			const compRef = ref.current;
			if (compRef === null) return undefined;
			const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), options);

			observer.observe(compRef);

			return () => {
				if (compRef !== null) observer.unobserve(compRef);
			};
		}
	}, [ref, options]);

	return isVisible;
}
