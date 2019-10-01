import React from 'react';
import './TodoTemplate.css';

const TodoTemplate = ({ form, children }) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        TODO
      </div>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="todos-wrapper">
        {children}
      </section>
    </main>
  );
};

export default TodoTemplate;