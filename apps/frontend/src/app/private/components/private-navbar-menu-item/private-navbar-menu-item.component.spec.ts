import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivateNavbarMenuItemComponent } from './private-navbar-menu-item.component';

describe('PrivateNavbarMenuItemComponent', () => {
  let component: PrivateNavbarMenuItemComponent;
  let fixture: ComponentFixture<PrivateNavbarMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNavbarMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateNavbarMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
