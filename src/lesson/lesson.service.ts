import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonEntity } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  createLesson(createLessonInput: CreateLessonInput) {
    const { name, startDate, endDate, studentIds } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(), // generate the public id
      name,
      startDate,
      endDate,
      students: studentIds,
    });
    return this.lessonRepository.save(lesson);
  }

  getLessons() {
    return this.lessonRepository.find();
  }

  async getLesson(id: string) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) throw new NotFoundException('lesson not found');
    return lesson;
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
