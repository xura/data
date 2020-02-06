import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators'
import { pipe, combineLatest, from, of } from 'rxjs';
import { style } from "typestyle";
import "regenerator-runtime/runtime";

import '@xura/components';
import { data } from '@xura/data';
import { Achievement } from '../../../src/entities';


const entityFormStyle = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 20,
  fontFamily: 'Roboto'
});

const formSettings = [
  'entity-form',
  { width: "100%", marginTop: 10 }
];

//const entities = 

const aperture = (component, { entity, store }) => {
  const events$ = combineLatest(
    component.mount,
    component.observe('entity'),
    // @ts-ignore
    from(store.repo.streamAll()).pipe(flatMap(stream => stream))
  )
  return events$.pipe(
    flatMap(([_, entity, entities]) =>
      combineLatest(
        store.form(...formSettings),
        // @ts-ignore
        from(entities)
      )
    ),
    map(([entityData, entities]) => {
      return toProps({
        save: () => store.repo.save(entityData),
        entities
      });
    }))

}

const EntityForm = ({ save, entity, entities, pushEvent, store }) => {
  debugger;
  return (
    <div className={entityFormStyle}>
      <h1>{entity}</h1>
      <span id="entity-form"></span>
      <xura-button styles={formSettings[1]} onClick={save}>
        Save
      </xura-button>
    </div>
  )
}

export default withEffects(aperture)(EntityForm)
