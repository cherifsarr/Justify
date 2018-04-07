export class MPValidatorService {

  /**
   * email validator
   * @param control 
   */
  static emailValidator(control): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
  }

  /**
   * Websaite validator
   * @param control - website control
   */
  static websiteValidator(control): {[key: string]: any} {
    var websiteRegexp = /(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.+$/;    
    if (control.value && !websiteRegexp.test(control.value)) {
        return {invalidUrl: true};
    }
  }

  /**
   * number validator
   * @param control 
   */
  static numberValidator(control): {[key: string]: any} {
    var onlyNumberRegexp = /.*[^0-9].*/;  
    if (control.value && onlyNumberRegexp.test(control.value)) {
        return {invalidNumber: true};
    }
  }
  /**
   * zip code validator
   * @param control 
   */
  static zipCodeValidator(control): {[key: string]: any} {
    var zipCodeRegexp = /^\d{5}(-?\d{4})?$/;  
    if (control.value && zipCodeRegexp.test(control.value)) {
        return {invalidZipCode: true};
    }
  }
}