import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent, TextInput } from '@xura/components';

@Entity()
export class Achievement {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent<string>({ type: new TextInput() })
    @Column()
    title: string = '';
}

debugger;