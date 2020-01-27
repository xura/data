import 'reflect-metadata'

import { render, h } from 'preact';
import Achievements from './components/achievements';
import { connect, data } from '@xura/data';

connect().then(_ => {
  // @ts-ignore
  window.d = data;
  render(
    <Achievements />,
    document.querySelector('#root')
  );
});
