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

type TEntityProps = {
  entityName: string;
  save?: () => void
}

const aperture = component => {

  const form = data.achievements.form.renderer(formSettings[1]);

  const mount$ = component.mount.pipe(
    tap(_ =>
      document.getElementById(formSettings[0].toString()).appendChild(
        form.container
      ))
  )

  const changes$ = data.achievements.form.changes(form.elements);

  return combineLatest(changes$, mount$).pipe(
    map(([changes]) => toProps({
      save: () => data.achievements.repo.save(changes as Achievement)
    })))
}


const EntityForm = ({ isExpanded, save, pushEvent }) => {
  debugger;
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

export default () => <EntityFormWithEffects />
