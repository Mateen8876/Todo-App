import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todoapp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask }];
      setTasks(updatedTasks);
      setNewTask('');
      await saveTasks(updatedTasks);
    }
  };

  const handleDeleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor='black'
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask} >
          <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.taskList}> 
        {tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text style={styles.taskText}>{task.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(task.id)} >
              <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontFamily:'Poppins-Regular',
    color:'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color:'black',
    backgroundColor:'white',
    fontFamily:'Poppins-Regular',
    // borderWidth: 1,
    // borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    elevation:15,
  },
  taskList: {
    flex: 1,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation:15,
  },
  taskText: {
    fontSize: 18,
    color:'black',
    fontFamily:'Poppins-Regular',
  },
  delete:{
    backgroundColor:'blue',
    color:'white',
    fontFamily:'Poppins-Regular',
    width:60,
    height:30,
  padding:2,
    textAlign:'center',
    borderRadius:5,
    elevation:15,

  },
  button:{
    backgroundColor:'blue',
    borderRadius:5,
    color:'white',
    width:65,
    height:45,
    justifyContent:'center',
    alignItems:'center',
    elevation:15,
  

  },
  add:{
    color:'white',
    fontFamily:'Poppins-Regular',
    top:2,


  },

});

export default Todoapp;