import React, { Component } from 'react';
import './Item.css';

class Item extends Component {

  render() {
    const { text, isCheck, id, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation();
          onRemove(id)
        }
        }>&times;</div>
        <div className={`todo-text ${isCheck && 'checked'}`}>
          <div>{text}</div>
        </div>
        {
          isCheck && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default Item;