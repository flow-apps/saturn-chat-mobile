import { ParticipantRoles } from "@type/enums"

export const rolesForEditGroup = [
  ParticipantRoles.ADMIN,
  ParticipantRoles.MANAGER,
  ParticipantRoles.OWNER
]

export const rolesForInvite = [
  ParticipantRoles.ADMIN,
  ParticipantRoles.MANAGER,
  ParticipantRoles.OWNER
]

export const rolesForDeleteGroup = [
  ParticipantRoles.ADMIN,
  ParticipantRoles.OWNER
]

export const rolesForEditConfigs = [
  ParticipantRoles.ADMIN,
  ParticipantRoles.MANAGER,
  ParticipantRoles.OWNER
]

export const rolesForDeleteMessage = [
  ParticipantRoles.ADMIN,
  ParticipantRoles.OWNER,
  ParticipantRoles.MODERATOR
]