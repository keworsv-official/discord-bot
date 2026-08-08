export function canModerate({ actor, target, guildOwnerId }) {
  if (!actor || !target) return { allowed: false, reason: 'Brak danych użytkownika.' };
  if (target.id === guildOwnerId) return { allowed: false, reason: 'Właściciel serwera jest chroniony.' };
  if (target.id === actor.id) return { allowed: false, reason: 'Nie możesz zastosować tej akcji wobec siebie.' };
  if (target.roles?.highest?.position >= actor.roles?.highest?.position) {
    return { allowed: false, reason: 'Użytkownik ma równą lub wyższą rolę.' };
  }
  return { allowed: true };
}
