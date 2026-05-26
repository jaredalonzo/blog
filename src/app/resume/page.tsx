import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Jared Alonzo",
  description: "Resume for Jared Alonzo, Customer Engineer.",
};

export default function ResumePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ← Home
        </Link>
        <a
          href="/resume.pdf"
          download
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          Download PDF ↓
        </a>
      </div>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold">Jared Alonzo</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          New York, NY ·{" "}
          <a href="mailto:jared.alonzo@icloud.com" className="hover:underline">
            jared.alonzo@icloud.com
          </a>{" "}
          ·{" "}
          <a href="https://linkedin.com/in/jaredalonzo" className="hover:underline" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href="https://github.com/jaredalonzo" className="hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Customer Engineer with 6+ years owning technical delivery for enterprise accounts — from discovery and
          initial architecture through adoption and expansion. Strongest at diagnosing complex, multi-layer technical
          problems and translating them into solutions clients and internal teams can act on. Fluent in
          JavaScript/TypeScript, Python, and SQL. Comfortable operating across cross-functional teams and client
          stakeholders — translating technical constraints into business context and business goals into technical
          decisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li><span className="font-medium">Languages & Data:</span> SQL, Python, JavaScript, TypeScript, Bash, HTML/CSS</li>
          <li><span className="font-medium">AI & Agentic Systems:</span> Claude, prompt engineering, agentic workflow design, MCP, agent skill writing</li>
          <li><span className="font-medium">Platforms & Tools:</span> REST/GraphQL APIs, Elasticsearch, Kafka, Docker, LangChain, Warp, Google Cloud Platform, Git, Linear, Notion</li>
          <li><span className="font-medium">Customer Engineering:</span> Technical discovery, solution architecture, POCs, demos, enablement, cross-functional partnership with Sales, Product, and Engineering</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
        <div className="space-y-8">

          <div>
            <div className="flex justify-between items-baseline">
              <p className="font-medium text-sm">Customer Success Engineer — Algolia</p>
              <p className="text-xs text-gray-400 shrink-0 ml-4">Mar 2022 – Apr 2026</p>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>Owned technical strategy for a portfolio of 22 Enterprise customers ($3M ARR) — driving adoption, renewals, and expansions in partnership with AEs and CSMs across pharma (Moderna, Sanofi), consumer goods (Hasbro, Mondelēz), media (Pearson, National Geographic Society), and retail (Rue Gilt Groupe, Snipes).</li>
              <li>Onboarded ~10 short-term clients per year through structured 3-month engagements — scoping requirements, configuring environments, and supporting integrations from contract signature through production launch.</li>
              <li>Led architecture reviews and technical discovery for prospects evaluating Algolia against competing platforms; built POCs in JavaScript/TypeScript and Python against real customer datasets to validate use cases before signature.</li>
              <li>Developed and delivered recurring technical workshops — quarterly account health checks covering search performance, query quality, indexing health, and API usage — surfacing upsell signals to AEs and risk flags to CSMs without requiring separate internal reviews.</li>
              <li>Recovered a high-visibility enterprise retail account that saw zero conversion lift after activating personalization — diagnosed root causes spanning attribute selection, flat-vs-nested JSON limiting AI enrichment, and a catalog lifecycle mismatch; brokered a commercial accommodation and persuaded the client to change a core operational behavior, recovering measurable conversion lift within one month and retaining the account.</li>
              <li>Architected a BOPIS solution for an enterprise shoe retailer with hundreds of store locations — documented three variant indexing strategies and two store-availability approaches with tradeoffs, advising against misusing the search index for time-sensitive inventory; delivered sample data structures and a working frontend-hydration code sandbox so their engineering team could make the right architectural call for their stack.</li>
              <li>Diagnosed relevance and performance issues via SQL log analysis; advocated for product gaps by framing requests around ARR impact and churn risk. Authored reusable integration guides, demo templates, and runbooks adopted across the CSE team.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <p className="font-medium text-sm">Technical Consultant — Squiz Funnelback</p>
              <p className="text-xs text-gray-400 shrink-0 ml-4">Jun 2021 – Mar 2022</p>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>Owned the technical relationship for 5 enterprise higher education customers from pre-sales discovery through go-live, designing search experiences for student- and faculty-facing portals.</li>
              <li>Built custom search UIs and result templates in JavaScript and Funnelback&apos;s templating layer; reduced repeat implementation work through a reusable component library.</li>
              <li>Presented architecture options and tradeoffs to mixed audiences — IT directors, marketing leads, end users — and translated decisions into configuration and code.</li>
              <li>Surfaced prioritized feature requests to Product based on patterns observed across customer discovery sessions.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <p className="font-medium text-sm">Implementation Consultant — FAST Enterprises</p>
              <p className="text-xs text-gray-400 shrink-0 ml-4">Sep 2019 – Jun 2021</p>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>Deployed FAST&apos;s GenTax tax administration software for the Commonwealth of Pennsylvania, spanning discovery, business rule configuration, training, and post-launch stabilization.</li>
              <li>Maintained the enterprise unemployment insurance claims system for the State of Michigan, resolving production issues and configuring workflow updates to support ongoing agency operations.</li>
              <li>Served as primary technical advisor to agency directors, IT leads, and end users — communicating system behavior, tradeoffs, and constraints in their language.</li>
              <li>Built and delivered training programs and documentation adopted by end users across both engagements.</li>
            </ul>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Education</h2>
        <p className="font-medium text-sm">Bachelor of Science, Computer Science — Seattle University</p>
      </section>
    </main>
  );
}
