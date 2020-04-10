import { Entity, Column } from 'typeorm';
import { FormComponent } from '@xura/components';
import { ExternalResource } from '@xura/emporium';

@Entity()
export class Achievement extends ExternalResource {

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