import { Achievement } from "./entities/Achievement";
import { createConnection, Connection, getConnectionManager } from "typeorm";
import { initEmporium, Emporium } from '@xura/emporium';

const connect = (): Promise<Connection> => Promise.resolve({} as Promise<Connection>)

initEmporium();

const connection = () => getConnectionManager().get("default");

const data = {
    achievements: new Emporium<Achievement>(
        connection,
        Achievement
    )
};


export {
    connect,
    data,
    connection
};


