import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe, combineLatest, merge } from 'rxjs';
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

const aperture = (component) => {
  const entity$ = combineLatest(
    component.mount,
    component.observe('entity')
  );
  const entity = (entityName: string) => data[entityName.toString().toLowerCase()]

  return merge(
    entity$.pipe(
      flatMap(props => data[props[1].toString().toLowerCase()].form(...formSettings)),
      pipe(map((entity: any) => toProps({
        save: (entityName: string) => data[entityName].repo.save(entity)
      })))
    ),
    entity$.pipe(
      flatMap(props => data[props[1].toString().toLowerCase()].repo.streamAll()),
      pipe(map((entities: any) => toProps({
        entities
      })))
    )
  )
};

const EntityForm = ({ save, entity, entities, pushEvent }) => {
  const saveEntity = () => save(entity.toLowerCase());
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