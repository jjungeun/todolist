import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(
      ({ id, text, ischeck }) => (
        <Item
          id={id}
          text={text}
          ischeck={ischeck}
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