import { h } from 'preact';
import { withEffects, toProps, asProps } from 'refract-preact-rxjs'
import { map, flatMap, switchMap, mergeMap, tap } from 'rxjs/operators'
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

type TEntityProps = {
  entityName: string;
  save?: () => void
}

const aperture = (component, { entityName, save }: TEntityProps) => {

  const store = (entityName: string) =>
    (data[entityName.toLowerCase()] as Entity<any>)

  const events$ = combineLatest(
    component.mount,
    component.observe('entityName')
  )

  return events$.pipe(
    flatMap(([_, entityName]) => {
      const s = store(entityName.toString());
      const { renderer, changes } = s.form
      const { container, elements } = renderer(formSettings[1]);
      return combineLatest(
        of(s),
        of(container),
        changes(elements)
      )
    }),
    tap(([s, container]) => {
      const formContainer =
        document.getElementById(formSettings[0].toString());

      formContainer && (() => {
        debugger;
        formContainer.innerHTML = ''
        formContainer.appendChild(container)
      })()
    }),
    map(([s, container, changes$]) => toProps({
      save: () => s.repo.save(changes$)
    }))
  )

}

const handler = ({ entityName }: TEntityProps) => ({ payload, type }) => {
  const formContainer =
    document.getElementById(formSettings[0].toString());
  debugger;
  switch (type) {
    case 'BUILD_FORM':
      formContainer && (() => {
        debugger;
        formContainer.innerHTML = ''
        formContainer.appendChild(payload.form)
      })()
      return;
  }
};

const EntityForm = ({ save, entityName, pushEvent }) => {
  debugger;
  return (
    <div className={entityFormStyle}>
      <h1>{entityName}</h1>
      <span id="entity-form"></span>
      <xura-button styles={formSettings[1]} onClick={save}>
        Save
      </xura-button>
      <h1>
        {false && entities && entities.length}
      </h1>
    </div >
  )
}

export default withEffects(aperture, { handler })(EntityForm)
