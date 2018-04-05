import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'ahs-mp-editprofile',
  templateUrl: './mp-editprofile.component.html',
  styleUrls: ['./mp-editprofile.component.scss']
})
export class MpEditprofileComponent implements OnInit {
  public form: FormGroup;
  constructor(formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      npi: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
      contactName: ['', Validators.required],
      email: [''],
      testRights: [''],
      website: ['']

    })
   }

   onFormSubmit(form) {

   }
  ngOnInit() {
  }

}
