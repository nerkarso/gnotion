import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./(components|pages)/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
