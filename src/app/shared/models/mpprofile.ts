import { BusinessEntity } from "./business-entity";
import { LabProfile } from "./lab-profile";
import { OrgProfile } from "./org-profile";

export class LogoImage {
    filename: string;
    filetype: string;
    value: string;
}
export class MPProfile {
    id: string;
    businessEntityId: string;
    businessEntity: BusinessEntity;
    labProfileId: string;
    lab: LabProfile;
    org: OrgProfile;
    npi: string;
    taxPayerId: string;
    testRights: number;
    logoUrl: string;
    logoImage: LogoImage;
}