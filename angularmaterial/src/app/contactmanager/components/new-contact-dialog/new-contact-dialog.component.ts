import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars= [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];
  user: User;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = new User();
  }
  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
  
  save() {
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    })
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
