import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechreviewComponent } from './speechreview.component';

describe('SpeechreviewComponent', () => {
  let component: SpeechreviewComponent;
  let fixture: ComponentFixture<SpeechreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
