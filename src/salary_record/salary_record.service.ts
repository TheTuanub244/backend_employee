import { Injectable } from '@nestjs/common';
import { CreateSalaryRecordDto } from './dto/create-salary_record.dto';
import { UpdateSalaryRecordDto } from './dto/update-salary_record.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { OvertimeRecordService } from 'src/overtime_record/overtime_record.service';
import { DeductionService } from 'src/deduction/deduction.service';
import { BonusService } from 'src/bonus/bonus.service';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryRecord } from './salary_record.schema';
import { Model, Types } from 'mongoose';
import { AttendanceRecordService } from 'src/attendance_record/attendance_record.service';
import { AllowanceService } from 'src/allowance/allowance.service';

@Injectable()
export class SalaryRecordService {
  constructor(
    @InjectModel(SalaryRecord.name)
    private salaryRecord: Model<SalaryRecord>,
    private employeeService: EmployeeService,
    private attendanceRecordService: AttendanceRecordService,
    private overtimeRecordService: OvertimeRecordService,
    private deductionService: DeductionService,
    private bonusService: BonusService,
    private allowanceService: AllowanceService,
  ) {}
  async calculateSalary(employeeId: Types.ObjectId, month: string) {
    const employeeObjectId = new Types.ObjectId(employeeId);
    const employee =
      await this.employeeService.getEmployeeById(employeeObjectId);
    const baseSalary = employee.baseSalary;
    const workHours =
      await this.attendanceRecordService.getTotalWorkHoursByEmployee(
        employeeObjectId,
        month,
      );
    const overtimePay = await this.overtimeRecordService.calculateOvertimePay(
      employeeObjectId,
      month,
    );
    const totalBonus = await this.bonusService.getTotalBonus(
      employeeObjectId,
      month,
    );
    const totalAllowance = await this.allowanceService.getTotalAllowance(
      employeeObjectId,
      month,
    );
    const totalDeductions = await this.deductionService.getTotalDeduction(
      employeeObjectId,
      month,
    );
    const insuranceRates =
      await this.employeeService.getInsuranceRate(employeeObjectId);
    const insurance =
      baseSalary *
      (insuranceRates.socialInsuranceRate +
        insuranceRates.healthInsuranceRate +
        insuranceRates.unemploymentInsuranceRate);
    // Thuế thu nhập cá nhân (giả định tạm tính 10%)
    const taxableIncome = baseSalary + totalBonus + overtimePay;
    const personalIncomeTax = taxableIncome * 0.1;
    const netSalary =
      baseSalary +
      totalBonus +
      totalAllowance +
      overtimePay -
      (insurance + personalIncomeTax + totalDeductions);
    return {
      employeeId,
      month,
      baseSalary,
      workHours,
      totalAllowance,
      overtimePay,
      bonus: totalBonus,
      deductions: totalDeductions,
      insurance,
      personalIncomeTax,
      netSalary,
    };
  }
  create(createSalaryRecordDto: CreateSalaryRecordDto) {
    return 'This action adds a new salaryRecord';
  }

  findAll() {
    return `This action returns all salaryRecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaryRecord`;
  }

  update(id: number, updateSalaryRecordDto: UpdateSalaryRecordDto) {
    return `This action updates a #${id} salaryRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaryRecord`;
  }
}
