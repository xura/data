import 'reflect-metadata';
import { Achievement } from "./entities/Achievement";
import { User } from "./entities/User";
import { createConnection, Connection, getConnectionManager, ObjectType } from "typeorm";
import { initEmporium, Emporium } from '@xura/emporium';
import { buildForm } from '@xura/components';

const connect = (): Promise<Connection> =>
    createConnection({
        type: "sqljs",
        location: "emporium",
        autoSave: true,
        entities: [
            Achievement
        ],
        logging: ['query', 'schema'],
        synchronize: true
    });

initEmporium();

type Entity<T> = {
    repo: Emporium<T>
    form: any
}

const connection = () => getConnectionManager().get("default");
const entity = <T>(model: ObjectType<T>): Entity<T> => {
    debugger;
    return {
        repo: new Emporium<T>(
            connection,
            model,
        ),
        form: buildForm(model)
    }
}

const data = {
    achievements: entity(Achievement),
    users: entity(User)
};

debugger;


export {
    connect,
    data,
    connection
};


