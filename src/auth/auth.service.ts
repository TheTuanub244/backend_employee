import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name)
    private employeeSchema: Model<Employee>,
    private jwtService: JwtService,
  ) {}
  async login(user: any) {
    const { userName, password } = user;
    const isValidUser = await this.employeeSchema.findOne({
      userName,
    });
    if (!isValidUser) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(
      password,
      isValidUser.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const signInfo = { userName, role: isValidUser.role };
    return {
      acessToken: this.jwtService.sign(
        { signInfo },
        { expiresIn: '1h', secret: 'yourSecretKey' },
      ),
    };
  }
}
