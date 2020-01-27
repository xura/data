import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent, TextInput } from '@xura/components';

@Entity()
export class Achievement {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent({
        label: 'Achievment Title',
        type: 'xura-text-input'
    })
    @Column()
    title: string = '';

    @FormComponent({
        label: 'Achievment Description',
        type: 'xura-text-area'
    })
    @Column({
        default: ''
    })
    description: string = '';
}