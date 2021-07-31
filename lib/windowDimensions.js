import { Dimensions } from "react-native";

export const windowDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
export const screenDimensions = {
    with: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
}