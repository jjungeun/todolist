import React from 'react';
import './TodoTemplate.css';

const TodoTemplate = ({ form, palette, children }) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        TODO
      </div>
      <section className="palette-wrapper">
        {palette}
      </section>
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