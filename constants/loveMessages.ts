const adjectives = ['beautiful', 'strong', 'brilliant', 'amazing', 'resilient', 'kind', 'fearless', 'compassionate', 'inspiring', 'thoughtful'];
const actions = ['brighten', 'inspires', 'heals', 'uplifts', 'soothes', 'guides', 'empowers', 'touches', 'comforts', 'enriches'];
const nouns = ['my heart', 'my soul', 'my day', 'the world', 'everything around me', 'my dreams', 'my thoughts', 'every moment', 'the universe', 'my spirit'];
const templates = [
  'You are so {adj}, you {verb} {noun}.',
  'Your {adj} soul always {verb} {noun}.',
  'You bring {adj} energy that {verb} {noun}.',
  'My love, your {adj} smile {verb} {noun}.',
  'Never forget how {adj} you are — you {verb} {noun}.',
  'Just being you is enough to {verb} {noun}.',
  'You’re not just {adj}, you’re the reason {noun} feels full.',
  'You’re the {adj} light that {verb} my path.',
  'Your presence {verb} everything — truly {adj}.',
  'Every breath you take {verb} {noun} with {adj} love.',
];

export const generateLoveMessages = (count = 1440) => {
  return Array.from({ length: count }, () => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const verb = actions[Math.floor(Math.random() * actions.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return template
      .replace('{adj}', adj)
      .replace('{verb}', verb)
      .replace('{noun}', noun)
      .replace('{adj}', adj); // In case it's used again
  });
};
