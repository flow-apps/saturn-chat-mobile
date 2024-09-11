import i18n from "../../../../translations/index";

const getT = (path: string) => i18n.t(`ChangeRole.${path}`)

export default {
  participant: {
    name: getT("roles.participant.name"),
    description: getT("roles.participant.desc"),
    permissions: {
      create_invites: false,
      punish_members: false,
      manage_roles: false,
      manage_messages: false,
      edit_group: false,
      delete_group: false,
    },
  },
  mod: {
    name: getT("roles.mod.name"),
    description: getT("roles.mod.desc"),
    permissions: {
      create_invites: false,
      punish_members: true,
      manage_roles: false,
      manage_messages: true,
      edit_group: false,
      delete_group: false,
    },
  },
  manager: {
    name: getT("roles.manager.name"),
    description: getT("roles.manager.desc"),
    permissions: {
      create_invites: true,
      punish_members: false,
      manage_roles: true,
      manage_messages: false,
      edit_group: true,
      delete_group: false,
    },
  },
  admin: {
    name: getT("roles.admin.name"),
    description: getT("roles.admin.desc"),
    permissions: {
      create_invites: true,
      punish_members: true,
      manage_roles: true,
      manage_messages: true,
      edit_group: true,
      delete_group: true,
    },
  },
};
