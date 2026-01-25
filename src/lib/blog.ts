import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    author: string;
    image: string;
}

export interface Post<TFrontmatter> {
    frontmatter: TFrontmatter;
    slug: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export function getPostFilePaths(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((p) => p.endsWith('.mdx'));
  } catch (error) {
    // Directory might not exist in some environments
    return [];
  }
}

export function getPostBySlug(slug: string): { data: PostFrontmatter; content: string } {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { data: data as PostFrontmatter, content };
}

export function getAllPosts(): Post<PostFrontmatter>[] {
  const filePaths = getPostFilePaths();

  const posts = filePaths.map((filePath) => {
    const slug = filePath.replace(/\.mdx$/, '');
    const { data } = getPostBySlug(slug);
    return {
      frontmatter: data,
      slug,
    };
  });

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getSimilarPosts(currentSlug: string, tags: string[], maxResults = 3): Post<PostFrontmatter>[] {
  if (!tags || tags.length === 0) {
    return [];
  }
  
  const allPosts = getAllPosts();
  const lowerCaseTags = tags.map(tag => tag.toLowerCase());

  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const postTags = (post.frontmatter.tags || []).map(t => t.toLowerCase());
      const commonTagsCount = postTags.filter(t => lowerCaseTags.includes(t)).length;
      
      return { post, score: commonTagsCount };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // if score is the same, sort by date
      return new Date(b.post.frontmatter.date).getTime() - new Date(a.post.frontmatter.date).getTime();
    });
  
  return scoredPosts.slice(0, maxResults).map(item => item.post);
}