import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AppColors } from "../styles/colors";
import { NavigationProp } from "@react-navigation/native";
import { Logo } from "../components/Logo";
import { AppViews } from "./Stack";

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export const SignInPromptScreen: React.FC<{
    navigation: NavigationProp<any>;
}> = ({ navigation }) => {
    const backgroundStyle = {
        backgroundColor: AppColors.DarkBlue,
        flex: 1,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={AppColors.DarkBlue}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: AppColors.DarkBlue,
                        paddingVertical: 50,
                        height: 300,
                    }}
                >
                    <Logo size={200} />
                </View>
                {/*<Header />*/}
                <View
                    style={{
                        backgroundColor: "#222",
                        flex: 1,
                        margin: 20,
                        height: 250,
                        borderRadius: 25,
                        padding: 30,
                        paddingHorizontal: 40,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontFamily: "Lato-Regular",
                            marginBottom: 15,
                        }}
                    >
                        Welcome to CapyChat
                    </Text>
                    <View
                        style={
                            {
                                // padSdingTop: 15,
                            }
                        }
                    >
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#84FAF4",
                                height: 50,
                                width: 260,
                                borderRadius: 10,
                                marginBottom: 15,
                            }}
                            onPress={() =>
                                navigation.navigate(AppViews.SignupView)
                            }
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    color: AppColors.DarkGrey,
                                }}
                            >
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#D55D41",
                                height: 50,
                                width: 260,
                                borderRadius: 10,
                            }}
                            onPress={() =>
                                navigation.navigate(AppViews.SigninView)
                            }
                        >
                            <Text
                                style={{
                                    // fontSize: 18,
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    color: AppColors.DarkGrey,
                                }}
                            >
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
