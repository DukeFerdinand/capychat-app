import React, { useCallback, useState } from "react";
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { AppColors } from "../styles/colors";
import { Logo } from "../components/Logo";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { TextField } from "../components/TextField";
import { CapyStorage } from "../services/storage";
import { gql, useMutation } from "@apollo/client";
import { Mutation, MutationSignInUserArgs } from "../gql/graphql";
const styles = StyleSheet.create({
    LogoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
    },
    SignUpFormWrapper: {
        marginHorizontal: 12.5,
    },
    SignUpForm: {
        padding: 25,
        borderRadius: 15,
        backgroundColor: AppColors.DarkGrey,
    },
    Input: {
        backgroundColor: AppColors.MediumGray,
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontFamily: "Lato-Regular",
    },
    SignUpButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#D55D41",
        backgroundColor: AppColors.CapyColor,
        color: AppColors.Black,
        height: 50,
        width: 260,
        borderRadius: 10,
    },
    SignUpButtonDisabled: {
        backgroundColor: AppColors.MediumGray,
    },
});

interface SignInFormState {
    email: string;
    password: string;
}

const SIGN_IN_MUTATION = gql`
    mutation SignIn($userInfo: UserSignInInput!) {
        signInUser(userInfo: $userInfo) {
            token
            user {
                id
                email
                displayName
                username
            }
        }
    }
`;

export const SignIn: React.FC = () => {
    const rect = useSafeAreaFrame();
    const storageService = new CapyStorage("capy-storage");

    const [signInMutation] = useMutation<
        Mutation["signInUser"],
        MutationSignInUserArgs
    >(SIGN_IN_MUTATION);

    const [state, setState] = useState<SignInFormState>({
        email: "",
        password: "",
    });

    const handleChange = (
        key: keyof SignInFormState,
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setState({
            ...state,
            [key]:
                key === "email"
                    ? e.nativeEvent.text.trim()
                    : e.nativeEvent.text,
        });
    };

    const signIn = useCallback(async () => {
        const result = await signInMutation({
            variables: {
                userInfo: {
                    email: state.email,
                    password: state.password,
                },
            },
        });

        if (result.data) {
            console.tron ? console.tron.log!(result.data) : null;
            const { token, user } = result.data;
            await storageService.storeSensitive("token", token);
            await storageService.store("user", JSON.stringify(user));
        }
    }, [state, signInMutation, storageService]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={AppColors.DarkBlue}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{
                    backgroundColor: AppColors.DarkBlue,
                    flex: 1,
                }}
            >
                <View style={styles.LogoContainer}>
                    <Logo size={150} />
                </View>
                <KeyboardAvoidingView
                    behavior={"padding"}
                    style={{
                        ...styles.SignUpFormWrapper,
                        width: rect.width - 25,
                    }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View
                            style={{
                                ...styles.SignUpForm,
                                width: rect.width - 25,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Lato-Bold",
                                    fontSize: 24,
                                    marginBottom: 20,
                                }}
                            >
                                Sign in
                            </Text>
                            <TextField
                                placeholder={"Email"}
                                textContentType={"emailAddress"}
                                onChange={(e) => handleChange("email", e)}
                            />
                            <TextField
                                secureTextEntry
                                placeholder={"Password"}
                                textContentType={"newPassword"}
                                autoComplete={"password-new"}
                                onChange={(e) => handleChange("password", e)}
                            />
                            <Button
                                title={"Sign in"}
                                onPress={async () => {
                                    await signIn();
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};
