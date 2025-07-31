// The "Evergreen" Theme: A professional, comforting, and accessible color palette.

const light = {
  text: '#2d3436', // Dark, desaturated blue-gray (Charcoal)
  background: '#F9F9F9', // Very light, warm gray (Alabaster)
  card: '#FFFFFF', // Pure white for cards
  tint: '#00796B', // Deep, calming teal-green
  tabIconDefault: '#b2bec3', // Muted gray
  gradient: ['#E0F2F1', '#F9F9F9'] as const, // Light teal to Alabaster
  welcomeButton: '#00796B',
  welcomeButtonText: '#FFFFFF',
  welcomeSecondaryButtonBorder: '#00796B',
  welcomeSecondaryButtonText: '#FFFFFF',
};

const dark = {
  text: '#EAEAEA', // Soft, light gray (Silver Sand)
  background: '#12181B', // Near-black, desaturated navy (Midnight)
  card: '#1E272C', // Lighter dark gray (Gunmetal)
  tint: '#48D1CC', // Luminous turquoise
  tabIconDefault: '#636e72',
  gradient: ['#1E272C', '#12181B'] as const, // Gunmetal to Midnight
  welcomeButton: '#48D1CC',
  welcomeButtonText: '#12181B',
  welcomeSecondaryButtonBorder: '#48D1CC',
  welcomeSecondaryButtonText: '#12181B',
};

export default { light, dark };
