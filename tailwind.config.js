/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================
      // PALETTE DE MARQUE SERRUACCESS
      // Pour changer les couleurs du site, modifiez ici.
      // La couleur gold est utilisée via : bg-brand-gold, text-brand-gold
      // La couleur navy est utilisée via : bg-brand-navy, text-brand-navy
      // ============================================================
      colors: {
        brand: {
          gold:      '#d4a853', // Or — Accents, CTAs, icônes
          'gold-hover': '#ff4f19', // Version hover de l'Or
          navy:      '#ff4f19', // Bleu Navy — sections foncées, badges
          'navy-light': '#ea00ffff', // Hover du Navy
          accent:    '#ff4f198c', // Orange Urgence — boutons critiques
          'accent-hover': '#e84300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
