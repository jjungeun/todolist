import React, { Component } from 'react';
import './Item.css';
import { updateFireDB } from '../Firebase';

class Item extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isCheck !== nextProps.isCheck;
  }

  componentDidUpdate() {
    updateFireDB(this.props.id);
  }

  render() {
    const { text, isCheck, id, color, onToggle, onRemove } = this.props;
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation();
          onRemove(id)
        }
        }>&times;</div>
        <div style={{ color }} className={`todo-text ${isCheck && 'isCheck'}`}>
          <div>{text}</div>
        </div>
        {
          isCheck && (<div className="check-mark">&#x2713;</div>)
        }
      </div>
    );
  }
}

export default Item;