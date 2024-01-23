import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(1)
  @IsString()
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  studentIds: string[];
}
