import React, { PropsWithChildren } from "react";
import { Image } from "react-native";

export const Logo: React.FC<{ size: number }> = ({ size = 200 }) => {
    return (
        <Image
            style={{
                width: 200,
                height: 200,
                borderRadius: 360,
                overflow: "hidden",
            }}
            source={require("../assets/capybara.png")}
        />
    );
};
