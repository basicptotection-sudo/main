import { siteConfig } from '@/lib/config';
import type { PostFrontmatter } from '@/lib/blog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ArticleJsonLdProps = {
  post: PostFrontmatter;
  slug: string;
};

const ArticleJsonLd = ({ post, slug }: ArticleJsonLdProps) => {
  const { title, description, date, author, image } = post;
  const url = `${siteConfig.url}/blog/${slug}`;
  const postImage = PlaceHolderImages.find(p => p.id === image);
  const imageUrl = postImage ? postImage.imageUrl : `${siteConfig.url}/og-image.png`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: author,
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: date,
    dateModified: date,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
export default ArticleJsonLd;
