
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 전 인터셉터

    // 후 인터셉터
    return next 
      .handle()
      .pipe(map((data) => ({
        success: true, 
        data,
      })));
  }
}
