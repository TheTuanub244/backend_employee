import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leave_request.controller';
import { LeaveRequestService } from './leave_request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveRequest, LeaveRequestSchema } from './leave_request.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService],
  imports: [
    MongooseModule.forFeature([
      {
        name: LeaveRequest.name,
        schema: LeaveRequestSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',

      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class LeaveRequestModule {}
