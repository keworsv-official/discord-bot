export function isSameUser(actorId, targetId) {
  return actorId === targetId;
}

export function isGuildOwner(guild, userId) {
  return guild?.ownerId === userId;
}

export function canActOnMember(actor, target) {
  if (!actor || !target) return false;
  if (actor.id === target.id) return false;
  if (target.guild.ownerId === target.id) return false;
  if (actor.guild.ownerId === actor.id) return true;
  return actor.roles.highest.position > target.roles.highest.position;
}

export function canManageRole(member, role) {
  if (!member || !role) return false;
  if (role.managed) return false;
  if (member.guild.ownerId === member.id) return true;
  return member.roles.highest.position > role.position;
}
