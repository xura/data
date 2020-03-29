import { ObjectID, Column } from "typeorm";

export default abstract class {
    @Column()
    ExternalId?: ObjectID;
}