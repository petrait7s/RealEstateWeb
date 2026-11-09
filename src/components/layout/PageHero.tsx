import { SplitText, Reveal } from "@/components/animation/Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mx-auto max-w-[1600px] px-4 pt-40 pb-12 sm:px-8 sm:pt-48 sm:pb-20">
      {eyebrow && <p className="text-accent mb-5 text-xs tracking-[0.3em] uppercase">{eyebrow}</p>}
      <h1 className="max-w-5xl text-[length:var(--text-h1)]">
        <SplitText text={title} />
      </h1>
      {lead && (
        <Reveal delay={0.3}>
          <p className="text-muted mt-6 max-w-2xl text-[length:var(--text-lead)]">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
