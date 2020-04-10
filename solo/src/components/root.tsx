import { h, createRef } from 'preact';
import { useState } from 'preact/hooks';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { fromEvent, merge, from } from 'rxjs';
import { capitalCase } from "change-case";

import '@xura/components';
import { data } from '@xura/data';
import Entity from './entity';

const items = Object.keys(data).map(_ => capitalCase(_))
const drawer = createRef();

const aperture = component => merge(
    component.mount.pipe(
        flatMap(_ => fromEvent(drawer.current, 'navigate').pipe(
            map((evt: any) => ({
                type: 'NAVIGATION',
                replace: true,
                state: evt.detail
            }))))),
    fromEvent(window, 'popstate').pipe(
        map((evt: any) => ({
            type: 'BACK',
            state: evt.state
        }))
    ),
    component.observe('activeTab').pipe(
        flatMap(activeTab => from(data[activeTab.toString().toLowerCase()].repo.streamAll())
            .pipe(flatMap((stream: Promise<any>) => stream),
                map((evt: any) => ({
                    type: 'SET_ENTITIES',
                    state: evt
                })))
        )
    )
)

const handler = ({ setActiveTab, activeTab, entities, setEntities }) => effect => {
    switch (effect.type) {
        case 'NAVIGATION':
            const path = document.location.pathname
            const search = effect.state
                ? `?entity=${effect.state}`
                : ''
            const methodName = effect.replace ? 'replaceState' : 'pushState'
            window.history[methodName](effect.state, null, `${path}${search}`)
            setActiveTab(effect.state)
            return
        case 'BACK':
            return setActiveTab(effect.state)
        case 'SET_ENTITIES':
            return effect.state
                .then(entities => setEntities(entities))
        default:
            return
    }
}

const Root = withEffects(aperture, { handler })(({ activeTab, entities, setEntities }) => (
    <xura-drawer ref={drawer} items={items} title="Xura | Data">
        <span slot='content'>
            <div style={{ width: '50%', float: 'left' }}>
                <Entity entity={activeTab} />
            </div>
            {/* <div style={{ width: '50%', float: 'right', height: '500px', overflow: 'scroll' }}>
                    <xura-list items={entityList}></xura-list>
                </div> */}
        </span>
    </xura-drawer>
))

export default (state) => {
    const [activeTab, setActiveTab] =
        useState(state.entity || items[0])
    const [entities, setEntities] =
        useState([])
    return (
        <Root
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            entities={entities}
            setEntities={setEntities}
        />
    );
}


