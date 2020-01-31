import 'reflect-metadata'

import { render, h } from 'preact';
import Root from './components/root';
import { connect, data } from '@xura/data';

connect().then(_ => {
  // @ts-ignore
  window.d = data;
  render(
    <Root />,
    document.querySelector('#root')
  );
});
