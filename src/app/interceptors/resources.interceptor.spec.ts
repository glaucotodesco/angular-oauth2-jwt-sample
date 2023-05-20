import { TestBed } from '@angular/core/testing';

import { ResourcesInterceptor } from './resources.interceptor';

describe('ResourcesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResourcesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResourcesInterceptor = TestBed.inject(ResourcesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
