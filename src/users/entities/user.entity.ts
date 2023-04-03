import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 11,
  })
  user_code: string;

  @Column({
    unique: true,
    length: 50,
  })
  institutional_email: string;

  @Column()
  password: string;

  @Column({
    default: '',
  })
  nip_code: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    length: 20,
  })
  surname1: string;

  @Column({
    default: '',
    length: 20,
  })
  surname2: string;

  @Column({
    default: '',
    length: 20,
  })
  phone_number: string;

  @Column({
    default: '',
  })
  profile_pic_url: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
