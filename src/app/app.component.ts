import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mitwelten ML Dashboard';

  loggedIn: boolean | undefined;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.checkLogin();
    this.authService.authState.subscribe(authState => this.loggedIn = authState);
  }

  logout() {
    this.authService.logout();
  }

  private checkLogin() {
    this.authService.checkLogin().subscribe(state => this.loggedIn = state)
  }
}
