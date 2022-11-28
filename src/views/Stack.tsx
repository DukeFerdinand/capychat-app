import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { SignInPromptScreen } from "./SignInPromptScreen";
import { Signup } from "./Signup";
import { SignIn } from "./SignIn";

const StackNav = createNativeStackNavigator();

export enum AppViews {
    HomeView = "Home",
    SignInPrompt = "SignInPrompt",
    SignupView = "Signup",
    SigninView = "Signin",
}

export const AppStack = () => {
    return (
        <StackNav.Navigator initialRouteName={AppViews.HomeView}>
            <StackNav.Screen
                name={AppViews.HomeView}
                component={SignInPromptScreen}
                options={{
                    headerShown: false,
                }}
            />
            <StackNav.Screen
                name={AppViews.SignInPrompt}
                component={SignInPromptScreen}
            />
            <StackNav.Screen
                name={AppViews.SignupView}
                component={Signup}
                options={{
                    animationTypeForReplace: "push",
                    headerTitle: "Sign Up",
                    headerShown: false,
                }}
            />
            <StackNav.Screen
                name={AppViews.SigninView}
                component={SignIn}
                options={{
                    animationTypeForReplace: "push",
                    headerTitle: "Sign In",
                    headerShown: false,
                }}
            />
        </StackNav.Navigator>
    );
};
