import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(
      ({ id, text, isCheck }) => (
        <Item
          id={id}
          text={text}
          isCheck={isCheck}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default ItemList;