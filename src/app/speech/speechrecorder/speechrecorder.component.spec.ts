import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechrecorderComponent } from './speechrecorder.component';

describe('SpeechrecorderComponent', () => {
  let component: SpeechrecorderComponent;
  let fixture: ComponentFixture<SpeechrecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechrecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechrecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
