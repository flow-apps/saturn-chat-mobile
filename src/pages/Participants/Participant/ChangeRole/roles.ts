export default {
  participant: {
    name: "Participante",
    description: "Este cargo não dá poderes especiais ao participante.",
    permissions: {
      create_invites: false,
      punish_members: false,
      manage_roles: false,
      manage_messages: false,
      edit_group: false,
      delete_group: false
    },
  },
  mod: {
    name: "Moderador",
    description: "Os moderadores são os que cuidam da segurança do grupo.",
    permissions: {
      create_invites: false,
      punish_members: true,
      manage_roles: false,
      manage_messages: true,
      edit_group: false,
      delete_group: false
    },
  },
  manager: {
    name: "Gerente",
    description: "Os gerentes ajudam a gerenciar o grupo e a trazer novos usuários.",
    permissions: {
      create_invites: true,
      punish_members: false,
      manage_roles: true,
      manage_messages: false,
      edit_group: true,
      delete_group: false
    },
  },
  admin: {
    name: "Administrador",
    description: "Permite que o participante tenha os mesmos poderes do dono do grupo.",
    permissions: {
      create_invites: true,
      punish_members: true,
      manage_roles: true,
      manage_messages: true,
      edit_group: true,
      delete_group: true
    },
  }
}