/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

if (__DEV__) {
    import("./src/logger/reactotron").then(() =>
        console.log("Initialized reactotron!")
    );
}

import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/views/Stack";

const App = () => {
    const queryClient = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "http://localhost:3000/api/graphql",
    });

    return (
        <NavigationContainer>
            <ApolloProvider client={queryClient}>
                <AppStack />
            </ApolloProvider>
        </NavigationContainer>
    );
};

export default App;
