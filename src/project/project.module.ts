import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',

      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class ProjectModule {}
