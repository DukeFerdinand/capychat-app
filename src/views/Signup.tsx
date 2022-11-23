import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { AppColors } from "../styles/colors";

export const Signup: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={AppColors.DarkGrey}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{
                    backgroundColor: AppColors.DarkGrey,
                    // display: "flex",
                    flex: 1,
                }}
            >
                <Text>Test</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
