import { TestBed } from '@angular/core/testing';

import { SpeechserviceService } from './speechservice.service';

describe('SpeechserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechserviceService = TestBed.get(SpeechserviceService);
    expect(service).toBeTruthy();
  });
});
