import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { Mplocation } from '../../../../shared/models/mplocation';
import { STATES } from '../../../../shared/utils/states-titlecase';
import { MpLocationsService } from '../services/mp-locations.service';
@Component({
  selector: 'ahs-mp-editlocation',
  templateUrl: './mp-editlocation.component.html',
  styleUrls: ['./mp-editlocation.component.scss']
})
export class MpEditlocationComponent implements OnInit {
  public form: FormGroup;
  id: string;
  private sub: any;
  public router: ActivatedRoute;

  public name: AbstractControl;
  public contact: AbstractControl;
  public email: AbstractControl;
  public phone: AbstractControl;
  public fax: AbstractControl;
  public address1: AbstractControl;
  public address2: AbstractControl;
  public city: AbstractControl;
  public state: AbstractControl;
  public zip: AbstractControl;
  public createdAt: string;
  public createdBy: string;

  private mpLocation: Mplocation;
  public states = STATES;

  constructor(router: ActivatedRoute, private formBuilder: FormBuilder, private mpLocationsService: MpLocationsService) {

      this.router = router;

      this.form = formBuilder.group({
          name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          contact: ['', Validators.required],
          email: [''],
          phone: ['', Validators.required],
          fax: ['', Validators.required],
          address1: ['', Validators.required],
          address2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required]
      });

      this.mpLocation = new Mplocation();
  }

  ngOnInit() {
      this.sub = this.router.params.subscribe(params => {
          this.id = params['id'];
          console.log(this.id);
      });
  }

  public onSubmit(values: Object): void {

      if (this.form.valid) {

          this.mpLocation.id = this.id;
          this.mpLocation.name = this.form.get('name').value;
          this.mpLocation.address1 = this.form.get('address1').value;
          this.mpLocation.city = this.form.get('city').value;
          this.mpLocation.state = this.form.get('state').value;
          this.mpLocation.zip = this.form.get('zip').value;
          this.mpLocation.phone = this.form.get('phone').value;
          this.mpLocation.fax = this.form.get('fax').value;
          this.mpLocation.contact = this.form.get('contact').value;
          this.mpLocation.email = this.form.get('email').value;

          console.log(this.mpLocation);
          //this. mpLocationsService.createLocation(this.mpLocation);
      }

  }

  public cancelme(e) {
      e.preventDefault();
  }
}
