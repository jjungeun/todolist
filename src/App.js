import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from './components/Form';
import ItemList from './components/ItemList';

class App extends Component {
  id = 0
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

  render() {
    const { input, todos } = this.state;

    return (
      <TodoTemplate form={(
        <Form
          value={input}
          onChange={this.handleChange}
          onCreate={this.handleCreate}
          onKeyPress={this.handleKeyPress}
        />
      )}>
        <ItemList todos={todos} onToggle={this.handleToggle} />
      </TodoTemplate>
    );
  }
}

export default App;