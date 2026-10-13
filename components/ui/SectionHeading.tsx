import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
};

/** Standard section header: accent eyebrow rule, display title, optional lead paragraph. */
export function SectionHeading({ eyebrow, title, lead, align = "left", light, as: Tag = "h2", className }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-4", align === "center" && "justify-center", light ? "text-flame-300" : "text-flame-700")}>
          <span aria-hidden className="h-px w-10 bg-current opacity-70" />
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-[2rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]", light ? "text-white" : "text-navy-900")}>{title}</Tag>
      {lead && <p className={cn("mt-6 text-base leading-relaxed sm:text-lg", light ? "text-white/75" : "text-slate")}>{lead}</p>}
    </Reveal>
  );
}
