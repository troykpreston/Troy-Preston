import { About } from "@/components/home/About";
import { Capabilities } from "@/components/home/Capabilities";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Statement } from "@/components/home/Statement";
import { Page } from "@/components/motion/Page";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <Page>
      <Hero projectCount={projects.filter((p) => p.featured).length} />
      <Statement text={site.statement} label="Approach" />
      <SelectedWork />
      <Capabilities />
      <About />
    </Page>
  );
}
