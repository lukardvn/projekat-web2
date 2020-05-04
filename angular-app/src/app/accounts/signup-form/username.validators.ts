import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') != -1)
            return { cannotContainSpace: true }
        return null;
    }

    //Ovde ide poziv serveru, recimo da se proveri da li username vec postoji. Poziv serveru je asinhrona operacija, neblokirajuca.
    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value == 'Luka')
                    resolve ({ shouldBeUnique: true });
                else resolve (null);
            }, 2000);
        });  
    }
}