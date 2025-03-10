import { Module } from '@nestjs/common';
import { OvertimeRecordController } from './overtime_record.controller';
import { OvertimeRecordService } from './overtime_record.service';
import { OvertimeRecord, OverTimeRecordSchema } from './overtime_record.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OvertimeRecordController],
  providers: [OvertimeRecordService],
  imports: [
    MongooseModule.forFeature([
      {
        name: OvertimeRecord.name,
        schema: OverTimeRecordSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',

      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class OvertimeRecordModule {}
