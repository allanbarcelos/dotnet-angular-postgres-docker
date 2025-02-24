import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('/api') && !req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `/api${req.url}` });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}