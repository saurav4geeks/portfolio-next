import { getProjects, getSkills } from "@/db/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionCard } from "@/components/ui/AccordionCard";

export async function Projects() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return (
    <section id="section-projects" className="mt-[8%] scroll-mt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <SectionHeading>Projects</SectionHeading>
          <div className="mt-[5%]">
            {projects.map((project) => (
              <AccordionCard
                key={project.id}
                startDate={project.date}
                title={project.title}
                subtitle={project.stack}
                highlights={project.highlights}
                link={project.link ?? undefined}
                linkLabel={project.linkLabel ?? undefined}
                defaultOpen={false}
              />
            ))}
          </div>
        </div>

        <aside className="lg:pt-2">
          <h4 className="text-xl font-semibold">MY SKILLS</h4>
          <div className="mt-6 space-y-5">
            {skills.map((group) => (
              <div key={group.id}>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {group.label}
                </p>
                <ul className="mt-1 space-y-1 text-sm leading-6">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
