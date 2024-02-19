import { StyleSheet } from "react-native";
import Colors from "../../shared/Constants/Colors";

const TimerStyle = StyleSheet.create({
    Container: {
        backgroundColor: Colors.black,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    TimerText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
    }
});

export default TimerStyle;