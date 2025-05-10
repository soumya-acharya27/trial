/**
 * Theme Styles and fonts
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const getTheme = (wp: any, hp: any) => {
  return {
    fontFamily: {
      black:'Gilroy-Black',//900
      light: 'Gilroy-Light', //300
      lightExtra: 'Gilroy-UltraLight', //200
      regular: 'Gilroy-Regular',//400
      medium: 'Gilroy-Medium',//500
      bold: 'Gilroy-Bold',//700
      boldExtra: 'Gilroy-ExtraBold',//800
      boldSemi: 'Gilroy-SemiBold',//600
      thin: 'Gilroy-Thin', //100
      gilroySemiBoldItalic: 'Gilroy-SemiBoldItalic',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      orange: '#F3642A',
      gry:"#F5F5F5",
      darkgray:"#717171",
      bgColor: "#0B1E29",
      green: '#00af45',
      underlineGray: "#717171",
      bottomNavColor:'#243139',
      borderGray: "#404040",
      neworange:"#F15C22"
    },
  };
};

const theme = {
  fontFamily: {
    black:'Gilroy-Black',//900
    light: 'Gilroy-Light', //300
    lightExtra: 'Gilroy-UltraLight', //200
    regular: 'Gilroy-Regular',//400
    medium: 'Gilroy-Medium',//500
    bold: 'Gilroy-Bold',//700
    boldExtra: 'Gilroy-ExtraBold',//800
    boldSemi: 'Gilroy-SemiBold',//600
    thin: 'Gilroy-Thin', //100
    gilroySemiBoldItalic: 'Gilroy-SemiBoldItalic',
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    neviblue:"#0B1E29",
    orange:'#F3642A',
    gray:'#BEBAB9',
    bgColor: "#0B1E29",
    green: '#00af45',
    underlineGray: "#717171",
    bottomNavColor:'#243139',
    borderGray: "#404040",
  },
};
export {theme};
