import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
interface ImageData {
  height: number;
  width: number;
  color: string;
}
function SvgComponent(props: ImageData) {
  const { height, width, color } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 186 186">
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#ffa733" />
          <Stop offset={1} stopColor={color} />
        </LinearGradient>
      </Defs>
      <G>
        <Path
          d="M24.407 0h47.186A24.407 24.407 0 0196 24.407v47.186A24.407 24.407 0 0171.593 96H24.407A24.407 24.407 0 010 71.593V24.407A24.407 24.407 0 0124.407 0z"
          transform="translate(45 29)"
          fill="url(#prefix__b)"
        />
      </G>
      <Path
        d="M127.481 44.634a223.264 223.264 0 00-17.769 24.712c-5.4 8.406-9.619 17.322-11.627 27.176-.383 1.881-.64 3.79-.889 5.695-.07.538-.255.661-.751.659q-4.817-.023-9.635 0c-.717 0-.944-.186-.643-.936a136.208 136.208 0 0111.715-22.37 170.02 170.02 0 0117.392-22.823c1.92-2.12 5.936-6.992 5.936-6.992s-3.42 2.527-4.961 3.72a155.3 155.3 0 00-13.463 12.346 114.577 114.577 0 00-18.693 23.778c-.528.9-1.039 1.814-1.563 2.718-.027.048-.1.066-.261.159-.718-1.933-1.444-3.839-2.135-5.758-1.2-3.33-2.371-6.671-3.569-10-2.11-5.867-4.242-11.725-6.328-17.6-.2-.561-.63-1.012-.668-1.649-.026-.432.048-.6.517-.6q5.173.022 10.346 0c.587 0 .618.41.751.775q3.419 9.359 6.835 18.719c.09.246.185.491.319.847a84.272 84.272 0 016.15-7.457 134.034 134.034 0 0117.817-15.993 157.224 157.224 0 0110.287-7.247 153.17 153.17 0 014.129-2.584c1.392-.718 2.643-1.651.761.705z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
