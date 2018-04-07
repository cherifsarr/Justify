import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { Mplocation } from '../../../../shared/models/mplocation';
import { STATES } from '../../../../shared/utils/states-titlecase';
import { MpLocationsService } from '../services/mp-locations.service';
import {MPProfileService} from "../services/mp-profile.service";
import {MPProfile} from "../../../../shared/models/mpprofile";
import { BusinessEntity } from '../../../../shared/models/business-entity';

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
  private mpProfile: MPProfile;

  private location: Mplocation;
  isAnUpdate: boolean = false;

  @Input()
   idLocation: string;

  public states = STATES;

  constructor(
      router: ActivatedRoute,
      private formBuilder: FormBuilder,
      private mpLocationsService: MpLocationsService,
      private mpProfileService: MPProfileService
  ) {

      this.router = router;

      this.form = formBuilder.group({
          name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          contact: ['', Validators.required],
          email: [''],
          phone: ['', Validators.required],
          address1: ['', Validators.required],
          address2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required]
      });

      this.mpLocation = new Mplocation();
      this.mpProfile = new MPProfile();
  }

  ngOnInit() {
      this.sub = this.router.params.subscribe(params => {
          if(params['id']){
              this.id = params['id'];
              console.log(this.idLocation);
              if(this.idLocation){
                  this.mpLocationsService.getMPLocationById(this.idLocation)
                      .subscribe(resp =>{
                          this.location = resp;
                          this.form.get('name').setValue(this.location.name);
                          this.form.get('address1').setValue(this.location.address1);
                          this.form.get('city').setValue(this.location.city);
                          this.form.get('state').setValue(this.location.state);
                          this.form.get('zip').setValue(this.location.zip);
                          this.form.get('phone').setValue(this.location.phone);
                          this.form.get('state').setValue(this.location.state);
                          this.form.get('contact').setValue(this.location.contact);
                          this.form.get('email').setValue(this.location.email);

                          }
                      )
              }

          }

      });
  }


  public onSubmit(values: Object): void {

      if (this.form.valid) {
         /* this.mpProfileService.getMPProfileById(this.id).subscribe(resp => {
              this.mpProfile = resp;
          });*/

          this.mpLocation.name = this.form.get('name').value;
          this.mpLocation.address1 = this.form.get('address1').value;
          this.mpLocation.city = this.form.get('city').value;
          this.mpLocation.state = this.form.get('state').value;
          this.mpLocation.zip = this.form.get('zip').value;
          this.mpLocation.phone = this.form.get('phone').value;
          this.mpLocation.contact = this.form.get('contact').value;
          this.mpLocation.email = this.form.get('email').value;
          this.mpLocation.mpProfileId = this.id;

          console.log(this.id);
          console.log(this.mpLocation);
         this.mpLocationsService.createLocation(this.mpLocation)
             .subscribe(resp=>{
                 this.form.reset();
             });
      }

  }

  setMPProfile(){
      this.mpLocation.mpProfile.businessEntityId = this.mpProfile.businessEntityId;
  }

  public cancelme(e) {
      e.preventDefault();
  }
}
