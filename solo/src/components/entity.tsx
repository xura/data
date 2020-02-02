import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe, combineLatest } from 'rxjs';
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

const aperture = (component) => {
  const entity$ = component.observe('entity')

  return combineLatest(
    component.mount,
    entity$
  ).pipe(
    flatMap(props => data[props[1].toString().toLowerCase()].form(...formSettings)),
    pipe(map((entity: any) => toProps({
      save: (entityName: string) => data[entityName].repo.save(entity)
    })))
  )
};

const AchievementForm = ({ save, entity, pushEvent }) => {
  const saveEntity = () => save(entity.toLowerCase());
  return (
    <div className={achievementFormStyle}>
      <h1>{entity}</h1>
      <span id="achievement-form"></span>
      <xura-button styles={formSettings[1]} onClick={saveEntity}>
        Save
      </xura-button>
    </div>
  )
}

export default withEffects(aperture)(AchievementForm)