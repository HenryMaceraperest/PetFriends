import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


export const canDeactivate: CanDeactivateFn<MemberEditComponent> = (component: MemberEditComponent) => {
  if (component.editForm?.dirty) {
    return confirm('Are you sure you want to continue? All unsaved changes will be lost.')
  };
  return true;
}