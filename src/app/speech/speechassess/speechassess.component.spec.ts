import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechassessComponent } from './speechassess.component';

describe('SpeechassessComponent', () => {
  let component: SpeechassessComponent;
  let fixture: ComponentFixture<SpeechassessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechassessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechassessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
