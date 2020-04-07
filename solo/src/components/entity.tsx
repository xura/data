import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs';
import { style } from "typestyle";
import "regenerator-runtime/runtime";

import '@xura/components';
import { data, Entity } from '@xura/data';
import { Achievement } from '../../../src/entities';
import { capitalCase } from 'change-case';


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
      const entityName = entity.toString().toLowerCase();
      const form = data[entityName].form;
      const renderedForm = form.renderer(formSettings[1]);
      renderForm(renderedForm.container);
      const streams = form.changes(renderedForm.elements);
      return streams.pipe(
        map(changes => toProps({
          entity: capitalCase(entityName),
          save: () => data[entityName].repo.create(changes as Achievement)
        })))
    })
  )
}


const EntityForm = ({ entity, save, pushEvent }) => (
  <div className={entityFormStyle}>
    <h1>{entity}</h1>
    <span id="entity-form"></span>
    <xura-button styles={formSettings[1]} onClick={save}>
      Save
      </xura-button>
  </div>
)

const EntityFormWithEffects = withEffects(aperture)(EntityForm)

export default ({ entity }) =>
  <EntityFormWithEffects entity={entity} />
