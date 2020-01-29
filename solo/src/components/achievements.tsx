import { Component, h } from 'preact';
import { data } from '@xura/data';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe } from 'rxjs';

import '@xura/components';

const aperture = component => component.mount.pipe(
  flatMap(_ => data.achievements.form('achievements-form')),
  pipe(map(achievement => toProps({ achievement })))
);

const Achievement = ({ achievement, pushEvent }) => (
  <div>
    <div id="achievements-form"></div>
  </div>
)

export default withEffects(aperture)(Achievement)