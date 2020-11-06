import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';

function AddTodo(props) {
  const {createTodo} = props;
  const styles = StyleSheet.create({
    addTodo: {
      padding: 16,
    },
  });

  const [newTodo, setNewTodo] = useState('');

  return (
    <View style={styles.addTodo}>
      <TextInput
        placeholder="New Todo"
        onChangeText={(value) => {
          setNewTodo(value);
        }}
      />
      <Button
        title="➕"
        color="green"
        onPress={() =>
          createTodo({variables: {text: newTodo}})
            .then((res) =>
              console.log(`Item ${res.data.createTodo} was created`),
            )
            .catch((e) => console.log('Error:', e))
        }
      />
    </View>
  );
}

export default AddTodo;
