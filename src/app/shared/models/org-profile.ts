import { BusinessEntity } from "./business-entity";

export class LogoImage {
    filename: string;
    filetype: string;
    value: string;
}
export class OrgProfile {
    id: string;
    businessEntityId: string;
    businessEntity: BusinessEntity;
    uniqueName: string;
    logoUrl: string;
    customDomain: string;
    logoImage: LogoImage;
    constructor() {
        this.businessEntity = new BusinessEntity();
    }
}
