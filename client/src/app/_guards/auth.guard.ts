import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';

export const canActivate: CanActivateFn = () => {
      const toastr = inject(ToastrService);
      const accountService = inject(AccountService);
      return accountService.currentUser$.pipe(
        map(user => {
          if (user) return true;
          else {
            toastr.error('You need to be logged in to view this!');
            return false;  
          }
        })
      );
}
