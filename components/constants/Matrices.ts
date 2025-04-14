import { Dimensions, Platform } from "react-native";
 
export const { width, height } = Dimensions.get("window");
 
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
 
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
 
export { horizontalScale, verticalScale, moderateScale };


export const isPlatformAndroid = () => {
  return Platform.OS == "android"
}

export const isPlatformIos = () => {
  return Platform.OS == "ios"
}

export const isPlatformWeb = () => {
  return Platform.OS == "web"
}