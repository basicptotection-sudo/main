import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function Tag({ tag, current }: { tag: string; current?: boolean }) {
  return (
    <Link href={`/blog/tags/${tag.toLowerCase()}`} className="no-underline">
      <Badge
        variant={current ? 'default' : 'secondary'}
        className="transition-colors"
      >
        {tag}
      </Badge>
    </Link>
  );
}
