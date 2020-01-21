import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent, TextInput } from '@xura/components';

@Entity()
export class Achievement {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent<string>({ type: '' })
    @Column()
    title: string = '';
}