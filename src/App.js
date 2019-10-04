import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from './components/Form';
import ItemList from './components/ItemList';

class App extends Component {
  id = 1
  state = {
    input: '',
    todos: []
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        isCheck: false
      })
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const others = [...todos];

    others[index] = {
      ...selected,
      isCheck: !selected.isCheck
    };
    this.setState({
      todos: others
    });
  }

  handelRemove = (id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handelRemove
    } = this;

    return (
      <TodoTemplate form={(
        <Form
          value={input}
          onChange={handleChange}
          onCreate={handleCreate}
          onKeyPress={handleKeyPress}
        />
      )}>
        <ItemList todos={todos} onToggle={handleToggle} onRemove={handelRemove} />
      </TodoTemplate>
    );
  }
}

export default App;