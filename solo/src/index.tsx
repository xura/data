import 'reflect-metadata'

import { render, h } from 'preact';
import TodoList from './components/todo-list';
import { connect, data } from '@xura/data';

connect().then(_ => {
  // @ts-ignore
  window.d = data;
  render(
    <TodoList />,
    document.querySelector('#root')
  );
});
