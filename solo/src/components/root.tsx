import { h } from 'preact';
import { withEffects, toProps } from 'refract-preact-rxjs'
import { map, flatMap } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { style } from "typestyle";

import '@xura/components';
import AchievementForm from './achievement';


const Root = () => (
    <xura-drawer title="Xura | Data">
        <span slot='content'>
            <AchievementForm />
        </span>
    </xura-drawer>
)

export default Root;