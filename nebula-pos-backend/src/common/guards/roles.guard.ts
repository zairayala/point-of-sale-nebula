import { UserFromToken } from '@/auth/interfaces/user.interface';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {    
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as UserFromToken

    if(!user){
      throw new UnauthorizedException('User not authenticated')
    }
    
    if(user.role !== 'admin' && user.role !== 'superadmin'){
      throw new ForbiddenException('Access denied: superadmin or admin role required');
    }

    return true
  }
}
