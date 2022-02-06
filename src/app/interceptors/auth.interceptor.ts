import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public userId;


  constructor(private cookie:CookieService) {
    this.userId = this.cookie.get('local_user');;
  }
  sessionCookie;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.sessionCookie = this.cookie.get('access_token');

    if(!request.headers.has('access-header')){
      request = request.clone({headers:request.headers.set('access-header',this.sessionCookie) ,params: request.params.set( "user_id", this.userId) })

    }
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{

        if (error.status === 401) {
          window.location.href = environment.ERP_URL;
        }
        return throwError(error);

      })
    );
  }
}
