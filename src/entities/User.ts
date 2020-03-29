import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent } from '@xura/components';
import ExternalResource from './ExternalResource';

@Entity()
export class User extends ExternalResource {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent({
        label: 'First Name',
        type: 'xura-text-input'
    })
    @Column()
    name: string = '';
}
