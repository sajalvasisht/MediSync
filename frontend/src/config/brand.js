/**
 * brand.js
 * Central brand configuration for MediSync.
 */

const brand = {
  name: 'MediSync',
  tagline: 'Better care, wherever you are.',
  subtitle: 'TELEMEDICINE',
  phone: '+1 (800) 633-4726',
  email: 'hello@medisync.health',

  social: {
    twitter:   'https://twitter.com/medisync',
    instagram: 'https://instagram.com/medisync',
    linkedin:  'https://linkedin.com/company/medisync',
  },

  footer: {
    columns: [
      {
        heading: 'Company',
        links: [
          { label: 'About',    href: '/about' },
          { label: 'Careers',  href: '/careers' },
          { label: 'Press',    href: '/press' },
        ],
      },
      {
        heading: 'Services',
        links: [
          { label: 'Find Doctors',   href: '#doctors' },
          { label: 'Book Consult',   href: '#contact' },
          { label: 'Health Records', href: '/records' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy',  href: '/privacy' },
          { label: 'Terms',    href: '/terms' },
          { label: 'Cookies',  href: '/cookies' },
        ],
      },
    ],
    copyright: '© 2024 MediSync. All rights reserved.',
    madeWith: 'Made with ♥ for better healthcare',
  },
};

export default brand;
