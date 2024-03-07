import { AbstractControl } from "@angular/forms";

export class PasswordValidator {
  static passwordValidator(control: AbstractControl) {
    const newPassword: string = control.get("newPassword")?.value;
    const currentPassword: string = control.get("currentPassword")?.value;

    if (newPassword === currentPassword) {
      control.get("newPassword")?.setErrors({ passwordValidator: true });
    }
  }
  static newPasswordValidator(control: AbstractControl) {
    const newPassword: string = control.get("newPassword")?.value;
    const confirmPassword: string = control.get("confirmPassword")?.value;

    if (newPassword !== confirmPassword) {
      control.get("confirmPassword")?.setErrors({ newPasswordValidator: true });
    }
  }
}
