import { getExperience } from "@/db/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionCard } from "@/components/ui/AccordionCard";

export async function Experience() {
  const experience = await getExperience();

  return (
    <section id="section-expertise" className="mt-[8%] scroll-mt-12">
      <div className="max-w-[90%]">
        <SectionHeading className="mb-[5%]">Experience</SectionHeading>
        {experience.map((job, i) => (
          <AccordionCard
            key={job.id}
            startDate={job.startDate}
            endDate={job.endDate}
            title={job.position}
            subtitle={`${job.company} · ${job.location}`}
            highlights={job.highlights}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
