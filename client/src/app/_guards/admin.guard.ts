import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const adminCanActivate: CanActivateFn = () => {
  const toastr = inject(ToastrService);
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map(user => {
      if (!user) return false;
      if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
        return true;
      } else {
        toastr.error('Off-limits for standard users!')
        return false;
      }
    })
  );
}
