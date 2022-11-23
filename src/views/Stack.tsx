import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Login } from "./Login";
import App from "../../App";
import { Signup } from "./Signup";

const StackNav = createNativeStackNavigator();

enum AppViews {
    HomeView = "Home",
    LoginView = "Login",
    SignupView = "Signup",
}

export const AppStack = () => {
    return (
        <StackNav.Navigator initialRouteName={AppViews.HomeView}>
            <StackNav.Screen
                name={AppViews.HomeView}
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <StackNav.Screen name={AppViews.LoginView} component={Login} />
            <StackNav.Screen
                name={AppViews.SignupView}
                component={Signup}
                options={{
                    headerShown: false,
                    animationTypeForReplace: "push",
                }}
            />
        </StackNav.Navigator>
    );
};
