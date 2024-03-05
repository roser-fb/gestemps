import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private AuthStoreService: AuthStoreService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.AuthStoreService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
