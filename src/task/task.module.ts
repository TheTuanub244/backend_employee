import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',

      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class TaskModule {}
