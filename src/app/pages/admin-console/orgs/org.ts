//export class Org {
//}



/*export class Org {
    id: string;
    name: string;
    displayName: string;
    level: string;
    contactName: string;
    email: string;
    phone: string;
    fax: string;
    website: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdAt: string;
    createdBy: string
    enabled: boolean;
}*/

export class LogoImage {
    filename: string;
    filetype: string;
    value: string;
}

export class Org {
    id: string;
    businessEntityId: string;
    public businessEntity: BusinessEntity;
    uniqueName: string;
    logoUrl: string;
    customDomain: string;
    logoImage: LogoImage;
    constructor() {
        this.id = this.businessEntityId = this.uniqueName = this.logoUrl = this.customDomain = '';
        this.businessEntity = new BusinessEntity();
    }
}



export class BusinessEntity {
    businessEntityId: string;
    name: string;
    displayName: string;
    level: number;
    contactName: string;
    email: string;
    phone: string;
    fax: string;
    website: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    id: string;
    createdAt: string;
    createdBy: string;
}




export class OrgLabs {

    // xxxx add code here
    enabled: boolean;
}



export class Lab {
    // xxxx add code here
    enabled: boolean;
}



export class LabUsers {
    // xxxx add code here
    enabled: boolean;
}



export class User {
    // xxxx add code here
    enabled: boolean;
}