import { Page } from "@/components/motion/Page";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";

export default function NotFound() {
  return (
    <Page footer={false}>
      <section className="nf container">
        <span className="label">Error 404</span>
        <Lines as="h1" lines={["This page", "*doesn’t exist.*"]} className="nf__title serif" trigger="mount" />
        <Reveal trigger="mount" delay={0.4}>
          <TransitionLink href="/" className="nf__link">
            <span className="arrow arrow--back">←</span> <span className="u">Return home</span>
          </TransitionLink>
        </Reveal>
      </section>
    </Page>
  );
}
