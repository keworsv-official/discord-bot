const DEFAULT_RULES = Object.freeze({
  links: false,
  invites: true,
  massMentions: true,
  caps: false,
  repeatedCharacters: true,
});

const invitePattern = /(?:discord\.gg|discord(?:app)?\.com\/invite)\/[^\s]+/i;
const urlPattern = /https?:\/\/[^\s]+/i;

export function createAutoModService(customRules = {}) {
  const rules = { ...DEFAULT_RULES, ...customRules };

  function inspect(message) {
    const content = message.content ?? '';
    const words = content.trim().split(/\s+/).filter(Boolean);
    const uppercase = content.replace(/[^A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/g, '').replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, '').length;
    const letters = content.replace(/[^A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/g, '').length;
    const mentions = message.mentions?.users?.size ?? 0;

    if (rules.invites && invitePattern.test(content)) return { violation: 'invite', reason: 'Link zaproszenia Discord' };
    if (rules.links && urlPattern.test(content)) return { violation: 'link', reason: 'Niedozwolony link' };
    if (rules.massMentions && mentions >= 5) return { violation: 'mass-mention', reason: 'Masowe oznaczenia' };
    if (rules.caps && letters >= 12 && uppercase / letters >= 0.75) return { violation: 'caps', reason: 'Nadmierne użycie wielkich liter' };
    if (rules.repeatedCharacters && /(.)\1{7,}/u.test(content)) return { violation: 'repeated-characters', reason: 'Powtarzające się znaki' };

    return null;
  }

  return Object.freeze({ inspect, rules: Object.freeze({ ...rules }) });
}
