/*export class Role {
}
*/


/*export class Role {
    id: string;
    name: string;
    scopeahs: number;
    scopelab: number;
    scopemp: number;
    custom: boolean;
    enabled: number;
}*/


export class Role {
    id: string;
    name: string;
    orgLevel: boolean;
    labLevel: boolean;
    mpLevel: boolean;
    custom: boolean;
    enabled: boolean;
}
export class RolePermission {
    id: string;
    roleId: string;
    featureId: string;
    featureName: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}


export class RoleDetail {
    //role: Role;
    id: string;
    name: string;
    orgLevel: boolean;
    labLevel: boolean;
    mpLevel: boolean;
    custom: boolean;
    enabled: boolean;
    permissions: RolePermission[];
}