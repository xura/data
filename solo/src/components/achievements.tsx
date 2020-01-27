import { Component, h } from 'preact';
import { data } from '@xura/data';

import '@xura/components';


export default class Acheivements extends Component {

  componentDidMount() {
    data.achievements.form('achievements-form').subscribe(change => {
      debugger;
    })
    data.achievements.form('achievements-form2').subscribe(change => {
      debugger;
    })
  }

  render({ }, { }) {

    return (
      <div>
        <div id="achievements-form"></div>
        <div id="achievements-form2"></div>
      </div>
    );
  }
}
