import React, { useCallback, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInputChangeEventData,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { AppColors } from "../styles/colors";
import { Logo } from "../components/Logo";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";
import {
    Mutation,
    MutationCreateUserArgs,
    UserCreationInput,
} from "../gql/graphql";
import { TextField } from "../components/TextField";

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

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($userInfo: UserCreationInput!) {
        createUser(userInfo: $userInfo) {
            id
            email
            displayName
            username
        }
    }
`;

type SignupFormState = Omit<UserCreationInput, "displayName"> & {
    passwordConfirm: "";
};

export const Signup: React.FC = () => {
    const rect = useSafeAreaFrame();

    const [state, setState] = useState<SignupFormState>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (
        key: keyof SignupFormState,
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setState({
            ...state,
            [key]:
                key === "username" || key === "email"
                    ? e.nativeEvent.text.trim()
                    : e.nativeEvent.text,
        });
    };

    const [signup, { data, loading, error }] = useMutation<
        Mutation["createUser"],
        MutationCreateUserArgs
    >(SIGNUP_MUTATION);

    const submitForm = useCallback(async () => {
        console.tron.log &&
            console.tron.log({
                username: state.username,
                displayName: state.username,
                password: state.password,
                email: state.email,
            });
        await signup({
            variables: {
                userInfo: {
                    username: state.username,
                    displayName: state.username,
                    password: state.password,
                    email: state.email,
                },
            },
        });
    }, [state, signup]);

    const passwordsMatch = useMemo(() => {
        return state.password && state.password === state.passwordConfirm;
    }, [state.password, state.passwordConfirm]);

    const allowSignup = useMemo(() => {
        return passwordsMatch;
    }, [passwordsMatch]);

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
                            {error && (
                                <View
                                    style={{
                                        padding: 10,
                                        minHeight: 50,
                                        backgroundColor: "#F7D074",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: AppColors.Black,
                                            textAlign: "center",
                                        }}
                                    >
                                        {error.message === "User already exists"
                                            ? "Sorry, that username or email are already in use, please try logging in or using a different email/username :)"
                                            : "Sorry, something went wrong :("}
                                    </Text>
                                </View>
                            )}

                            <Text
                                style={{
                                    fontFamily: "Lato-Bold",
                                    fontSize: 24,
                                    marginBottom: 20,
                                }}
                            >
                                Create an Account
                            </Text>
                            <TextField
                                placeholder={"Username"}
                                textContentType={"username"}
                                onChange={(e) => handleChange("username", e)}
                            />
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
                            <TextField
                                secureTextEntry
                                placeholder={"Confirm Password"}
                                textContentType={"newPassword"}
                                autoComplete={"password-new"}
                                onChange={(e) =>
                                    handleChange("passwordConfirm", e)
                                }
                            />
                            <View
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingVertical: 15,
                                }}
                            >
                                <TouchableOpacity
                                    disabled={!allowSignup}
                                    style={[
                                        styles.SignUpButton,
                                        ...(!allowSignup
                                            ? [styles.SignUpButtonDisabled]
                                            : []),
                                    ]}
                                    onPress={submitForm}
                                >
                                    <View
                                        style={{
                                            marginVertical: 15,
                                        }}
                                    >
                                        {loading ? (
                                            <ActivityIndicator />
                                        ) : (
                                            <Text
                                                style={{
                                                    color: AppColors.Black,
                                                    fontFamily: "Lato-Bold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Create Account
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};
