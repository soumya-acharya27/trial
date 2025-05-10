import { View } from "react-native";
import { styles } from './styles'



export interface LineSignUpComponentProps {
    lineOneColor: string;
    lineTwoColor: string;
    lineThreeColor: string;
}

const LineSignUpComponent = (props: LineSignUpComponentProps) => {

    return (
        <View style={styles.lineContainer}>
            <View style={[styles.line,{backgroundColor:props.lineOneColor}]} />
            <View style={[styles.line,{backgroundColor:props.lineTwoColor}]} />
            <View style={[styles.line,{backgroundColor:props.lineThreeColor}]} />
        </View>
    )

}

export default LineSignUpComponent;