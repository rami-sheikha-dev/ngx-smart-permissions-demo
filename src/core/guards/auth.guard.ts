import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';




export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredPermission = route.data?.['permission'];
  if (requiredPermission && !authService.getPermissions().includes(requiredPermission)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};

 
