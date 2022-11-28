import React from "react";
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TextInputProps,
} from "react-native";

import { AppColors } from "../styles/colors";

const styles = StyleSheet.create({
    Input: {
        backgroundColor: AppColors.MediumGray,
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontFamily: "Lato-Regular",
    },
});

type TextFieldProps = TextInputProps & {
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any;
};

export const TextField = (props: TextFieldProps) => {
    return (
        <TextInput
            {...props}
            style={
                props.style
                    ? Array.isArray(props.style)
                        ? [styles.Input, ...props.style]
                        : [styles.Input, props.style]
                    : [styles.Input]
            }
            onChange={(e) => props.onChange(e)}
        />
    );
};
