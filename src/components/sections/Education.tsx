import { getEducation } from "@/db/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmallCard } from "@/components/ui/SmallCard";

export async function Education() {
  const education = await getEducation();

  return (
    <section id="section-education" className="mt-[8%] scroll-mt-12">
      <div className="max-w-[90%]">
        <SectionHeading className="mb-[5%]">Education</SectionHeading>
        {education.map((item) => (
          <SmallCard
            key={item.id}
            startDate={item.startDate}
            endDate={item.endDate}
            title={item.title}
            subtitle={item.institution}
          />
        ))}
      </div>
    </section>
  );
}
