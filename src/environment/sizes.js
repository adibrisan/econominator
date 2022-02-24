import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const MIN_HEIGHT = 1024;
const SCALE = width / 834;

const normalize = (size) => {
  const ratio = PixelRatio.get();

  if (height < MIN_HEIGHT) {
    return PixelRatio.roundToNearestPixel((size * SCALE) / (ratio / 1.8));
  }

  return PixelRatio.roundToNearestPixel(size * SCALE);
};

export const Sizes = {
  contentPadding: normalize(20),
  windowHeight: height,
  windowWidth: width,
  normalize,
};
