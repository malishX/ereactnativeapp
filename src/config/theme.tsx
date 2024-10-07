// // import { useSelector } from "react-redux";

import { useSelector } from "react-redux";

// export const BaseColor = {
//   grayColor: "#9B9B9B",
//   dividerColor: "#BDBDBD",
//   whiteColor: "#FFFFFF",
//   fieldColor: "#F5F5F5",
//   yellowColor: "#FDC60A",
//   navyBlue: "#3C5A99",
//   kashmir: "#5D6D7E",
//   purpleColor: "#895BAF",
//   blueColor: "#5DADE2",
//   pinkColor: "#A569BD",
//   greenColor: "#58D68D",
//   blackColor: "#000",
//   darkGrayColor: "#465B7A",
//   textInputGrayColor: '#E2E2E2'
// };

// export const ThemeSupport = [
//   {
//     theme: "purple",
//     light: {
//       dark: false,
//       colors: {
//         primary: "#895BAF",
//         primaryDark: "#C31C0D",
//         primaryLight: "#FF8A65",
//         accent: "#4A90A4",
//         background: "white",
//         card: "#F5F5F5",
//         text: "#FFFFFF",
//         border: "#FFFFFF",
//         shadow: "#000",
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: "#895BAF",
//         primaryDark: "#C31C0D",
//         primaryLight: "#FF8A65",
//         accent: "#4A90A4",
//         background: "#010101",
//         card: "#121212",
//         text: "#e5e5e7",
//         border: "#272729",
//         shadow: "#FFFF",
//       },
//     },
//   },
//   {
//     theme: "pink",
//     light: {
//       dark: false,
//       colors: {
//         primary: "#A569BD",
//         primaryDark: "#C2185B",
//         primaryLight: "#F8BBD0",
//         accent: "#8BC34A",
//         background: "white",
//         card: "#F5F5F5",
//         text: "#212121",
//         border: "#FFFFFF",
//         shadow: "#000",
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: "#A569BD",
//         primaryDark: "#C2185B",
//         primaryLight: "#F8BBD0",
//         accent: "#8BC34A",
//         background: "#010101",
//         card: "#121212",
//         text: "#e5e5e7",
//         border: "#272729",
//         shadow: "#FFFF",
//       },
//     },
//   },
//   {
//     theme: "blue",
//     light: {
//       dark: false,
//       colors: {
//         primary: "#5DADE2",
//         primaryDark: "#1281ac",
//         primaryLight: "#68c9ef",
//         accent: "#FF8A65",
//         background: "white",
//         card: "#F5F5F5",
//         text: "#212121",
//         border: "#FFFFFF",
//         shadow: "#000",
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: "#5DADE2",
//         primaryDark: "#1281ac",
//         primaryLight: "#68c9ef",
//         accent: "#FF8A65",
//         background: "#010101",
//         card: "#121212",
//         text: "#e5e5e7",
//         border: "#272729",
//         shadow: "#FFFF",
//       },
//     },
//   },
//   {
//     theme: "green",
//     light: {
//       dark: false,
//       colors: {
//         primary: "#58D68D",
//         primaryDark: "#388E3C",
//         primaryLight: "#C8E6C9",
//         accent: "#607D8B",
//         background: "white",
//         card: "#F5F5F5",
//         text: "#212121",
//         border: "#FFFFFF",
//         shadow: "#000",
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: "#58D68D",
//         primaryDark: "#388E3C",
//         primaryLight: "#C8E6C9",
//         accent: "#607D8B",
//         background: "#010101",
//         card: "#121212",
//         text: "#e5e5e7",
//         border: "#272729",
//         shadow: "#FFFF",
//       },
//     },
//   },
//   {
//     theme: "yellow",
//     light: {
//       dark: false,
//       colors: {
//         primary: "#FDC60A",
//         primaryDark: "#FFA000",
//         primaryLight: "#FFECB3",
//         accent: "#795548",
//         background: "white",
//         card: "#F5F5F5",
//         text: "#212121",
//         border: "#FFFFFF",
//         shadow: "#000",
//       },
//     },
//     dark: {
//       dark: true,
//       colors: {
//         primary: "#FDC60A",
//         primaryDark: "#FFA000",
//         primaryLight: "#FFECB3",
//         accent: "#795548",
//         background: "#010101",
//         card: "#121212",
//         text: "#e5e5e7",
//         border: "#272729",
//         shadow: "#FFFF",
//       },
//     },
//   },
// ];

// export const DefaultTheme = {
//   theme: "purple",
//   light: {
//     dark: false,
//     colors: {
//       primary: "#314ff4",
//       primaryDark: "#003792",
//       primaryLight: "#FF8A65",
//       accent: "#4A90A4",
//       background: "#F4F6F9",
//       card: "#F5F5F5",
//       text: "#212121",
//       border: "#FFFFFF",
//       shadow: "#003F9C",
//       inputField: "#D4DDE9",
//       continueText: "#7E7E7E",
//       dividerColor: "#DFDFDF",
//       progressViewBackground: "#00000044",
//       declinetButton: "#EE5656",
//     },
//   },
//   dark: {
//     dark: true,
//     colors: {
//       primary: "#314ff4",
//       primaryDark: "#003792",
//       primaryLight: "#FF8A65",
//       accent: "#4A90A4",
//       background: "#F4F6F9",
//       card: "#121212",
//       text: "#e5e5e7",
//       border: "#272729",
//       shadow: "#FFFF",
//       inputField: "#D4DDE9",
//       continueText: "#7E7E7E",
//       dividerColor: "#DFDFDF",
//       progressViewBackground: "#00000044",
//       declinetButton: "#EE5656",
//     },
//   },
// };

// export const useTheme = () => {
//   // const isDarkMode = useDarkMode();
//   const isDarkMode = false; // useDarkMode();
//   // const forceDark = useSelector((state: any) => state.application.force_dark);
//   // const themeStorage = useSelector((state: any) => state.application.theme);
//   // const listTheme = ThemeSupport.filter((item) => item.theme == themeStorage);
//   // const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;
//   const theme = DefaultTheme;
//   // if (forceDark) {
//   //   return { theme: theme.dark, colors: theme.dark.colors };
//   // }
//   // if (forceDark == false) {
//   //   return { theme: theme.light, colors: theme.light.colors };
//   // }
//   return isDarkMode
//     ? { theme: theme.dark, colors: theme.dark.colors }
//     : { theme: theme.light, colors: theme.light.colors };
// };

// export const FontSupport = ["Poppins", "Raleway"];

// /**
//  * Define font default use for whole application
//  */
// export const DefaultFont = "Poppins";

// interface RootState {
//   application: any;
// }
// // export const useFont = () => {
// //   // const selectedFont = (state: RootState) => state.application.font;
// //   const font = useSelector((state: RootState) => state.application.font);
// //   return font ?? DefaultFont;
// // };

export const BaseColor = {
  textGrayColor: "#5C5858",
  grayBorderColor: "#C9C9C9",
  // grayColor: "#9B9B9B",
  dividerColor: "#BDBDBD",
  whiteColor: "#FFFFFF",
  fieldColor: "#F5F5F5",
  yellowColor: "#F8CA46",
  navyBlue: "#3C5A99",
  kashmir: "#5D6D7E",
  purpleColor: "#7146A2",
  blueColor: "#5DADE2",
  pinkColor: "#A569BD",
  greenColor: "#58D68D",
  blackColor: "#000",
  darkGrayColor: "#465B7A",
  grayColor: "#DDDDDD",
  darkYellowColor: "#C07600",
  textInputGrayColor: "#E2E2E2",
  backGroundColor: "#f5f5f5",
};

export const ThemeSupport = [
  {
    theme: "purple",
    light: {
      dark: false,
      colors: {
        primary: "#895BAF",
        primaryDark: "#C31C0D",
        primaryLight: "#FF8A65",
        accent: "#4A90A4",
        background: "white",
        card: "#F5F5F5",
        text: "#FFFFFF",
        border: "#FFFFFF",
        shadow: "#000",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#895BAF",
        primaryDark: "#C31C0D",
        primaryLight: "#FF8A65",
        accent: "#4A90A4",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
        shadow: "#FFFF",
        basketHeaderColor: "#c9c9c9",
        basketFooterColor: "#E2DAEC",
      },
    },
  },
  {
    theme: "pink",
    light: {
      dark: false,
      colors: {
        primary: "#A569BD",
        primaryDark: "#C2185B",
        primaryLight: "#F8BBD0",
        accent: "#8BC34A",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#FFFFFF",
        shadow: "#000",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#A569BD",
        primaryDark: "#C2185B",
        primaryLight: "#F8BBD0",
        accent: "#8BC34A",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
        shadow: "#FFFF",
      },
    },
  },
  {
    theme: "blue",
    light: {
      dark: false,
      colors: {
        primary: "#5DADE2",
        primaryDark: "#1281ac",
        primaryLight: "#68c9ef",
        accent: "#FF8A65",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#FFFFFF",
        shadow: "#000",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#5DADE2",
        primaryDark: "#1281ac",
        primaryLight: "#68c9ef",
        accent: "#FF8A65",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
        shadow: "#FFFF",
      },
    },
  },
  {
    theme: "green",
    light: {
      dark: false,
      colors: {
        primary: "#58D68D",
        primaryDark: "#388E3C",
        primaryLight: "#C8E6C9",
        accent: "#607D8B",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#FFFFFF",
        shadow: "#000",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#58D68D",
        primaryDark: "#388E3C",
        primaryLight: "#C8E6C9",
        accent: "#607D8B",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
        shadow: "#FFFF",
      },
    },
  },
  {
    theme: "yellow",
    light: {
      dark: false,
      colors: {
        primary: "#FDC60A",
        primaryDark: "#FFA000",
        primaryLight: "#FFECB3",
        accent: "#795548",
        background: "white",
        card: "#F5F5F5",
        text: "#212121",
        border: "#FFFFFF",
        shadow: "#000",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#FDC60A",
        primaryDark: "#FFA000",
        primaryLight: "#FFECB3",
        accent: "#795548",
        background: "#010101",
        card: "#121212",
        text: "#e5e5e7",
        border: "#272729",
        shadow: "#FFFF",
      },
    },
  },
];

export const useTheme = () => {
  const selectedTheme = ThemeSupport[0];
  return { theme: selectedTheme.theme, colors: selectedTheme.dark.colors };
};
export const FontSupport = ["Metropolis", "Raleway"];

/**
 * Define font default use for whole application
 */
export const DefaultFont = "Metropolis";

interface RootState {
  application: any;
}
export const useFont = () => {
  // const selectedFont = (state: RootState) => state.application.font;
  // const font = useSelector((state: RootState) => state.application.font);
  return DefaultFont;
};
