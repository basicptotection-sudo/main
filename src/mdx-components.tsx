import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
            <Image 
                sizes="100vw" 
                style={{ objectFit: 'cover' }} 
                {...(props as ImageProps)} 
                alt={props.alt || ''}
            />
        </div>
    ),
    a: ({ href, children }) => {
        if (href && href.startsWith('/')) {
            return <Link href={href}>{children}</Link>;
        }
        if (href && href.startsWith('#')) {
            return <a href={href}>{children}</a>;
        }
        return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
    ...components,
  }
}
