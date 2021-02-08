import Roles from 'src/security/roles';

const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
      },
      processCreate: {
        id: 'processCreate',
        allowedRoles: [roles.admin] 
      },
      processEdit: {
        id: 'processEdit',
        allowedRoles: [roles.admin] 
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
