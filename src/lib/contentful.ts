import { p } from "motion/react-client";

// src/lib/contentful.ts
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const TOKEN = process.env.CONTENTFUL_CDA_TOKEN!;
const ENDPOINT =
  process.env.CONTENTFUL_GRAPHQL_ENDPOINT ||
  `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

if (!SPACE_ID || !TOKEN) {
  throw new Error('Missing Contentful environment variables');
}

type FetchOptions = {
  next?: RequestInit['next'];
  cache?: RequestInit['cache'];
};

export async function contentfulFetch<T>(
  query: string,
  variables: Record<string, any> = {},
  options: FetchOptions = {}
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    // Next.js caching options
    next: options.next,
    cache: options.cache,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[Contentful] Error response:', text);
    throw new Error('Contentful request failed');
  }

  const json = await res.json();
  if (json.errors) {
    console.error('[Contentful] GraphQL errors:', json.errors);
    throw new Error('Contentful GraphQL error');
  }

  return json.data;
}

// src/lib/contentful.ts

// Example Page type
export type PageEntry = {
  slug: string;
  title: string;
  // Add more fields from your Contentful model as needed
  componentsCollection?: {
    items: any[];
  };
};

export async function getPageBySlug(slug: string) {
  const query = /* GraphQL */ `
  query GetPageBySlug($slug: String!) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        componentsCollection(limit: 50) {
          items {
            __typename
            sys { id }

              ... on Hero {
                title
                heading
                supportingText
                buttonOneText
                buttonOneUrl
                buttonTwoText
                buttonTwoUrl
                image { url title description }
              }

              ... on Main {
                supportingText
                heading
                subHeading
                cardTitle1
                cardText1
                cardTitle2
                cardText2
                cardTitle3
                cardText3
                image1 { url title description }
                image2 { url title description }
                image3 { url title description }
              }


              ... on Carousel {
                sys { id }
                imagesCollection {
                  items { url title description }
                }
              }

              ... on BigCarousel {
                sys { id }
                imagesCollection {
                  items { url title description }
                }
              }

              ... on DogsAdoption {
                title
                subtitle
                buttonText
                buttonUrl
                dogsCollection(limit: 20) {
                items {
                  sys { id }
                  title
                  description
                  information
                  mainImage { url title description }
                  galleryImagesCollection(limit: 3) {   # <- límite aquí
                    items { url title description }
                  }
                }
              }
            }

              ... on Faq {
                heading
                subheading
                itemsCollection(limit: 20) {
                  items {
                    question
                    answer
                  }
                }
              }

          ... on InformationComponent {
            heading
            introText
            image { url title description }
            itemsCollection(limit: 50) {
              items {
                title
                text
                media { url title description }
                mediaPosition
              }
            }
          }

              ... on Footer {
                heading
                subHeading
                logoImage { url title }
                footerLinksCollection {
                  items {
                    label
                    href
                  }
                }
                socialLinksCollection {
                  items {
                    label
                    href
                  }
                }
              }
            }
          }
        }
      }
    }
  `;


  type Response = {
    pageCollection: {
      items: {
        slug: string;
        title: string;
        componentsCollection?: { items: any[] };
      }[];
    };
  };

  const normalizedSlug = slug.toLowerCase().trim();
  const data = await contentfulFetch<Response>(query, { slug: normalizedSlug });

  const item = data.pageCollection.items[0];
  if (!item) return null;

  return {
    slug: item.slug,
    title: item.title,
    componentsCollection: item.componentsCollection ?? { items: [] },
  };
}

// src/lib/contentful.ts

export async function getAllPageSlugs(): Promise<string[]> {
  const query = /* GraphQL */ `
    query GetAllPageSlugs {
      pageCollection(where: { slug_exists: true }, limit: 1000) {
        items {
          slug
        }
      }
    }
  `;

  type Response = {
    pageCollection: {
      items: {
        slug: string;
      }[];
    };
  };

  const data = await contentfulFetch<Response>(query);

  return data.pageCollection.items.map((item) => item.slug).filter(Boolean);
}

// Nav types
export type NavItem = {
  label: string;
  url: string;
};

export type NavLogo = {
  url: string;
  title: string;
  description?: string | null;
};

export type NavigationData = {
  logo?: NavLogo | null;
  items: NavItem[];
};

// Fetch main navigation by slug
export async function getMainNavigation(
  slug: string = 'main-nav'
): Promise<NavigationData> {
  const query = /* GraphQL */ `
    query GetNavigation($slug: String!) {
      menuCollection(where: { slug: $slug }, limit: 1) {
        items {
          title
          slug
          logo {
            url
            title
            description
          }
          itemsCollection {
            ... on MenuItemsCollection {
              items {
                text
                link
              }
            }
          }
        }
      }
    }
  `;

  type Response = {
    menuCollection: {
      items: {
        title: string;
        slug: string;
        logo?: {
          url: string;
          title: string;
          description?: string | null;
        } | null;
        itemsCollection?: {
          items: {
            text: string;
            link: string;
          }[];
        } | null;
      }[];
    };
  };


  const normalizedSlug = slug.toLowerCase().trim();
  const data = await contentfulFetch<Response>(query, { slug: normalizedSlug });

  console.log(data);

  const menu = data.menuCollection?.items?.[0];

  const items =
    menu?.itemsCollection?.items?.map((item) => ({
      text: item.text,
      link: item.link,
    })) ?? [];

  const logo = menu?.logo
    ? {
      url: menu.logo.url,
      title: menu.logo.title,
      description: menu.logo.description,
    }
    : undefined;

  return { logo, items };
}

export async function getDogByTitle(title: string) {
  const query = /* GraphQL */ `
    query GetDogByTitle($title: String!) {
      dogsAdoptionCardCollection(where: { title: $title }, limit: 1) {
        items {
          title
          description
          information
          mainImage { url title description }
          galleryImagesCollection {
            items { url title description }
          }
        }
      }
    }
  `;

  type Response = {
    dogsAdoptionCardCollection: {
      items: {
        title: string;
        description: string;
        information: string;
        mainImage?: { url: string; title?: string; description?: string };
        galleryImagesCollection?: { items: { url: string; title?: string; description?: string }[] };
      }[];
    };
  };

  const data = await contentfulFetch<Response>(query, { title }); // Case-sensitive
  const dog = data.dogsAdoptionCardCollection.items[0];
  if (!dog) return null;

  return {
    title: dog.title,
    description: dog.description,
    information: dog.information,
    mainImage: dog.mainImage,
    galleryImages: dog.galleryImagesCollection?.items || [],
  };
}

export async function getFooterData() {
  const query = /* GraphQL */ `
    query GetFooter {
      footer(id: "xLtS1uzAZ7y2xW6UWtX8F") {
        heading
        subHeading
        logoImage { url title }
        footerLinksCollection {
          items { label href }
        }
        socialLinksCollection {
          items { label href }
        }
      }
    }
  `;

  try {
    const data = await contentfulFetch<{ footer: any }>(query);

    const footer = data.footer;

    return {
      heading: footer.heading || null,
      subHeading: footer.subHeading || null,
      logoImage: footer.logoImage || null,
      footerLinksCollection: footer.footerLinksCollection || { items: [] },
      socialLinksCollection: footer.socialLinksCollection || { items: [] },
    };
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return {
      heading: null,
      subHeading: null,
      logoImage: null,
      footerLinksCollection: { items: [] },
      socialLinksCollection: { items: [] },
    };
  }
}
