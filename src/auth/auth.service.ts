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
    const isValidUser = await this.employeeSchema
      .findOne({
        userName,
      })
      .populate('department');
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
    const signInfo = {
      userName,
      role: isValidUser.role,
      department: isValidUser.department.name,
    };
    return {
      acessToken: this.jwtService.sign(
        { signInfo },
        { expiresIn: '1h', secret: 'yourSecretKey' },
      ),
      user: isValidUser,
    };
  }
  async changePassword(userName: string, newPassword: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await this.employeeSchema.findOneAndUpdate(
      {
        userName,
      },
      {
        password: hashedPassword,
      },
    );
    return true;
  }
}
