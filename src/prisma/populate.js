const {PrismaClient, Prisma} = require('@prisma/client');
const fs = require('fs').promises;

const roleData = [{name: 'Admin'}, {name: 'User'}, {name: 'Guest'}];

const permData = [
  {name: 'Console', description: 'Console access for admins', action: 'ALL'},
  {name: 'View', description: 'View publications', action: 'READ'},
  {name: 'Post', description: 'Post publications', action: 'WRITE'},
  {name: 'Modify', description: 'Edit publications', action: 'EDIT'},
  {name: 'Remove', description: 'Delete publications', action: 'DELETE'}
];

const permRoleData = [
  {permission_id: 1, role_id: 1},
  {permission_id: 2, role_id: 2},
  {permission_id: 3, role_id: 2},
  {permission_id: 4, role_id: 2},
  {permission_id: 5, role_id: 2},
  {permission_id: 2, role_id: 3}
];

const statusData = [
  {name: 'ACTIVE'},
  {name: 'INACTIVE'},
  {name: 'PENDING_VERIFICATION'},
  {name: 'DISABLED'},
  {name: 'BLOCKED'}
];

async function populate() {
    const role = new PrismaClient().role;
    const perm = new PrismaClient().permission;
    const permRole = new PrismaClient().permissionInRole;
    const status = new PrismaClient().status;
    
  
    await role.createMany({
      data: roleData,
      skipDuplicates: true
    });
  
    await perm.createMany({
      data: permData,
      skipDuplicates: true
    });
  
    await permRole.createMany({
      data: permRoleData,
      skipDuplicates: true
    });
  
    await status.createMany({
      data: statusData,
      skipDuplicates: true
    });
  
  }
  
  populate()
    .then(() => {
      console.log('Registers inserted');
    })
    .catch(async (e) => {
      await fs.writeFile('polulate.log', e.message);
      throw e;
    });