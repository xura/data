import { h, createRef } from 'preact';
import { useState } from 'preact/hooks';
import { withEffects } from 'refract-preact-rxjs'
import { map, flatMap, tap } from 'rxjs/operators'
import { of, fromEvent, merge } from 'rxjs';
import { capitalCase } from "change-case";

import '@xura/components';
import { data } from '@xura/data';
import Entity from './entity';

const items = Object.keys(data).map(_ => capitalCase(_))
const drawer = createRef();

const aperture = (component, props) => {
    const activeTab$ = component.observe('setActiveTab')
    return merge(
        component.mount.pipe(
            flatMap((_: any) => fromEvent(drawer.current, 'navigate').pipe(
                tap((evt: any) => props.setActiveTab(evt.detail)),
                map((evt: any) => ({
                    type: 'NAVIGATION',
                    replace: true,
                    state: evt.detail
                }))))),
        fromEvent(window, 'popstate').pipe(
            map((evt: any) => ({
                type: 'STATE',
                state: evt.state
            }))
        )
    )
}

const handler = ({ setActiveTab }) => effect => {
    switch (effect.type) {
        case 'NAVIGATION':
            const path = document.location.pathname
            const search = effect.state
                ? `?entity=${effect.state}`
                : ''
            const methodName = effect.replace ? 'replaceState' : 'pushState'
            window.history[methodName](effect.state, null, `${path}${search}`)
            return

        case 'STATE':
            return setActiveTab(effect.state)

        default:
            return
    }
}

const Root = withEffects(aperture, { handler })(({ activeTab }) => (
    <xura-drawer ref={drawer} items={items} title="Xura | Data">
        <span slot='content'>
            <Entity entity={activeTab} />
        </span>
    </xura-drawer>
));

export default ({ entity }) => {
    const [activeTab, setActiveTab] = useState(entity || items[0])

    return (
        <Root activeTab={activeTab} setActiveTab={setActiveTab} />
    );
}


