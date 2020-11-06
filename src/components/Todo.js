import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function Todo(props) {
  const {todo, removeTodo} = props;

  const styles = StyleSheet.create({
    todo: {
      width: 350,
      margin: 10,
      padding: 16,
      backgroundColor: '#e0e0e0',
    },
  });

  return (
    <View style={styles.todo} key={todo.id}>
      <Text>{todo.text}</Text>
      <CheckBox value={todo.completed} />
      <Button
        title="🗑️"
        color="red"
        onPress={() =>
          removeTodo({variables: {id: todo.id}})
            .then((res) =>
              console.log(`Item ${res.data.removeTodo} was removed`),
            )
            .catch((e) => console.log('Error:', e))
        }
      />
    </View>
  );
}

export default Todo;
