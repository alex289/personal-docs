import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://persona-docs.vercel.app',
  integrations: [
    starlight({
      title: 'Personal Docs',
      lastUpdated: true,
      social: {
        github: 'https://github.com/alex289/personal-docs',
      },
      sidebar: [
        {
          label: 'About',
          link: '/about',
        },
        {
          label: 'Server',
          autogenerate: { directory: 'server' },
        },
      ],
    }),
  ],
});
