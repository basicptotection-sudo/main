import { notFound } from "next/navigation";


const envs = [
  { slug: "sieges-sociaux-bureaux", title: "Sièges sociaux & Bureaux" },
];


export function generateStaticParams() {
  return envs.map((e) => ({ slug: e.slug }));
}


export default function EnvPage({ params }: { params: { slug: string } }) {
  const env = envs.find((e) => e.slug === params.slug);
  if (!env) notFound();


  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">{env.title}</h1>
    </main>
  );
}
