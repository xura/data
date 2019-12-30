import { Component, h } from 'preact';
import TodoItem from './todo-item';
import '@xura/components';

interface TodoListState {
  todos: { text: string }[];
  text: string;
}

export default class TodoList extends Component<{}, TodoListState> {
  state = { todos: [], text: '' };

  setText = (e: Event) => {
    this.setState({
      text: (e.target as HTMLInputElement).value
    });
  }

  addTodo = () => {
    const { todos, text } = this.state;

    this.setState({
      todos: [...todos, { text }],
      text: ''
    });
  }

  render({ }, { todos, text }) {
    const items = ['Achievements', 'Users'];
    return (
      <form onSubmit={this.addTodo} action="javascript:">
        <xura-list style="display: block; width: 33.3%;" items={items}></xura-list>
        <xura-text-input required="true" label="Achievement Name"></xura-text-input>
        <input value={text} onInput={this.setText} data-cy="new-todo-input" />
        <button type="submit" data-cy="todo-submit">Add</button>
        <ul data-cy="todo-list">{todos.map(todo => <TodoItem text={todo.text} />)}</ul>
      </form>
    );
  }
}
