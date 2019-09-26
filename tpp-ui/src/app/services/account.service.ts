import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { AccountReport } from "../models/account-report";
import { Amount } from '../models/amount.model';
import { GrantAccountAccess } from '../models/grant-account-access.model';


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private url = `${environment.tppBackend}`;

    constructor(private http: HttpClient) {}

    getAccounts() {
        return this.http.get(this.url + '/accounts');
    }

    getAccount(id: String) {
        return this.http.get(this.url + '/accounts/' + id);
    }

    getAccountReport(id: String): Observable<AccountReport> {
        return this.http.get<AccountReport>(this.url + '/accounts/report/' + id);
    }

    createAccount(userId: string, account: Account) {
        return this.http.post(this.url + '/accounts', account, {
            params: {userId: userId}
        });
    }

    depositCash(accountId: string, amount: Amount) {
        return this.http.post(this.url + '/accounts/' + accountId + '/deposit-cash', amount);
    }

    updateAccountAccessForUser(accountAccess: GrantAccountAccess) {
        return this.http.put(this.url + '/accounts/access', accountAccess);
    }
}
