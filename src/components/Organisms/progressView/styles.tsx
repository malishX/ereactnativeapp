import { StyleSheet, Platform } from 'react-native';
// import { BaseColor, FontFamily, useTheme, useFont } from 'config';

function useStyles() {
    // const { colors } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            
          },
          horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          },
    });
}

export default useStyles;
