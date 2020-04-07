import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TppUserService } from '../../services/tpp.user.service';
import { AuthService } from '../../services/auth.service';
import { TppService } from '../../services/tpp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserProfileUpdateComponent } from './user-profile-update.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileUpdateComponent', () => {
  let component: UserProfileUpdateComponent;
  let fixture: ComponentFixture<UserProfileUpdateComponent>;
  let userInfoService: TppUserService;

  const mockUser: User = {
    id: 'id',
    email: 'email',
    login: 'login',
    branch: 'branch',
    pin: 'pin',
    scaUserData: [],
    accountAccesses: [],
  };

  const mockAuthUserService = {
    isLoggedIn: () => {
      return true;
    },
  };

  const mockinfoService = {
    getUserInfo: () => of(mockUser),
    updateUserInfo: () => of({}),
  };

  const mockRouter = {
    navigate: (url: string) => {
      console.log('mocknavigation', url);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        TppUserService,
        AuthService,
        TppService,
        NgbModal,
        { provide: AuthService, useValue: mockAuthUserService },
        { provide: TppUserService, useValue: mockinfoService },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [UserProfileUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileUpdateComponent);
    component = fixture.componentInstance;
    userInfoService = TestBed.get(TppUserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get UserDetails component', () => {
    component.getUserDetails();
    expect(component.user).toEqual(mockUser);
  });

  it('validate onSubmit method', () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
    expect(component.userForm.valid).toBeFalsy();
  });

  it('validate setupUserFormControl method', () => {
    component.setupEditUserFormControl();
    expect(component.userForm).toBeDefined();
  });

  it('validate formControl method', () => {
    expect(component.formControl).toEqual(component.userForm.controls);
  });

  it('should load the update users info', () => {
    const infoSpy = spyOn(userInfoService, 'updateUserInfo').and.returnValue(of({ mockUser }));
    component.user = mockUser;
    component.userForm.get('email').setValue('dart.vader@dark-side.com');
    component.userForm.get('username').setValue('dart.vader');
    component.userForm.get('password').setValue('12345678');
    component.onSubmit();
    expect(component.userForm.valid).toBeTruthy();
    expect(infoSpy).toHaveBeenCalled();
  });
});
