import { StyleSheet } from "react-native";
import { Sizes } from "../../environment/sizes";

const styles = StyleSheet.create({
    image:{
        width: Sizes.normalize(100),
        height: Sizes.normalize(100),
        borderRadius: Sizes.normalize(50)
    }
});

export default styles;