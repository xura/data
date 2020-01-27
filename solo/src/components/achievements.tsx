import { Component, h } from 'preact';
import { data } from '@xura/data';

import '@xura/components';


export default class Acheivements extends Component {

  componentDidMount() {
    data.achievements.form('achievements-form').subscribe(change => {
      debugger;
    })
  }

  render({ }, { }) {

    return (
      <div>
        <div id="achievements-form"></div>
      </div>
    );
  }
}
