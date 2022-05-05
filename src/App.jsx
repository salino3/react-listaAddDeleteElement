
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import icono from './assets/icono.jpg';
import {v4 as uuidv4 } from 'uuid'


const KEY = 'todoApp.todos'

export function App() {
    const [todos, setTodos] = useState([    // estado en sí es 'todos', y la función cambiando el estado es 'setTodos'
      // implementando y importando useState, se actualiza de continuo el DOM
      { id: 1, task: "Tarea uno", completed: false}
    ]);
    
 const todoTaskRef = useRef();

 

 useEffect(() => {
     const storedTodos = JSON.parse(localStorage.getItem(KEY));
     if (storedTodos) {
         setTodos(storedTodos);
     }
 }, [])

 useEffect(() => {
     localStorage.setItem(KEY, JSON.stringify(todos) )
 }, [todos])

 const toggleTodo = (id) => {
     const newTodos = [...todos];
     const todo = newTodos.find ((todo) => todo.id === id);
     todo.completed = !todo.completed;
     setTodos(newTodos);
 }

  const handleTodoAdd = () =>{
   const task = todoTaskRef.current.value;
   if (task === '') return;

   setTodos((prevTodos) => {
       return [...prevTodos, {id: uuidv4(), task, completed: false}]
   });

   todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };
    return ( 
    <Fragment>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoTaskRef} type='text' placeholder='Nueva Tarea' /> &nbsp;
       <button onClick={handleTodoAdd}>+</button> &nbsp;
       <button  style={{ width: "3em" }}> <img  src={icono} alt='papelera' onClick={handleClearAll} style={{ width: "50%", height: "50%" }}></img></button>
     <br/> <br/>  <hr  style={{ float: 'left', width:"40%"}}/> <br/> 
    <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar </div>

 </Fragment>
    
  );
}


