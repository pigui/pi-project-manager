import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivateNavbarMenuComponent } from './private-navbar-menu.component';

describe('PrivateNavbarMenuComponent', () => {
  let component: PrivateNavbarMenuComponent;
  let fixture: ComponentFixture<PrivateNavbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNavbarMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateNavbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
