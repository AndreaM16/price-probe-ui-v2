import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})

export class HeaderbarComponent {

  constructor(private router: Router) { }

  goToHomePage() {
    this.router.navigate(['app/home']);
  }

}
