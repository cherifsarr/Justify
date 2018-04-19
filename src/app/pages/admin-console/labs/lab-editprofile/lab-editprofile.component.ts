import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MPValidatorService } from '../../mp-profile/services/mp-validators.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { LabProfileService } from '../services/lab-profile.service';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { CommonService } from '../../../../shared/utils/common.service';
import { STATES } from '../../../../shared/utils/states-titlecase';


@Component({
  selector: 'ahs-lab-editprofile',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './lab-editprofile.component.html',
  styleUrls: ['./lab-editprofile.component.scss',
              '../../../../theme/styles/table-styling.scss',
              '../../../../theme/styles/AhsStyles.css'
            ]
})

export class LabEditprofileComponent implements OnInit {

  // Image related
  public image: any;
  isUpdate: boolean;
  loading: boolean;
  defaultLogo = 'assets/img/app/no-image.png';
  public logoImage: AbstractControl;
  public logoUrl: string;
  sub: any;
  form: FormGroup;
  svcCMN: CommonService; 
  public states = STATES;
  labProfile: LabProfile;
  idLab:string;
  constructor(oCS: CommonService, formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private labProfileService: LabProfileService) { 
    this.isUpdate = false;
    this.form = formBuilder.group({
      labName: ['', Validators.required],
      displayName: ['', Validators.required],
      logo: [''],
      phone: ['', Validators.required],
      fax: ['', Validators.compose([Validators.required, MPValidatorService.numberValidator])],
      ownerName: [''],
      ownerEmail: ['',  MPValidatorService.emailValidator],
      ownerPhone: [''],
      billingName: ['', Validators.required],
      billingEmail: ['', Validators.compose([Validators.required, MPValidatorService.emailValidator])],
      billingPhone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{5}(-?\d{4})?$/)])],
      website: ['', MPValidatorService.websiteValidator],
      logoImage: null
    })

    this.svcCMN = oCS;
    this.labProfile = new LabProfile();
  }

  ngOnInit() {
    this.logoUrl = this.defaultLogo;
    this.sub = this.route.params.subscribe(params => {
      if(params.id) {
        console.log(params);
        this.isUpdate = true;
        this.idLab = params.id;
        this.setLabProfile(params.id);
      }
    })
  }
  
  /**
   * Save or Update Lab Profile 
   * @param form  
   */
  onFormSubmit(form){
    console.log(form);
    this.loading = true;
    this.labProfile.orgProfileId = '680b4638-e23c-4bd6-72cd-08d58e2d9e43';
    this.labProfile.businessEntity.name = form.labName;
    this.labProfile.businessEntity.displayName = form.displayName;
    this.labProfile.logoImage = form.logoImage ? form.logoImage : null;
    this.labProfile.businessEntity.phone = form.phone;
    this.labProfile.businessEntity.fax = form.fax;
    this.labProfile.ownerName = form.ownerName;
    this.labProfile.ownerEmail = form.ownerEmail;
    this.labProfile.ownerPhone = form.ownerPhone;
    this.labProfile.billingName = form.billingName;
    this.labProfile.billingEmail = form.billingEmail;
    this.labProfile.billingPhone = form.billingPhone;
    this.labProfile.businessEntity.address1 = form.address;
    this.labProfile.businessEntity.city = form.city;
    this.labProfile.businessEntity.state = form.state;
    this.labProfile.businessEntity.zip = form.zip
    this.labProfile.businessEntity.website = form.website;
    this.labProfile.businessEntity.email = form.ownerEmail;
    this.labProfile.taxPayerId = '1236485';

    if (this.isUpdate){
      this.labProfileService.updateLabProfile(this.labProfile)
       .subscribe(
         (resp: LabProfile) => {
           this.loading = false
          },
         () => {this.loading = false},
         () => {
            this.loading = false;
         }
      )
    }
    else {
      this.labProfileService.saveLabProfile(this.labProfile)
       .subscribe(
         (labprofile: LabProfile) => {
           this.loading = false;
           if (labprofile) {
            this.router.navigate(['../editlabprofile', labprofile.id], {relativeTo: this.route})
           }
         },
         () => {this.loading = false;},
         () => {this.loading = false;}
       )
    }
  }

  /**
   * set form update
   * @param id - LabProfileId
   */
  setLabProfile(id: string) {
    this.labProfileService.getLabProfileById(id)
      .subscribe((labprofile: LabProfile) => {
        this.form.get('labName').setValue(this.svcCMN.GetString(labprofile.businessEntity.name));
        this.form.get('displayName').setValue(this.svcCMN.GetString(labprofile.businessEntity.displayName));
        this.logoUrl = this.svcCMN.GetString(labprofile.logoUrl);
        this.form.get('phone').setValue(this.svcCMN.GetString(labprofile.businessEntity.phone));
        this.form.get('fax').setValue(this.svcCMN.GetString(labprofile.businessEntity.fax));
        this.form.get('billingName').setValue(this.svcCMN.GetString(labprofile.billingName));
        this.form.get('billingEmail').setValue(this.svcCMN.GetString(labprofile.billingEmail));
        this.form.get('billingPhone').setValue(this.svcCMN.GetString(labprofile.billingPhone));
        this.form.get('address').setValue(this.svcCMN.GetString(labprofile.businessEntity.address1));
        this.form.get('city').setValue(this.svcCMN.GetString(labprofile.businessEntity.city));
        this.form.get('state').setValue(this.svcCMN.GetString(labprofile.businessEntity.state));
        this.form.get('zip').setValue(this.svcCMN.GetString(labprofile.businessEntity.zip));
        this.form.get('website').setValue(this.svcCMN.GetString(labprofile.businessEntity.website));

        if(!labprofile.logoUrl){this.logoUrl = this.defaultLogo}

        this.labProfile = labprofile;
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
   * remove image
   */
  removeImage(): void {
      this.image = '';
  }
  
  /**
   * Redirect to edit lab profile view
   */
  onLabProfile() {
    if (this.idLab) {
      this.router.navigate(['./editlabprofile', this.idLab], {relativeTo: this.route, skipLocationChange:true})
    }
     else {
      this.router.navigate(['../listlabprofiles'], {relativeTo: this.route})
     }
  }
  /**
   * Redirect to list of locations route
   */
  onLabUsers() {
    this.router.navigate([{ outlets: { userOutlet: [ 'listlabusers' ] }}], {relativeTo: this.route, skipLocationChange:true})
  }
  /**
   * Redirect to list of users route
   */
  onLabPrerefence() {
    this.router.navigate([{ outlets: { preferenceOutlet: [ 'labpreference' ] }}], {relativeTo: this.route, skipLocationChange:true})
  }

  /** Unsubscribe */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
