import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES } from '../../../../shared/utils/states-titlecase';
import { Ancillary } from '../../../../shared/utils/ancillary.enum';
import { MPProfile } from '../../../../shared/models/mpprofile';
import { LabProfileService } from '../services/lab-profile.service';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { MPProfileService } from '../services/mp-profile.service';
import { BusinessEntity } from '../../../../shared/models/business-entity';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ahs-mp-editprofile',
  templateUrl: './mp-editprofile.component.html',
  styleUrls: ['./mp-editprofile.component.scss']
})
export class MpEditprofileComponent implements OnInit {
  public form: FormGroup;
  public states = STATES;
  public testRight = Ancillary
  private mpProfile: MPProfile;
  private labProfiles:LabProfile[];
  private labProfile: LabProfile;
  private id: string;
  private sub: any;
  public isCheckedPgx:boolean = false;
  public isCheckedCan:boolean = false;
  public isCheckedTox:boolean = false;
  constructor(private router: ActivatedRoute, formBuilder: FormBuilder, private mpProfileService: MPProfileService, private labProfileService: LabProfileService) {

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
      website: [''],
      logo: ['']

    });
    this.mpProfile = new MPProfile();
    this.mpProfile.businessEntity = new BusinessEntity();
    this.labProfile = new LabProfile();
   }

   /**
    * Create MPProfile
    * @param form - MPProfile form builder
    */
   onFormSubmit(form) {
     this.labProfile = this.labProfiles.length > 0 ? this.labProfiles[0] : null 
     this.mpProfile.businessEntity.name = form.name;
     this.mpProfile.businessEntity.displayName = form.displayName;
     this.mpProfile.businessEntity.address1 = form.address
     this.mpProfile.businessEntity.city = form.city;
     this.mpProfile.businessEntity.state = form.state;
     this.mpProfile.businessEntity.zip = form.zip;
     this.mpProfile.businessEntity.phone = form.phone;
     this.mpProfile.businessEntity.fax = form.fax;
     this.mpProfile.businessEntity.contactName = form.contactName;
     this.mpProfile.businessEntity.email = form.email;
     this.mpProfile.testRights = form.testRights;
     this.mpProfile.businessEntity.website = form.website;
     this.mpProfile.npi = form.npi;
     //this.mpProfile.lab.logoUrl = form.logo;
     this.mpProfile.labProfileId = this.labProfile.id;
     this.mpProfile.lab = null;
     this.mpProfile.taxPayerId = null;

     this.mpProfileService.saveMPProfile(this.mpProfile)
       .subscribe((resp) => {
         
       })
   }
  ngOnInit() {
    this.getLabProfile();
      this.sub = this.router.params.subscribe(params => {
        if(params['id']) {
          this.id = params['id'];
          this.setMPProfile(this.id);
        }
      });
  }
  
  /**
   * Set MPProfile in form
   * @param id - id MPProfile
   */
  setMPProfile(id: string) {
    this.mpProfileService.getMPProfileById(id)
      .subscribe((mpProfile:MPProfile) => {
          this.form.get('name').setValue(mpProfile.businessEntity.name);
          this.form.get('displayName').setValue(mpProfile.businessEntity.displayName);
          this.form.get('address').setValue(mpProfile.businessEntity.address1);
          this.form.get('city').setValue(mpProfile.businessEntity.city);
          this.form.get('state').setValue(mpProfile.businessEntity.state);
          this.form.get('zip').setValue(mpProfile.businessEntity.zip);
          this.form.get('npi').setValue(mpProfile.npi);
          this.form.get('phone').setValue(mpProfile.businessEntity.phone);
          this.form.get('fax').setValue(mpProfile.businessEntity.fax);
          this.form.get('contactName').setValue(mpProfile.businessEntity.contactName);
          this.form.get('email').setValue(mpProfile.businessEntity.email);
          this.form.get('testRights').setValue(mpProfile.testRights);
          this.form.get('website').setValue(mpProfile.businessEntity.website);
          mpProfile.testRights === this.testRight.PGx ? this.isCheckedPgx = true : this.isCheckedPgx = false;
          mpProfile.testRights === this.testRight.Cancer ? this.isCheckedCan = true : this.isCheckedCan = false;
          mpProfile.testRights === this.testRight.Toxicology ? this.isCheckedTox = true : this.isCheckedTox = false;
      })
  }
  /**
   * get Lab Profile
   */
  getLabProfile() {
    this.labProfileService.getLabProfiles()
    .subscribe(resp => {
       this.labProfiles = resp;
    })
  }
  /**
   * Set logo
   * @param image - logo image base64
   */
  onLogo(image: any) {
    this.form.get('logo').setValue(image);
  }
  cancelme(e) {
    e.preventDefault();
  }
}
