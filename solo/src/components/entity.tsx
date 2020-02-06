import { h } from 'preact';
import { withEffects, toProps, asProps } from 'refract-preact-rxjs'
import { map, flatMap, switchMap, mergeMap } from 'rxjs/operators'
import { pipe, combineLatest, from, of, merge } from 'rxjs';
import { style } from "typestyle";
import "regenerator-runtime/runtime";

import '@xura/components';
import { data, Entity } from '@xura/data';
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

type TEntityProps = {
  entityName: string;
  store: Entity<any>
}

const aperture = (component, { store }: TEntityProps) => {
  const events$ = combineLatest(
    component.mount,
    component.observe('entityName'),
    from(store.repo.streamAll()).pipe(flatMap(stream => stream))
  )

  // TODO spit up component.mount, entity observation, and streaming all entities into seperate 
  // actions/effect within the handler
  // https://github.com/fanduel-oss/refract/blob/d313a08730f03cb467f9ca5d5b840d24cb6c9290/examples/redux-fetch/rxjs/src/index.js

  const onEntityChange$ = events$.pipe(
    map(([_, entityName]) => toProps({
      entityName
    })))

  const onFormChange$ = events$.pipe(
    flatMap(_ => store.form(...formSettings)),
    map(entityData => toProps({
      save: () => store.repo.save(entityData)
    })))

  const onEntityActionTriggered$ = events$.pipe(
    flatMap(([_, _1, entities]) => from(entities)),
    map(entities => toProps({
      entities
    }))
  )

  // return events$.pipe(
  //   flatMap(([_, entity, entities]) =>
  //     combineLatest(
  //       store.form(...formSettings),
  //       // @ts-ignore
  //       from(entities)
  //     )
  //   ),
  //   map(([entityData, entities]) => {
  //     return toProps({
  //       save: () => store.repo.save(entityData),
  //       entities
  //     });
  //   }))

  return merge(onEntityChange$, onFormChange$, onEntityActionTriggered$);

}

const EntityForm = ({ save, entityName, entities, pushEvent, store }) => {
  return (
    <div className={entityFormStyle}>
      <h1>{entityName}</h1>
      <span id="entity-form"></span>
      <xura-button styles={formSettings[1]} onClick={save}>
        Save
      </xura-button>
      <ul>
        {entities && entities.map(entity => <li>{entity.title}</li>)}
      </ul>
    </div>
  )
}

export default withEffects(aperture)(EntityForm)
