import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/employee/enum/roles.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('You must sign in');
    }
    let payload;
    try {
      payload = this.jwtService.verify(token, { secret: 'yourSecretKey' });
    } catch (error) {
      throw new UnauthorizedException(
        'You must sign in to perform this action',
      );
    }

    request.user = payload;

    if (!requiredRoles) {
      return true;
    }
    const hasRole = requiredRoles.some(
      (role) => payload.signInfo.role === role,
    );
    if (!hasRole) {
      console.log(
        'User does not have the required role:',
        requiredRoles,
        'User role:',
        payload.signInfo.role,
      );
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Extract the token
    }
    return null;
  }
}
