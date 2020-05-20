import { UserService } from 'src/app/services/user/user.service';
import { User } from './../../../models/User';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class SignUpFormValidators {

    static CannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') != -1)
            return { cannotContainSpace: true }
        return null;
    }

    //Ovde ide poziv serveru, recimo da se proveri da li username vec postoji. Poziv serveru je asinhrona operacija, neblokirajuca.
    static ShouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value == 'Luka')
                    resolve ({ shouldBeUnique: true });
                else resolve (null);
                //PROBA DA LI USERNAME POSTOJI ASYNC
                /*let userService: UserService;
                let exists = userService.userExists(control.value).subscribe(result => {
                    console.log(result);
                });
                if (exists)
                    resolve ({ shouldBeUnique: true });
                else resolve (null);*/
            }, 2000);
        });  
    }

    static ConfirmedPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
    
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}