import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
