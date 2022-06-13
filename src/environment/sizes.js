import { Dimensions, PixelRatio } from "react-native";

const MIN_HEIGHT = 1024;
const { width, height } = Dimensions.get("window");
const SCALE = width / 834;

const normalize = (actualSize) => {
  const actualRatio = PixelRatio.get();

  if (height < MIN_HEIGHT) {
    return PixelRatio.roundToNearestPixel(
      (actualSize * SCALE) / (actualRatio / 1.8)
    );
  }

  return PixelRatio.roundToNearestPixel(actualSize * SCALE);
};

export const Sizes = {
  windowHeight: height,
  windowWidth: width,
  normalize,
};
