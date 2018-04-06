import { BusinessEntity } from "../../pages/admin-console/orgs/org";
import { OrgProfile } from "./org-profile";

export class LabProfile {
    id: string;
    businessEntityId: string;
    businessEntity: BusinessEntity;
    orgProfileId: string;
    parentOrganization: OrgProfile;
    uniqueName: string;
    logoUrl: string;
    customDomain: string;
    taxPayerId: string;
    billingName: string;
    billingEmail: string;
    billingPhone: string;
    testRights: number;
}
