import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES } from '../../../../shared/utils/states-titlecase';
import { Ancillary } from '../../../../shared/utils/ancillary.enum';
import { MPProfile } from '../../../../shared/models/mpprofile';
import { LabProfileService } from '../services/lab-profile.service';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { MPProfileService } from '../services/mp-profile.service';
import { BusinessEntity } from '../../../../shared/models/business-entity';
import {ActivatedRoute, Router} from "@angular/router";
import { MPValidatorService } from '../services/mp-validators.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { CommonService } from '../../../../shared/utils/common.service';
@Component({
  selector: 'ahs-mp-editprofile',
  encapsulation: ViewEncapsulation.None,
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
  public isUpdate: boolean ;
  orgProfileId: string;
  loading: boolean;
  // Image related
  public image: any;
  public logoUrl: string;
  defaultLogo:string = 'assets/img/app/no-image.png';
  constructor(private oCS: CommonService, private router: ActivatedRoute, private route: Router, formBuilder: FormBuilder, private mpProfileService: MPProfileService, private labProfileService: LabProfileService) {

    this.form = formBuilder.group({
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{5}(-?\d{4})?$/)])],
      npi: ['', Validators.required],
      phone: ['',  Validators.required],
      fax: ['', Validators.compose([Validators.required, MPValidatorService.numberValidator])],
      contactName: ['', Validators.required],
      email: ['', MPValidatorService.emailValidator],
      testRights: [''],
      testRightsPGx: [''],
      testRightsCancer: [''],
      testRightsToxicology: [''],
      website: ['', MPValidatorService.websiteValidator],
      logo: [''],
      logoImage: null
    });
    this.mpProfile = new MPProfile();
    this.mpProfile.businessEntity = new BusinessEntity();
    this.labProfile = new LabProfile();
    this.isUpdate = true;
    this.loading = false;
   }
 
   /**
    * Create MPProfile
    * @param form - MPProfile form builder
    */
   onFormSubmit(form) {
     this.loading = true;
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
     this.mpProfile.testRights = 0 ;
     this.mpProfile.logoImage = form.logoImage ? form.logoImage : null;
     if(form.testRightsPGx) {
       this.mpProfile.testRights += this.testRight.PGx;
     }
     if(form.testRightsCancer) {
      this.mpProfile.testRights += this.testRight.Cancer;
     }
     if(form.testRightsToxicology) {
      this.mpProfile.testRights += this.testRight.Toxicology;
     }
     this.mpProfile.businessEntity.website = form.website;
     this.mpProfile.npi = form.npi;
     //this.mpProfile.lab.logoUrl = form.logo;
     this.mpProfile.labProfileId = this.labProfile.id;
     this.mpProfile.taxPayerId = null;
     //if create new MP Profile
     if(!this.isUpdate) {
      this.mpProfileService.saveMPProfile(this.mpProfile).subscribe(resp => {
        if (resp) {
          this.loading = false;
          this.route.navigate(['../edit',resp.id], {relativeTo: this.router})
        }
      }, () => {this.loading = false;}, () => {this.loading = false;})
     }
     else {
       //if update MP Profile
      this.mpProfileService.updateMPProfile(this.mpProfile)
        .subscribe(resp => {
          this.loading = false;
          //this.form.reset();
        })
     }
     
   }
  ngOnInit() {
    this.logoUrl = this.defaultLogo;
    this.sub = this.router.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        this.setMPProfile(this.id);
        this.isUpdate = true;
        
      }
      else {
        this.isUpdate = false;
      }
    });

    this.labProfileService.getOrgProfileId()
          .subscribe((resp: string) => {
              this.orgProfileId = resp;
          },()=>{}, ()=>{
              this.labProfileService.getLabProfiles(this.orgProfileId)
                  .subscribe(resp => {
                      this.labProfiles = resp;
                  })
    })

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
         // this.form.get('testRights').setValue(mpProfile.testRights);
          this.form.get('website').setValue(mpProfile.businessEntity.website);
          this.logoUrl = this.oCS.GetString(mpProfile.logoUrl);
          mpProfile.testRights === this.testRight.PGx ? this.isCheckedPgx = true : this.isCheckedPgx = false;
          mpProfile.testRights === this.testRight.Cancer ? this.isCheckedCan = true : this.isCheckedCan = false;
          mpProfile.testRights === this.testRight.Toxicology ? this.isCheckedTox = true : this.isCheckedTox = false;
          
          if (mpProfile.testRights == (this.testRight.PGx + this.testRight.Cancer)) {
             this.form.get('testRightsPGx').setValue(this.testRight.PGx);
             this.form.get('testRightsCancer').setValue(this.testRight.Cancer);
          }
          if (mpProfile.testRights == (this.testRight.PGx + this.testRight.Toxicology)) {
            this.form.get('testRightsPGx').setValue(this.testRight.PGx);
            this.form.get('testRightsToxicology').setValue(this.testRight.Toxicology);
          }
          if (mpProfile.testRights == (this.testRight.Cancer + this.testRight.Toxicology)) {
            this.form.get('testRightsCancer').setValue(this.testRight.Cancer);
            this.form.get('testRightsToxicology').setValue(this.testRight.Toxicology);
          }

          if (mpProfile.testRights == (this.testRight.Cancer + this.testRight.Toxicology + this.testRight.PGx)) {
            this.form.get('testRightsPGx').setValue(this.testRight.PGx);
            this.form.get('testRightsCancer').setValue(this.testRight.Cancer);
            this.form.get('testRightsToxicology').setValue(this.testRight.Toxicology);
          }
          if (!mpProfile.logoUrl) {
            this.logoUrl = this.defaultLogo;
          }
          this.mpProfile = mpProfile;
      })
  }
   // Image related
   fileChange(input) {
    const reader = new FileReader();
    if (input.files.length) {
        const file = input.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.image = reader.result;
            this.form.get('logoImage').setValue({
                filename: file.name,
                filetype: file.type,
                value: reader.result.split(',')[1]
            });
            this.logoUrl = reader.result.split(',')[1];
        }
    }
}
  /**
   * Set logo
   * @param image - logo image base64
   */
  onLogo(image: any) {
  //console.log(JSON.parse(image))
    this.form.get('logo').setValue(image);
  }
  cancelme(e) {
    e.preventDefault();
  }

  /**
   * Redirect to list of locations route
   */
  onLocation() {
    this.route.navigate([{ outlets: { locationOutlet: [ 'listlocations' ] }}], {relativeTo: this.router, skipLocationChange:true})
  }
  /**
   * Redirect to list of users route
   */
  onUsers() {
    this.route.navigate([{ outlets: { userOutlet: [ 'listusers' ] }}], {relativeTo: this.router, skipLocationChange:true})
  }
}
