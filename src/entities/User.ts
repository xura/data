import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent, TextInput } from '@xura/components';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent({
        label: 'First Name',
        type: 'xura-text-input'
    })
    @Column()
    name: string = '';
}
