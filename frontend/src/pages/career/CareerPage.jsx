import { useEffect } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Compass,
  UsersRound,
} from "lucide-react";

const applicationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSenav7o1wI5FQTfSXlzCsiFN3np7TcFhDsTrPYYRUOZhcZNYQ/viewform";

const departments = [
  {
    name: "Construction & Design",
    icon: Building2,
    roles: ["Site Engineer (Civil)", "Site Supervisor", "AutoCAD", "Architect"],
  },
  {
    name: "Business & Finance",
    icon: BriefcaseBusiness,
    roles: [
      "Accounts",
      "Marketing & Sales",
      "Store",
      "Legal",
      "Chartered Accountant",
    ],
  },
  {
    name: "People & Communication",
    icon: UsersRound,
    roles: [
      "Human Resource",
      "Call Center Executive",
      "Content Writer",
      "Print Media",
    ],
  },
  {
    name: "Technology & Operations",
    icon: Compass,
    roles: ["MIS"],
  },
];

const kickerClass =
  "mb-[18px] text-[11px] font-bold uppercase tracking-[0.15em] text-highlight-hover";
const contentWidthClass =
  "mx-auto w-[calc(100%_-_56px)] max-w-[1240px] max-[560px]:w-[calc(100%_-_36px)]";

export default function Career() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Careers | Build your future with Vastu Vihar Nepal";
    if (description) {
      description.content =
        "Explore career opportunities at Vastu Vihar Nepal across construction, design, finance, sales, operations and communications. Apply online and submit your resume.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <main className="bg-white text-text">
      <section
        className="grid mt-20 min-h-147.5 grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] bg-white max-[800px]:grid-cols-1"
        aria-labelledby="career-title"
      >
        <div className="my-auto max-w-180 py-20.5 pl-[max(28px,calc((100vw-1440px)/2))] pr-[clamp(28px,7vw,112px)] max-[800px]:px-7 max-[800px]:pb-14.5 max-[800px]:pt-16.5">
          <p className={kickerClass}>Careers at Vastu Vihar</p>
          <h1
            id="career-title"
            className="m-0 max-w-162.5 font-display text-[clamp(48px,5.6vw,76px)] font-medium leading-[0.99] tracking-[-0.04em] text-brand max-[560px]:text-[clamp(45px,13vw,62px)]"
          >
            Build a career with{" "}
            <span className="block text-highlight-hover">strong foundations.</span>
          </h1>
          <p className="mt-6.25 max-w-115 text-[15px] leading-[1.85] text-[#5d6861]">
            Bring your ideas, experience and ambition to a team shaping better
            places to live. Find a role where your work can make a lasting
            difference.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5.5">
            <a
              className="inline-flex min-h-12.5 items-center gap-4.5 bg-brand px-5.5 text-[13px] font-semibold text-white no-underline transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-layout-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-dark motion-reduce:transition-none"
              href="#open-roles"
            >
              Explore opportunities <ArrowDown size={16} aria-hidden="true" />
            </a>
            <span className="text-xs text-muted">
              14 areas of opportunity
            </span>
          </div>
        </div>

        <div
          className="relative min-h-full overflow-hidden bg-[#263d35] max-[800px]:min-h-90 max-[560px]:min-h-75"
          role="img"
          aria-label="A Vastu Vihar residential community"
        >
          <div className="pointer-events-none absolute inset-0 border border-white/10" />
          <div className="absolute h-50 w-50 bg-highlight -right-15 -top-15 rounded-full border border-white/20" />
          <div className="absolute h-40 w-40 bg-brand -right-15 -top-15 rounded-full border border-white/20" />
          <div className="absolute inset-x-8.5 bottom-8 z-1 flex justify-between gap-4 text-xs tracking-[0.03em] text-white max-[560px]:inset-x-5 max-[560px]:bottom-5 max-[560px]:text-[10px]">
            <span>Thoughtful places.</span>
            <span>People who build them.</span>
          </div>
            <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 content-center justify-items-center rounded-full border border-white/70 bg-layout-dark/30 text-white backdrop-blur-[3px] max-[560px]:size-25">
              <span className="font-display text-[24px] leading-none max-[560px]:text-[18px]">
                Vastu Vihar
              </span>
              <small className="mt-2 text-[10px] uppercase tracking-[0.12em] max-[560px]:text-[8px]">
                Grow with us
              </small>
          </div>
          <div className="absolute h-60 w-60 bg-highlight -left-15 -bottom-15 rounded-full border border-white/20" />
          <div className="absolute h-50 w-50 bg-brand -left-15 -bottom-15 rounded-full border border-white/20" />
        </div>
      </section>

      <section
        className={`${contentWidthClass} grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-[clamp(32px,8vw,120px)] border-b border-[#e6e5df] py-19.5 max-[800px]:grid-cols-1 max-[800px]:gap-6 max-[800px]:py-14`}
        aria-label="Working at Vastu Vihar"
      >
        <div className="flex items-start gap-5">
          <span className="h-18 min-w-0.75 bg-border-dark" aria-hidden="true" />
          <p className="-mt-2 max-w-120 font-display text-[clamp(28px,3vw,40px)] leading-[1.15] text-brand">
            Good work grows when people have room to think, learn and
            contribute.
          </p>
        </div>
        <p className="m-0 max-w-130 text-sm leading-[1.9] text-muted">
          Vastu Vihar is a collaborative, open-workplace environment with
          opportunities to learn, shape better solutions and share your point of
          view. We welcome people who care about doing meaningful work together.
        </p>
      </section>

      <section
        className={`${contentWidthClass} scroll-mt-8 py-21.5 pb-23.5 max-[560px]:py-15.5 max-[560px]:pb-17`}
        id="open-roles"
        aria-labelledby="roles-title"
      >
        <div className="mb-9 flex items-end justify-between gap-9 max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-0">
          <div>
            <p className={`${kickerClass} mb-2.5`}>Find your place</p>
            <h2
              id="roles-title"
              className="m-0 font-display text-[clamp(36px,4vw,50px)] font-medium leading-[1.05] tracking-tight text-brand"
            >
              Explore opportunities
            </h2>
          </div>
          <p className="mb-0.75 max-w-97.5 text-[13px] leading-[1.8] text-muted max-[800px]:mt-4 max-[800px]:max-w-130">
            Choose the area that fits your skills. Select your preferred role
            when you complete the application.
          </p>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-border-light max-[560px]:grid-cols-1">
          {departments.map(({ name, icon: Icon, roles }) => (
            <article
              className="min-h-55 border-b border-r border-border-light bg-white px-7.5 py-6.75 pb-6.5 max-[560px]:min-h-0 max-[560px]:px-4.5 max-[560px]:py-5.5"
              key={name}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center bg-white text-highlight-hover">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="m-0 text-[15px] font-semibold text-brand">
                  {name}
                </h3>
              </div>
              <ul className="m-0 flex list-none flex-wrap gap-2.25 p-0">
                {roles.map((role) => (
                  <li
                    className="border border-[#e8e8e2] bg-white px-2.75 py-2.25 text-xs leading-tight text-[#48554d]"
                    key={role}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${contentWidthClass} scroll-mt-7.5 pb-22.5 max-[560px]:pb-16`}
        id="application"
        aria-labelledby="application-title"
      >
        <div className="flex items-end justify-between gap-7.5 bg-brand px-9.5 py-8.5 text-white max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-4.5 max-[800px]:p-7 max-[560px]:px-5 max-[560px]:py-6.25">
          <div>
            <p className={`${kickerClass} mb-2.5 text-[#d5bd83]`}>
              Your next step
            </p>
            <h2
              id="application-title"
              className="m-0 font-display text-[clamp(36px,4vw,50px)] font-medium leading-[1.05] tracking-tight text-white"
            >
              Apply to join our team
            </h2>
            <p className="mt-3.25 max-w-142.5 text-[13px] leading-[1.75] text-white/70">
              Tell us about yourself, choose the role you’re interested in and
              attach your resume. The application form takes a few minutes.
            </p>
          </div>
          <a
            href={applicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-max items-center gap-2 border-b border-white/55 py-3 text-xs text-white no-underline transition-colors hover:text-[#e2cf9c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-dark motion-reduce:transition-none"
          >
            Open form in a new tab <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-3.25 text-[11px] leading-[1.6] text-[#737c75]">
          A Google account sign-in is required to access the form and upload
          your resume. Your application is submitted through Google Forms.
          <span className="text-red-600 font-semibold">*</span>
        </p>
      </section>
    </main>
  );
}
