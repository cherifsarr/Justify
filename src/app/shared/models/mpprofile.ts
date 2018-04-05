import { BusinessEntity } from "./business-entity";
import { LabProfile } from "./lab-profile";


export class MPProfile {
    id: string;
    businessEntityId: string;
    businessEntity: BusinessEntity;
    labProfileId: string;
    lab: LabProfile;
    npi: string;
    taxPayerId: string;
    testRights: number;
}