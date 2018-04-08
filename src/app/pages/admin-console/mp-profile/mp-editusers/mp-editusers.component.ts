import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ahs-mp-editusers',
  templateUrl: './mp-editusers.component.html',
  styleUrls: ['./mp-editusers.component.scss']
})
export class MpEditusersComponent implements OnInit {

  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      title: ['', Validators.required],
      isEnabled: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      locked: ['', Validators.required],
      sendActivationMail: ['', Validators.required],
      passwordChange: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

}
