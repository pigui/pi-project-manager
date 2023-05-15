import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivateNavbarHeaderComponent } from './private-navbar-header.component';

describe('PrivateNavbarHeaderComponent', () => {
  let component: PrivateNavbarHeaderComponent;
  let fixture: ComponentFixture<PrivateNavbarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNavbarHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateNavbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
