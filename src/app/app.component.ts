import { Component } from '@angular/core';
import { faUser, faDollarSign, faCandyCane, faTag, faCheck, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularEcobot';
  faUser = faUser;
  faDollarSign = faDollarSign;
  faCandyCane = faCandyCane;
  faTag = faTag;
  faCheck = faCheck;
  faShoppingBag = faShoppingBag;
}
