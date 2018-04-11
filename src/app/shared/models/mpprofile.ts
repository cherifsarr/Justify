import { BusinessEntity } from "./business-entity";
import { LabProfile } from "./lab-profile";
import { OrgProfile } from "./org-profile";


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
}