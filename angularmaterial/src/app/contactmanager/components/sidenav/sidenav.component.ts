import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher : MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: Boolean = false;
  direction: string = 'ltr';

  constructor(
    zone: NgZone, 
    private userService: UserService, 
    private router: Router) { }

  @ViewChild(MatSidenav) sidenav: MatSidenav
  
  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() =>{
      if (this.isScreenSmall()){
        this.sidenav.close()
      }
    })
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection() {
    this.direction = this.direction == 'ltr' ? 'rtl' : 'ltr';
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
