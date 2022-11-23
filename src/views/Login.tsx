import React, { PropsWithChildren } from "react";
import {
    Button,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "../queries/getUserQuery";
import { GetUserQuery, GetUserQueryVariables } from "../gql/graphql";
import { AppColors } from "../styles/colors";
import { Link, NavigationProp, useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import App from "../../App";
import { Logo } from "../components/Logo";

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

const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    );
};

export const Login: React.FC<{
    navigation: NavigationProp<any>;
}> = ({ navigation }) => {
    const isDarkMode = useColorScheme() === "dark";
    const nav = useNavigation();

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
                                // paddingTop: 15,
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
                            onPress={() => navigation.navigate("Signup")}
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
