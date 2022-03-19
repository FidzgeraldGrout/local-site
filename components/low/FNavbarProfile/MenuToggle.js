import {
  animate,
  motion,
  MotionValue,
  useCycle,
  useMotionValue
} from "framer-motion";
import * as React from "react";
import { interpolate } from "flubber";
import { HomeIcon } from '@heroicons/react/solid';

const pathA = {
  open: "M 9 9 L 10 8.586 l 4.293 -4.293 a 1 1 0 1 1 1.414 1.414 L 11.414 10 l -0.414 1 L 10 11.414 l -4.293 4.293 a 1 1 0 0 1 -1.414 -1.414 L 8.586 10 z M 4.293 4.293 a 1 1 0 0 1 1.414 0 L 10 8.586 l 1 0.414 L 11.414 10 l 4.293 4.293 a 1 1 0 0 1 -1.414 1.414 L 10 11.414 l -1 -0.414 L 8.586 10 L 4.293 5.707 a 1 1 0 0 1 0 -1.414 z",
  closed: "M 10 9 z m -7 9 a 7 7 0 1 1 14 0 H 3 z"
};

const pathB = {
  open: "M 9 9 L 10 8.586 l 4.293 -4.293 a 1 1 0 1 1 1.414 1.414 L 11.414 10 l -0.414 1 L 10 11.414 l -4.293 4.293 a 1 1 0 0 1 -1.414 -1.414 L 8.586 10 z M 4.293 4.293 a 1 1 0 0 1 1.414 0 L 10 8.586 l 1 0.414 L 11.414 10 l 4.293 4.293 a 1 1 0 0 1 -1.414 1.414 L 10 11.414 l -1 -0.414 L 8.586 10 L 4.293 5.707 a 1 1 0 0 1 0 -1.414 z",
  closed: "M 10 9 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6"
};

// const pathA = {
//   open: "M 9 9 L 10 8.586 l 4.293 -4.293 a 1 1 0 1 1 1.414 1.414 L 11.414 10 l -0.414 1 L 10 11.414 l -4.293 4.293 a 1 1 0 0 1 -1.414 -1.414 L 8.586 10 z",
//   closed: "M 10 9 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6"
// };

// const pathB = {
//   open: "M 4.293 4.293 a 1 1 0 0 1 1.414 0 L 10 8.586 l 1 0.414 L 11.414 10 l 4.293 4.293 a 1 1 0 0 1 -1.414 1.414 L 10 11.414 l -1 -0.414 L 8.586 10 L 4.293 5.707 a 1 1 0 0 1 0 -1.414 z",
//   closed: "M 16 16 v -3 a 4 4 0 0 0 -4 -3 H 8 a 4 4 0 0 0 -4 3 v 3"
// };

{/* 

<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg> 

<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
</svg>
*/}

function useSVGMorph( d, config = {} ) {
  const value = useMotionValue(d);

  React.useEffect(() => {
    const interpolator = interpolate(value.get(), d);

    animate(0, 1, {
      ...config,
      onUpdate: (progress) => value.set(interpolator(progress))
    });
  }, [config, d, value]);

  return value;
}

export function MenuToggle({ toggle }) {

  const [shape, cycleShape] = useCycle( "open", "closed" );

  const svgA = useSVGMorph(pathA[shape], {
    duration: 0.5,
    maxSegmentLength: 0.1
  });

  const svgB = useSVGMorph(pathB[shape], {
    duration: 0.5
  });

  return (
    <button
      className="flex"
      // bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={()=>{ toggle(); cycleShape(); }}
    >
    <HomeIcon className="h-8 w-8 block md:hidden fill-color_C" />
      <svg
        className="h-8 w-8 
        fill-color_C"
        viewBox="1 1 19 19"
        >
        <motion.path d={svgA} />
        <motion.path d={svgB} />
      </svg>
    </button>
  )
}
