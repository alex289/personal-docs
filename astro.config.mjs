import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://alex-personal-docs.vercel.app',
  integrations: [
    starlight({
      title: 'Personal Docs',
      description: 'A collection of notes and docs for my personal use',
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
          items: [
            {
              label: 'nginx',
              link: '/server/nginx',
            },
            {
              label: 'acme.sh',
              link: '/server/acmesh',
            },
            {
              label: 'Security',
              autogenerate: { directory: 'server/security' },
            },
          ],
        },
      ],
    }),
  ],
});
