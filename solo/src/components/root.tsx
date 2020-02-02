import { h, createRef } from 'preact';
import { useState } from 'preact/hooks';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, startWith, flatMap, tap } from 'rxjs/operators'
import { of, fromEvent, merge } from 'rxjs';
import { capitalCase } from "change-case";
import { data } from '@xura/data';

import '@xura/components';
import AchievementForm from './achievement';

const items = Object.keys(data).map(_ => capitalCase(_))
const drawer = createRef();

const aperture = (component, props) => {
    const activeTab$ = component.observe('setActiveTab')
    debugger;
    return merge(
        component.mount.pipe(
            flatMap((_: any) => fromEvent(drawer.current, 'navigate').pipe(
                map((evt: any) => ({
                    type: 'NAVIGATION',
                    replace: true,
                    state: evt.detail
                }))))),
        of({
            type: 'NAVIGATION',
            replace: true,
            state: props.activeTab
        }),

        activeTab$.pipe(
            map(activeTab => ({
                type: 'NAVIGATION',
                replace: false,
                state: activeTab
            }))
        ),

        fromEvent(window, 'popstate').pipe(
            map((evt: any) => ({
                type: 'STATE',
                state: evt.state || { activeTab: 'ObiWan' }
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

const Root = ({ activeTab, setActiveTab }) => {
    return (
        <xura-drawer ref={drawer} activeItem={activeTab} items={items} title="Xura | Data">
            <span slot='content'>
                <AchievementForm />
            </span>
        </xura-drawer>
    )
}

const RootWithEffects = withEffects(aperture, { handler })(Root);

export default ({ entity }) => {
    const [activeTab, setActiveTab] = useState(entity || items[0])

    return (
        <RootWithEffects activeTab={activeTab} setActiveTab={setActiveTab} />
    );
}


