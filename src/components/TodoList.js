import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useQuery, useMutation, gql} from '@apollo/client';
import Todo from './Todo';
import AddTodo from './AddTodo';

const LIST_TODO_QUERY = gql`
  query LIST_TODO_QUERY {
    todos {
      id
      text
      completed
    }
  }
`;

const REMOVE_TODO_MUTATION = gql`
  mutation REMOVE_TODO_MUTATION($id: String!) {
    removeTodo(id: $id)
  }
`;

const CREATE_TODO_MUTATION = gql`
  mutation CREATE_TODO_MUTATION($text: String!) {
    createTodo(text: $text)
  }
`;

function TodoList() {
  const styles = StyleSheet.create({
    list: {
      flex: 1,
      padding: 20,
      margin: 10,
    },
    loading: {
      flex: 1,
      flexDirection: 'column',
    },
  });
  const {error, loading, data, refetch} = useQuery(LIST_TODO_QUERY);
  const [removeTodo] = useMutation(REMOVE_TODO_MUTATION);
  const [createTodo] = useMutation(CREATE_TODO_MUTATION);

  useEffect(() => {
    refetch();
  }, [data, refetch]);
  if (error) {
    return (
      <View style={styles.list}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#000" />
      </View>
    );
  }

  return (
    <>
      <AddTodo createTodo={createTodo} />
      <ScrollView style={styles.list}>
        {data.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} removeTodo={removeTodo} />
        ))}
      </ScrollView>
    </>
  );
}

export default TodoList;
