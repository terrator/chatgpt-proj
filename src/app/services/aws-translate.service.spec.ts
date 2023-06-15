import { TestBed } from '@angular/core/testing';

import { AwsTranslateService } from './aws-translate.service';

describe('AwsTranslateService', () => {
  let service: AwsTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
