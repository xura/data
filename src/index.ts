import { Achievement } from "./entities/Achievement";
import { createConnection, Connection } from "typeorm";
import { Emporium } from '@xura/emporium';

const connect = (): Promise<Connection> => createConnection({
    type: "sqljs",
    location: "emporium",
    autoSave: true,
    entities: [
        Achievement
    ],
    logging: ['query', 'schema'],
    synchronize: true
});

const data = (connection: Connection) => ({
    achievements: new Emporium<Achievement>(
        connection,
        Achievement
    )
});

export {
    connect,
    data
};


