import { PageHeader } from "../components/layout/PageHeader";
import { Timeline } from "../components/experience/Timeline";
import { experiences } from "../data/experiences";

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title="Experience" lede="My work journey so far! More to come..." />
      <div className="container-page pb-24">
        <Timeline entries={experiences} />
      </div>
    </>
  );
}
