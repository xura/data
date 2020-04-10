import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormComponent } from '@xura/components';
import { ExternalResource } from '@xura/emporium';

@Entity()
export class User extends ExternalResource {

    @FormComponent({
        label: 'First Name',
        type: 'xura-text-input'
    })
    @Column()
    name: string = '';
}
