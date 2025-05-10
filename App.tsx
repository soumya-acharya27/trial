import { SafeAreaView, StatusBar, Text } from "react-native";
import Routes from "./src/Routes";
import { Provider } from 'react-redux'
import store from "./src/configureStore";
import Config from "react-native-config";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { theme } from "./src/theme";

export const client = new ApolloClient({
  // uri: 'https://api-dev.peerhub.in/graphql',
  uri: 'https://api-prod.peerhub.in/graphql',
  cache: new InMemoryCache(),
  headers:{
   'x-api-key': 'CdiymwC3UbCytk24gS1xWM8DffBeWNrt'
  }
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={{flex:1}}>
        <Provider store={store}>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.bgColor} />
          <Routes />
        </Provider>
      </SafeAreaView>
    </ApolloProvider>
  )
}

export default App;