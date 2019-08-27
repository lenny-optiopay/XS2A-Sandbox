import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserUpdateComponent} from './user-update.component';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {DebugElement} from "@angular/core";
import {InfoModule} from "../../../commons/info/info.module";
import {FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {IconModule} from "../../../commons/icon/icon.module";
import {of} from "rxjs/internal/observable/of";
import {InfoService} from "../../../commons/info/info.service";

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let userService: UserService;
  let infoService: InfoService;
  let router: Router;
  let de: DebugElement;
  let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                InfoModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                IconModule
            ],
            providers: [UserService, InfoService],
            declarations: [UserUpdateComponent]
        })
            .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('submitted should false', () => {
  //       expect(component.submitted).toBeFalsy();
  // });
  //
  //   it('email field validity', () => {
  //       let errors = {};
  //       const email = component.updateUserForm.controls['email'];
  //       expect(email.valid).toBeFalsy();
  //
  //       // email field is required
  //       errors = email.errors || {};
  //       expect(errors['required']).toBeTruthy();
  //
  //       // set email to something incorrect
  //       email.setValue('testtests.de');
  //       errors = email.errors || {};
  //       expect(errors['email']).toBeTruthy();
  //
  //       // set email to something correct
  //       email.setValue('test@test.de');
  //       errors = email.errors || {};
  //       expect(errors['required']).toBeFalsy();
  //   });
  //
  //   it('login field validity', () => {
  //       let errors = {};
  //       const login = component.updateUserForm.controls['login'];
  //       expect(login.valid).toBeFalsy();
  //
  //       // login field is required
  //       errors = login.errors || {};
  //       expect(errors['required']).toBeTruthy();
  //
  //       // set login to something correct
  //       login.setValue('test@test.de');
  //       errors = login.errors || {};
  //       expect(errors['required']).toBeFalsy();
  //   });
  //
  //   it('pin field validity', () => {
  //       let errors = {};
  //       const pin = component.updateUserForm.controls['pin'];
  //       expect(pin.valid).toBeFalsy();
  //
  //       // pin field is required
  //       errors = pin.errors || {};
  //       expect(errors['required']).toBeTruthy();
  //
  //       // pin should have at least 5 characters
  //       pin.setValue('1234');
  //       errors = pin.errors || {};
  //       expect(errors['required']).toBeFalsy();
  //       expect(errors['minlength']).toBeTruthy();
  //
  //       // set pin to something correct
  //       pin.setValue('12345678');
  //       errors = pin.errors || {};
  //       expect(errors['required']).toBeFalsy();
  //   });
  //
  //   it('SCA validity', () => {
  //       let errors = {};
  //       const sca = component.updateUserForm.controls['scaUserData']['controls'][0].controls['methodValue'];
  //       expect(sca.valid).toBeFalsy();
  //
  //       // pin field is required
  //       errors = sca.errors || {};
  //       expect(errors['required']).toBeTruthy();
  //
  //       // set pin to something correct
  //       sca.setValue('sca method');
  //       errors = sca.errors || {};
  //       expect(errors['required']).toBeFalsy();
  //   });
  //
  //   it('validate onSubmit method', () => {
  //       component.onSubmit();
  //       expect(component.submitted).toEqual(true);
  //       expect(component.updateUserForm.valid).toBeFalsy();
  //   });
  //
  //   it('validate setupUserFormControl method', () => {
  //       component.setupUserFormControl();
  //       expect(component.updateUserForm).toBeDefined();
  //   });
  //
  //   it('validate formControl method', () => {
  //       expect(component.formControl).toEqual(component.updateUserForm.controls);
  //   });
  //
  //   it('validate iniScaData method', () => {
  //       const formGroup = component.initScaData();
  //       const data = {
  //           scaMethod: 'EMAIL',
  //           methodValue: '',
  //           staticTan: '',
  //           usesStaticTan: ''
  //       };
  //       expect(formGroup.value).toEqual(data);
  //   });
  //
  //   it('should call user service when form is valid and submitted', () => {
  //       component.ngOnInit();
  //       expect(component.submitted).toBeFalsy();
  //       expect(component.updateUserForm.valid).toBeFalsy();
  //
  //       // populate form
  //       component.updateUserForm.controls['email'].setValue('dart.vader@dark-side.com');
  //       component.updateUserForm.controls['login'].setValue('dart.vader');
  //       component.updateUserForm.controls['pin'].setValue('12345678');
  //       component.updateUserForm.controls['scaUserData']['controls'][0].controls['methodValue'].setValue('dart.vader@dark-side.com');
  //       component.updateUserForm.controls['scaUserData']['controls'][0].controls['staticTan'].setValue('12345');
  //       component.updateUserForm.controls['scaUserData']['controls'][0].controls['usesStaticTan'].setValue(true);
  //
  //
  //       // create spies and fake call function
  //       const sampleResponse = {value: 'sample response'};
  //       let updateUserDetail = spyOn(userService, 'updateUserDetails').and.callFake(() => of(sampleResponse));
  //       let navigateSpy = spyOn(router, 'navigateByUrl');
  //       component.onSubmit();
  //       expect(component.submitted).toBeTruthy();
  //       expect(component.updateUserForm.valid).toBeTruthy();
  //       expect(updateUserDetail).toHaveBeenCalled();
  //       expect(navigateSpy).toHaveBeenCalledWith('/users/all');
  //   });

});
