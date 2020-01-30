import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { style } from "typestyle";

import '@xura/components';
import { data, Achievement } from '@xura/data';

const achievementFormStyle = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 20
});

const formSettings = [
  'achievement-form',
  { width: "100%", marginTop: 10 }
];

const aperture = component => component.mount.pipe(
  flatMap(_ => data.achievements.form(...formSettings)),
  pipe(map((achievement: Achievement) => toProps({ saveAcheivement: () => data.achievements.repo.save(achievement) })))
);

const AchievementForm = ({ saveAcheivement, pushEvent }) => (
  <div>
    <div className={achievementFormStyle}>
      <span id="achievement-form"></span>
      <xura-button styles={formSettings[1]} onClick={saveAcheivement}>Save</xura-button>
    </div>
  </div>
)

export default withEffects(aperture)(AchievementForm)