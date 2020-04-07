import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountAccessManagementComponent } from './account-access-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { InfoModule } from '../../commons/info/info.module';
import { InfoService } from '../../commons/info/info.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Account, AccountStatus, AccountType, UsageType } from '../../models/account.model';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const mockRouter = {
  navigate: (url: string) => {
    console.log('mocknavigation', url);
  },
};
const mockActivatedRoute = {
  params: of({ id: '12345' }),
};

describe('AccountAccessManagementComponent', () => {
  let component: AccountAccessManagementComponent;
  let fixture: ComponentFixture<AccountAccessManagementComponent>;
  let accountService: AccountService;
  let userService: UserService;
  let infoService: InfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NgbTypeaheadModule, InfoModule, FormsModule],
      declarations: [AccountAccessManagementComponent],
      providers: [
        AccountService,
        InfoService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAccessManagementComponent);
    component = fixture.componentInstance;
    accountService = TestBed.get(AccountService);
    userService = TestBed.get(UserService);
    infoService = TestBed.get(InfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the validform of accountAccessForm in OnSumbit', () => {
    const scaWeight = 20;
    const mockAccount: Account = {
      id: 'XXXXXX',
      iban: 'DE35653635635663',
      bban: 'BBBAN',
      pan: 'pan',
      maskedPan: 'maskedPan',
      currency: 'EUR',
      msisdn: 'MSISDN',
      name: 'Pupkin',
      product: 'Deposit',
      accountType: AccountType.CASH,
      accountStatus: AccountStatus.ENABLED,
      bic: 'BIChgdgd',
      usageType: UsageType.PRIV,
      details: '',
      linkedAccounts: '',
      balances: [],
    } as Account;
    component.account = mockAccount;
    component.accountAccessForm.get('id').setValue('12345');
    component.accountAccessForm.get('scaWeight').setValue(scaWeight);
    component.accountAccessForm.get('accessType').setValue('READ');
    const getAccountSpy = spyOn(accountService, 'updateAccountAccessForUser').and.returnValue(of(undefined));
    const infoSpy = spyOn(infoService, 'openFeedback');
    component.onSubmit();
    expect(component.accountAccessForm.invalid).toBeFalsy();
    expect(getAccountSpy).toHaveBeenCalled();
    expect(infoSpy).toHaveBeenCalledWith('Access to account ' + mockAccount.iban + ' successfully granted', { duration: 3000 });
  });

  it('submitted should false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('should load the ngoninit', () => {
    component.ngOnInit();
  });

  it('accountAccessForm should be invalid when at least one field is empty', () => {
    expect(component.accountAccessForm.valid).toBeFalsy();
  });

  it('validate onSubmit method', () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
    expect(component.accountAccessForm.valid).toBeFalsy();
  });

  it('validate setupAccountAccessFormControl method', () => {
    component.setupAccountAccessFormControl();
    expect(component.accountAccessForm).toBeDefined();
  });

  it('should call the inputFormatterValue', () => {
    const mockUser: User = {
      id: 'USERID',
      email: 'user@gmail.com',
      login: 'user',
      branch: 'branch',
      pin: '12345',
      scaUserData: [],
      accountAccesses: [],
    };
    component.inputFormatterValue(mockUser);
    expect(mockUser.login).toEqual('user');
  });

  it('should return a inputFormatterValue ', () => {
    const mockUser: User = {
      id: 'USERID',
      email: 'user@gmail.com',
      login: '',
      branch: 'branch',
      pin: '12345',
      scaUserData: [],
      accountAccesses: [],
    };
    component.inputFormatterValue(null);
    expect(mockUser);
  });

  it('should call the resultFormatterValue', () => {
    const mockUser: User = {
      id: 'USERID',
      email: 'user@gmail.com',
      login: 'user',
      branch: 'branch',
      pin: '12345',
      scaUserData: [],
      accountAccesses: [],
    };
    component.resultFormatterValue(mockUser);
    expect(mockUser.login).toEqual('user');
  });

  it('should return a resultFormatterValue ', () => {
    const mockUser: User = {
      id: 'USERID',
      email: 'user@gmail.com',
      login: '',
      branch: 'branch',
      pin: '12345',
      scaUserData: [],
      accountAccesses: [],
    };
    component.resultFormatterValue(null);
    expect(mockUser);
  });

  it('should load listUsers', () => {
    const mockUsers: User[] = [
      {
        id: 'USERID',
        email: 'user@gmail.com',
        login: 'user',
        branch: 'branch',
        pin: '12345',
        scaUserData: [],
        accountAccesses: [],
      },
    ];

    spyOn(userService, 'listUsers').and.returnValue(of({ users: mockUsers }));
    component.listUsers();
    expect(component.users).toEqual(mockUsers);
  });
});
