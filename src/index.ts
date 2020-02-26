import 'reflect-metadata';
import { Achievement } from "./entities/Achievement";
import { User } from "./entities/User";
import { createConnection, Connection, getConnectionManager, ObjectType } from "typeorm";
import { initEmporium, Emporium } from '@xura/emporium';
import { buildForm } from '@xura/components';

const connect = () => createConnection({
    type: "sqljs",
    location: "emporium",
    autoSave: true,
    entities: [
        Achievement,
        User
    ],
    logging: ['query', 'schema'],
    synchronize: true
}).then(initEmporium);

export type Entity<T> = {
    repo: Emporium<T>
    form: any
}

const connection = () => getConnectionManager().get("default");
const entity = <T>(model: ObjectType<T>): Entity<T> => {
    return {
        repo: new Emporium<T>(model),
        form: buildForm(model)
    }
}

const data = {
    achievements: entity(Achievement),
    users: entity(User)
};

export {
    connect,
    data,
    connection
};


