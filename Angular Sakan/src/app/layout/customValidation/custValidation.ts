import { FormRegisterService } from 'src/app/service/form-register.service';
import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export class FormLoginValidation {

    constructor(private registerServ: FormRegisterService) {
    }

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true };
        } else {
            return null;
        }
    }


    static checkEmailExist(control: AbstractControl): Promise<ValidationErrors | null> {
       // console.log(control.value);
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value !== 'hany.saad22@gmail.com') {
                    resolve({ checkEmailExist: true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }

    static checkPasswordExist(control: AbstractControl): Promise<ValidationErrors | null> {
       // console.log(control.value);
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value !== '123456789') {
                    resolve({ checkPasswordExist: true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }

}
