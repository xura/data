import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe } from 'rxjs';

import '@xura/components';
import { data, Achievement } from '@xura/data';

const aperture = component => component.mount.pipe(
  flatMap(_ => data.achievements.form('achievement-form')),
  pipe(map((achievement: Achievement) => toProps({ saveAcheivement: () => data.achievements.repo.save(achievement) })))
);

const AchievementForm = ({ saveAcheivement, pushEvent }) => (
  <div>
    <div id="achievement-form"></div>
    <xura-button onClick={saveAcheivement}>Save</xura-button>
  </div>
)

export default withEffects(aperture)(AchievementForm)