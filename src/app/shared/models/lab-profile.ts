import { BusinessEntity } from "../../pages/admin-console/orgs/org";
import { OrgProfile } from "./org-profile";

export class LogoImage {
    filename: string;
    filetype: string;
    value: string;
}

export class LabProfile {
    id: string;
    businessEntityId: string;
    businessEntity: BusinessEntity;
    orgProfileId: string;
    parentOrganization: OrgProfile;
    uniqueName: string;
    logoUrl: string;
    logoImage: LogoImage;
    customDomain: string;
    taxPayerId: string;
    billingName: string;
    billingEmail: string;
    billingPhone: string;
    testRights: number;

    constructor() {
        this.businessEntity = new BusinessEntity();
        this.parentOrganization = new OrgProfile();
    }
}
