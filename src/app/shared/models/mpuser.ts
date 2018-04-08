import { MPProfile } from "./mpprofile";
import { Mplocation } from "./mplocation";
import { AppUser } from "./appUser";
import { AppRole } from "./appRole";

export class MpUser {
    id: string;
    identityId: string;
    identity: AppUser;
    roleId: string;
    role:AppRole;
    mpProfileId: string;
    mpProfile: MPProfile;
    mpLocationId: string;
    location: Mplocation;
    npi: string;
    title: string;
    enabled: boolean;
    lockedOut: boolean;
    sendActivationEmail: boolean;
    forcePasswordChange: boolean;
}
