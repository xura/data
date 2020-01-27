import { Component, h } from 'preact';
import TodoItem from './todo-item';
import '@xura/components';
import { data } from '@xura/data';

interface TodoListState {
  todos: { text: string }[];
  text: string;
}

export default class TodoList extends Component<{}, TodoListState> {
  state = { todos: [], text: '' };

  componentDidMount() {
    data.achievements.form('achievements-form');
  }

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
      <div id="achievements-form"></div>
    );
  }
}
