import { useEffect } from 'react';

const SITE_NAME = 'Fantasy Central';
const SITE_URL = 'https://fantasycentral.co';
const DEFAULT_IMAGE = `${SITE_URL}/banner_image2.jpg`;

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export default function SEO({
  title,
  description,
  path = '/',
  robots = 'index, follow',
  pageType = 'WebPage',
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'googlebot', robots);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', DEFAULT_IMAGE);
    setMeta('property', 'og:image:alt', 'Fantasy Central fantasy football companion site');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', DEFAULT_IMAGE);
    setMeta('name', 'twitter:image:alt', 'Fantasy Central fantasy football companion site');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const graph = [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: 'A fantasy football companion site for league standings, records, results, history and weekly awards.',
        inLanguage: 'en-US',
      },
      {
        '@type': pageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: fullTitle,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: DEFAULT_IMAGE,
        },
        inLanguage: 'en-US',
      },
    ];

    if (path !== '/') {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Fantasy Central',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: canonicalUrl,
          },
        ],
      });
    }

    let schema = document.head.querySelector('#fantasy-central-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'fantasy-central-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [description, pageType, path, robots, title]);

  return null;
}
