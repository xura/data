import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe, merge, of } from 'rxjs';
import { style } from "typestyle";

import '@xura/components';
import { data, Achievement } from '@xura/data';

const achievementFormStyle = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 20,
  fontFamily: 'Roboto'
});

const formSettings = [
  'achievement-form',
  { width: "100%", marginTop: 10 }
];

const aperture = (component, props) => {
  const entity$ = component.observe('entity')
  return merge(
    component.mount.pipe(
      flatMap(_ => data.achievements.form(...formSettings)),
      pipe(map((achievement: Achievement) => toProps({ saveAcheivement: () => data.achievements.repo.save(achievement) })))
    ),
    entity$.pipe(
      map(entity => entity)
    ),
  )
};

const AchievementForm = ({ saveAcheivement, entity, pushEvent }) => (
  <div className={achievementFormStyle}>
    <h1>{entity}</h1>
    <span id="achievement-form"></span>
    <xura-button styles={formSettings[1]} onClick={saveAcheivement}>
      Save
      </xura-button>
  </div>
)

export default withEffects(aperture)(AchievementForm)