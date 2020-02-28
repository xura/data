import 'reflect-metadata';
import { Achievement } from "./entities/Achievement";
import { User } from "./entities/User";
import { createConnection, Connection, getConnectionManager, ObjectType } from "typeorm";
import { initEmporium, Emporium, EntityRequest } from '@xura/emporium';
import { buildForm } from '@xura/components';

const connection = () => getConnectionManager().get("default");
const connect = () => createConnection({
    type: "sqljs",
    location: "emporium",
    autoSave: true,
    entities: [
        Achievement,
        User,
        EntityRequest
    ],
    logging: ['query', 'schema'],
    synchronize: true
})

initEmporium(connection)

export type Entity<T> = {
    repo: Emporium<T>
    form: any
}

const entity = <T>(model: ObjectType<T>): Entity<T> => {
    return {
        repo: new Emporium<T>(model),
        form: buildForm(model)
    }
}

const data = {
    achievements: entity<Achievement>(Achievement),
    users: entity<User>(User)
};

export {
    connect,
    data,
    connection
};


