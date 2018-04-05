import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES } from '../../../../shared/utils/states-titlecase';
@Component({
  selector: 'ahs-mp-editprofile',
  templateUrl: './mp-editprofile.component.html',
  styleUrls: ['./mp-editprofile.component.scss']
})
export class MpEditprofileComponent implements OnInit {
  public form: FormGroup;
  public states = STATES;
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
      testRightsPgx: [''],
      testRightsCancer: [''],
      testRightsToxicology: [''],
      website: ['']

    })
   }

   onFormSubmit(form) {

   }
  ngOnInit() {
  }

}
