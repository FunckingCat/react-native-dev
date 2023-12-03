// Что изменено по сравнению с начальной версией:
// Добавляения типизация для state и новые поля
// Добавлена возможность выбирать дату дедлайна тудушки
// В качестве идентификаторов для записей используется не new Date а UUID что по логике больше подходит
// Дата создания записи отдельно сохраняется в стейт
// Изменены иконки

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import uuid from 'react-native-uuid';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import {Dimensions} from 'react-native';

type UUID = string | number[];

type Item = {
  id: UUID,
  createDate: Date,
  deadLine?: DateType,
  text: string
}

const TodoApp = () => {

  const [todos, setTodos] = useState<Item[]>([]);
  const [textInputValue, setNewTodo] = useState('');
  const [dateValue, setDateValue] = useState<DateType>(undefined);

  const addTodo = () => {
    if (textInputValue !== '') {
      setTodos([...todos, { id: uuid.v4(), createDate: new Date(), deadLine: dateValue, text: textInputValue }]);
      setNewTodo('');
      setDateValue(undefined)
    }
  };

  const removeTodo = (id: UUID) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new todo"
          value={textInputValue}
          onChangeText={(text) => setNewTodo(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <DateTimePicker value={dateValue} onValueChange={(date) => setDateValue(date)}/>
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style = {styles.todoItemDescription}>{item.text.length > 18 ? item.text.slice(0, 15) + '...' : item.text}</Text>
            <Text>{item.deadLine?.toLocaleString().slice(0,10)}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.removeButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoItemDescription: {
    width: Dimensions.get('window').width / 2,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TodoApp;