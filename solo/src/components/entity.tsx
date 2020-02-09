import { h } from 'preact';
import { withEffects, toProps, asProps } from 'refract-preact-rxjs'
import { map, flatMap, switchMap, mergeMap, tap, startWith, scan, withLatestFrom } from 'rxjs/operators'
import { pipe, combineLatest, from, of, merge, forkJoin } from 'rxjs';
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

const aperture = (component, { entity }) => {

  const renderForm = (container: any) => {
    const formContainer = document.getElementById(formSettings[0].toString());
    debugger;
    formContainer && (() => {
      formContainer.innerHTML = '';
      formContainer.appendChild(
        container
      )
    })()
  }

  return combineLatest(
    component.observe('entity'),
    component.mount
  ).pipe(
    flatMap(([entity, _]) => {
      debugger;
      const entityName = entity.toString().toLowerCase();
      const entityForm = data[entityName].form;
      const form = entityForm.renderer(formSettings[1]);
      renderForm(form.container);

      const changes$ = entityForm.changes(form.elements);

      return combineLatest(changes$).pipe(
        map(([changes]) => toProps({
          save: () => data[entityName].repo.save(changes as Achievement)
        })))
    })
  )
}


const EntityForm = ({ entity, save, pushEvent }) => {
  return (
    <div className={entityFormStyle}>
      <h1>{}</h1>
      <span id="entity-form"></span>
      <xura-button styles={formSettings[1]} onClick={() => save()}>
        Save
      </xura-button>
    </div >
  )
}

const EntityFormWithEffects =
  withEffects(aperture)(EntityForm)

export default ({ entity }) => {
  debugger;
  return <EntityFormWithEffects entity={entity} />
}
