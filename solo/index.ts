import { connect, data } from '../src';

// @ts-ignore
initSqlJs().then(_ => connect().then(_ => {
    debugger;
    // @ts-ignore
    window.d = data;
    data.achievements.stream().then(stream => stream.subscribe(_ =>
        (document.getElementById('achievements') as any).textContent = _.name));
}));