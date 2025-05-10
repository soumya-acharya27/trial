import { Pressable, Text, View } from "react-native";
import { styles } from './styles';
import Eye from '../../assets/svg/call.svg'
import Back from '../../assets/svg/arrowleft.svg'
import Search from '../../assets/svg/searchnew.svg'
interface HeaderProrp {
    name: string;
    onBack: () => void;
    showBack?:boolean;
    rightTxt?: string;
    rightCta?: () => void;
    showSkipNow?: boolean;
    onSkipPress?: () => void;
}


const Header = ({ name, onBack, showBack=true , showSkipNow=false, onSkipPress=() => {}}: HeaderProrp) => {

    return (
        <View style={styles.container}>
            {showBack && <Pressable onPress={onBack}>
                <Back />
            </Pressable>}
            <Text style={styles.nameText}>{name}</Text>

            {showSkipNow && <Pressable onPress={onSkipPress} style={styles.skipBtn}>
                <Text style={styles.skipNowTxt}>Skip Now</Text>
            </Pressable>}
        </View>
    )
}

export default Header