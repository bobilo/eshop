import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localstorageService: LocalstorageService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.localstorageService.getToken();
        const isAPIUrl = request.url.startsWith('https://eshop-backend-bonnie.herokuapp.com/api/v1/');

        if (token && isAPIUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
