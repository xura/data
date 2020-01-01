import 'reflect-metadata';
import { Achievement } from "./entities/Achievement";
import { User } from "./entities/User";
import { createConnection, Connection, getConnectionManager } from "typeorm";
import { initEmporium, Emporium } from '@xura/emporium';

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

const connection = () => getConnectionManager().get("default");

const data = {
    achievements: new Emporium<Achievement>(
        connection,
        Achievement
    ),
    users: new Emporium<User>(
        connection,
        Achievement
    )
};


export {
    connect,
    data,
    connection
};


