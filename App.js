import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import TodoList from './src/components/TodoList';

const client = new ApolloClient({
  uri: 'http://192.168.0.8:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  );
};

export default App;
