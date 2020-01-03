import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { reduce } from 'lodash';

function FormComponent(serializer: { type: any }): (target: any, propertyKey: string) => void {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("metadata", serializer, target, propertyKey);
    }
}

@Entity()
export class Achievement {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @FormComponent({ type: '' })
    static title: string = '';
}

const formComponents = reduce(Achievement, (acc, value, key) => ({
    ...acc,
    [key]: Reflect.getMetadata("metadata", Achievement, key)
}), {})

debugger;