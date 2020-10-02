import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth/auth.service";

describe('AuthInterceptorService', () => {
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi: true}
      ]
    });
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should append a token to the headers if a token exists', () => {
    spyOn(localStorage,'getItem').and.returnValue('s3cr3tt0ken');
    httpClient.get('/test').subscribe(res=>{});
    const req = http.expectOne('/test');
    req.flush('ok');
    expect(req.request.headers.get(AuthService.AuthorizationLocalStorageItemName)).toEqual('s3cr3tt0ken');
  });
  it('should not append a token to the headers if a token doesn\'t exist', ()=>{
    spyOn(localStorage,'getItem').and.returnValue(null);
    httpClient.get('/test').subscribe(res=>{});
    const req = http.expectOne('/test');
    req.flush('ok');
    expect(req.request.headers.has(AuthService.AuthorizationLocalStorageItemName)).toBe(false);
  });
});
