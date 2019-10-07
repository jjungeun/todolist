import React, { Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Form from './components/Form';
import ItemList from './components/ItemList';
import Palette from './components/Palette';
import { fire, createFireDB, readFireDB, deleteFireDB } from './Firebase';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6']

class App extends Component {
  constructor() {
    super();
    this.id = 1;
    this.state = {
      input: '',
      todos: [],
      color: '#343a40'
    };
    fire();
  }

  // componentDidMount() {
  //   readFireDB().then(res => {
  //     console.log(res);
  //     // this.setState({
  //     //   todos: res
  //     // });
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;
    createFireDB(this.id, input, false, color);
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        isCheck: false,
        color
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
    deleteFireDB(id);
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handelSelect = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handelRemove,
      handelSelect
    } = this;

    return (
      <TodoTemplate
        form={(
          <Form
            value={input}
            onChange={handleChange}
            onCreate={handleCreate}
            onKeyPress={handleKeyPress}
            color={color}
          />
        )}
        palette={(
          <Palette
            colors={colors}
            selected={color}
            onSelect={handelSelect}
          />
        )}
      >
        <ItemList todos={todos} onToggle={handleToggle} onRemove={handelRemove} />
      </TodoTemplate>
    );
  }
}

export default App;