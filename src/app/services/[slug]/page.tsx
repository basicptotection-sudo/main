import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData, type Service } from "@/lib/services-data";
import { siteConfig } from "@/lib/config";
import { ExpertisePage } from "@/components/services/expertise-page";
import { QualifiedAgentPage } from "@/components/services/qualified-agent-page";

/* ================= types ================= */


type Params = { slug: string };
type PageProps = { params: Promise<Params> };

function toAbsolute(path: string) {
  const base = (siteConfig?.url || "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

function buildMetaDescription(service: Service) {
  const base = (service.shortDescription || service.title)
    .trim()
    .replace(/\s+/g, " ");
  const suffix =
    " Intervention Île-de-France : 78, 75, 92, 93, 94, 95, 77, 91.";
  const text = `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
  return text.length > 170 ? `${text.slice(0, 167)}…` : text;
}

/* ================= metadata ================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} | ${
    siteConfig?.name ?? "Basic Protection Privée"
  }`;
  const description = buildMetaDescription(service);
  const canonical = toAbsolute(`/services/${service.slug}`);

  return {
    title: { absolute: title },
    description,
    keywords: service.keywords?.length ? [...service.keywords] : undefined,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteConfig?.name ?? "Basic Protection Privée",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ================= page ================= */

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return notFound();

  if (service.slug === "agent-securite-qualifie") {
    return <QualifiedAgentPage service={service} />;
  }
  return <ExpertisePage service={service} />;

}
