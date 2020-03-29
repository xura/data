import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent } from '@xura/components';
import ExternalResource from './ExternalResource';

@Entity()
export class Achievement extends ExternalResource {

    @PrimaryGeneratedColumn()
    id?: number;

    @FormComponent({
        label: 'Achievement Title',
        type: 'xura-text-input'
    })
    @Column()
    title: string = '';

    @FormComponent({
        label: 'Achievement Description',
        type: 'xura-text-area'
    })
    @Column({
        default: ''
    })
    description: string = '';
}