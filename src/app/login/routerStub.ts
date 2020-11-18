import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

@Injectable()
export class RouterStub {
  public navigateSpy = jasmine.createSpy('navigate');

  navigate(path: string): void {
    this.navigateSpy(path);
  }
}

export function ROUTER_PROVIDER(): { provide: typeof Router, useValue: RouterStub } {
  return {provide: Router, useValue: new RouterStub()};
}

export function ROUTER_STUB() {
  return TestBed.inject(Router) as never as RouterStub;
}
