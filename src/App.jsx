import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todoinput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState("")

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  function handleAddTodos(newTodo) {
    const newTodos = [
      ...todos,
      newTodo
    ]
    setTodos(newTodos)
    persistData(newTodos)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  function handleDeleteTodo(index) {
    const newTodos = todos.filter((todo, todoIndex) => {
      return index !== todoIndex
    })
    setTodos(newTodos)
  }

  useEffect(() => {
    if(!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  return (
    <>
      <Todoinput 
      todoValue={todoValue}
      setTodoValue={setTodoValue}
      handleAddTodos={handleAddTodos}/>
      <TodoList 
      todos={todos}
      handleDeleteTodo={handleDeleteTodo}
      handleEditTodo={handleEditTodo}
      />
    </>
  )
}

export default App
