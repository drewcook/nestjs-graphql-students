import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { StudentEntity } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput) {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  getStudents() {
    return this.studentRepository.find();
  }

  async getStudent(id: string) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('student not found');
    return student;
  }

  getManyStudents(studentIds: string[]) {
    return this.studentRepository.find({
      where: {
        id: {
          // @ts-ignore
          $in: studentIds,
        },
      },
    });
  }
}
