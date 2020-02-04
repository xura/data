import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap, switchMap } from 'rxjs/operators'
import { pipe, combineLatest, of } from 'rxjs';
import { style } from "typestyle";

import '@xura/components';
import { data } from '@xura/data';

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

const aperture = (component) => combineLatest(
  component.mount,
  component.observe('entity')
).pipe(
  flatMap(entity =>
    combineLatest(
      data[entity[1].toString().toLowerCase()].form(...formSettings),
      of(data[entity[1].toString().toLowerCase()].repo.streamAll().then(stream => stream))
    )
  ),
  map(([entity, entities]) => {
    debugger;
    return toProps({
      save: (entityName: string) => data[entityName].repo.save(entity),
      entities
    });
  }))

const EntityForm = ({ save, entity, entities, pushEvent }) => {
  const saveEntity = () => save(entity.toLowerCase());
  const e = entities && entities.then(_ => {
    debugger;
    return _;
  });
  debugger;
  return (
    <div className={entityFormStyle}>
      <h1>{entity}</h1>
      <span id="entity-form"></span>
      <xura-button styles={formSettings[1]} onClick={saveEntity}>
        Save
      </xura-button>
    </div>
  )
}

export default withEffects(aperture)(EntityForm)