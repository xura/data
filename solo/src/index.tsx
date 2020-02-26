import 'reflect-metadata'

import { render, h } from 'preact';
import Root from './components/root';
import { connect, data } from '@xura/data';
import * as parser from 'url-parameter-parser';

connect().then(_ => {
  // @ts-ignore
  window.d = data;
  const { entity } = parser(document.location.search);
  debugger;
  render(
    <Root entity={entity} />,
    document.querySelector('#root')
  );
});
