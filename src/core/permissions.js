export const permissionLevels = Object.freeze({
  EVERYONE: 0,
  MODERATOR: 1,
  ADMINISTRATOR: 2,
  OWNER: 3,
});

export function hasPermissionLevel(member, requiredLevel) {
  if (!member) return false;

  if (member.guild.ownerId === member.id) {
    return true;
  }

  if (member.permissions?.has('Administrator')) {
    return requiredLevel <= permissionLevels.ADMINISTRATOR;
  }

  if (requiredLevel <= permissionLevels.MODERATOR) {
    return member.permissions?.has('ManageMessages') ?? false;
  }

  return requiredLevel === permissionLevels.EVERYONE;
}
