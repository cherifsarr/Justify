import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { Mplocation } from '../../../../shared/models/mplocation';
import { STATES } from '../../../../shared/utils/states-titlecase';
import { MpLocationsService } from '../services/mp-locations.service';
import {MPProfileService} from "../services/mp-profile.service";
import {MPProfile} from "../../../../shared/models/mpprofile";
import { BusinessEntity } from '../../../../shared/models/business-entity';
import {MPValidatorService} from "../services/mp-validators.service";

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

  @Output() listMPLocations = new EventEmitter<any>();

   idLocation: string;
  public states = STATES;

  constructor(
      router: ActivatedRoute,
      private formBuilder: FormBuilder,
      private mpLocationsService: MpLocationsService,
      private mpProfileService: MPProfileService
  )
  {
      this.router = router;

      this.form = formBuilder.group({
          name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          contact: [''],
          email: ['', MPValidatorService.emailValidator],
          phone: ['', Validators.compose([Validators.required, MPValidatorService.numberValidator])],
          address1: ['', Validators.required],
          address2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.compose([Validators.required, MPValidatorService.numberValidator])]
      });

      this.mpLocation = new Mplocation();
      this.mpProfile = new MPProfile();

  }

  ngOnInit() {
      /**
       * get parent id = id Pm Profile
       */
    let sub2 = this.router.parent.params.subscribe(parentParams => {
            this.id =  parentParams.id;
    });
    this.sub = this.router.params.subscribe(params => {
        if(params['idLocation']){
            this.isAnUpdate = true;
            this.idLocation = params['idLocation']
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

                    this.mpLocation = resp;
                    }
                )
        }
        else {this.isAnUpdate = false}
    
      });
  }


  public onSubmit(values: Object): void {

      if (this.form.valid) {
          this.mpLocation.name = this.form.get('name').value;
          this.mpLocation.address1 = this.form.get('address1').value;
          this.mpLocation.city = this.form.get('city').value;
          this.mpLocation.state = this.form.get('state').value;
          this.mpLocation.zip = this.form.get('zip').value;
          this.mpLocation.phone = this.form.get('phone').value;
          this.mpLocation.contact = this.form.get('contact').value;
          this.mpLocation.email = this.form.get('email').value;
          this.mpLocation.mpProfileId = this.id;
          if (!this.isAnUpdate) {
            this.mpLocationsService.createLocation(this.mpLocation)
            .subscribe(resp=>{
                this.form.reset();
            },
                ()=>{

                },
                ()=>{
                    this.mpLocationsService.getMPLocationsByIdProfil(this.id)
                        .subscribe(resp=>{
                            this.listMPLocations.emit(resp)
                        });
                }

            );

          }
          else {
            this.mpLocationsService.updateLocation(this.mpLocation)
            .subscribe(resp=>{
                
            })
          }
          
      }

  }

  public cancelme(e) {
      e.preventDefault();
  }
}
