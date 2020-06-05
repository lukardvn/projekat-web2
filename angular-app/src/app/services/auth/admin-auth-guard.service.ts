import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate() { //ovo se izvrsava samo ako je neko ulogovan, jer je u routes.ts authguard pre adminauthguard pa se tek onda proverava koji je tip korisnika
    let user = this.authService.currentUser;
    if (user && user.role === "admin") return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
 