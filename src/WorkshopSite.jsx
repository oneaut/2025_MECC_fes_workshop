import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Users, Mail, Globe } from "lucide-react";

// =====================
// Data
// =====================
const WORKSHOP = {
  code: "W06",
  title:
    "Advancements in Modeling, Control, and Estimation for Functional Electrical Stimulation Systems",
  time: "1:00–5:30 PM",
  location: "TBD",
  date_display: "Oct 5",
  organizers: [
    { name: "Mayank Singh", org: "NC State University" },
    { name: "Nitin Sharma", org: "NC State University" },
    { name: "Victor Duenas", org: "Syracuse University" },
  ],
  contactEmail: "msingh25@ncsu.edu",
  abstract:
    "This workshop aims to address critical Functional Electrical Stimulation (FES) challenges by showcasing advanced control methods, accurate physiological models, and state-of-the-art estimation techniques. Interactive sessions will facilitate collaboration, ultimately enhancing clinical applicability and patient outcomes in FES therapies.",
  topics: [
    "Multi-Modal Sensor Fusion and MPC: Combining ultrasound and sEMG data for fatigue-aware, personalized MPC.",
    "Hybrid Exoskeleton Control: Strategies for distributing assistance between FES and powered motors using adaptive allocation techniques.",
    "Motorized and FES-Induced Cycling: Implementing Lyapunov-based adaptive control for stable interaction between FES, motors, and voluntary effort.",
    "Teleoperated Cycling: Using teleoperation and steer-by-wire technologies to personalize therapeutic cycling and improve clinical outcomes.",
  ],
};

const SPEAKERS = [
  {
    name: "Mayank Singh",
    affiliation: "PhD Candidate, North Carolina State University",
    title:
      "Ultrasound-Informed Closed-loop Koopman Model Predictive Control for Drop-Foot Correction",
    abstract:
      "The talk focuses on an ultrasound-informed closed-loop control framework for FES-actuated ankle dorsiflexion aimed at correcting drop foot. Leveraging ultrasound (US) as a sensing modality immune to stimulation artifacts, we extract real-time metrics—muscle thickness, echogenicity, strain—to track fatigue. We introduce a Koopman-operator-driven MPC that integrates US-derived biomarkers to adapt FES parameters to physiological state and fatigue dynamics. Sparse-array US imaging with deep-learning reconstruction enables ultrafast, wearable sensing for continuous monitoring and control. Experimentally validated results are planned for presentation.",
  },
  {
    name: "Nitin Sharma",
    affiliation: "Professor, North Carolina State University",
    title: "Ultrasound-Informed Optimal Control of Hybrid Exoskeleton",
    abstract: "TBD.",
  },
  {
    name: "Victor Duenas",
    affiliation: "Syracuse University",
    title:
      "Closed-Loop Cadence Controllers for FES-Induced Leg Cycling with Adaptive Motorized Assistance",
    abstract:
      "We present a unified control design for muscles and an electric motor to customize pedaling patterns and leverage volitional effort in FES-cycling. A closed-loop adaptive motor controller achieves cadence tracking while estimating uncertain cycle-rider parameters and muscle effectiveness. A saturated state-feedback muscle controller yields bounded responses. Trials with able-bodied and clinical participants show predictable performance with minimal tuning despite inter-participant variability.",
  },
  {
    name: "Hanz Richter",
    affiliation: "Cleveland State University",
    title: "Memristance as a Modeling Primitive for Muscle Fatigue and Recovery",
    abstract:
      "Memristance, the fourth fundamental circuit element, offers a new paradigm to capture muscle fatigue dynamics. We extend the Hill model with a fatigue state driven by activation inputs, reproducing typical fatigue/recovery processes and the spectral magnitude increase seen in EMG during fatigue. We discuss parameter identification and generalizations using networks of memristive circuits.",
  },
  {
    name: "Musa L. Audu",
    affiliation: "Case Western Reserve University",
    title:
      "Challenges in Applying Control Concepts in Biological Systems with Applications to Trunk Control and Seated Stability after SCI",
    abstract:
      "With implanted FNS systems enabling spontaneous daily use, classical control can be applied to maintain stability in individuals with paralysis. We review practical challenges that prevent engineering-style implementations—model uncertainty, nonlinearities, and clinical constraints—and outline directions to mitigate them.",
  },
  {
    name: "Michael J. Fu & Mehmet Akif Gormez",
    affiliation:
      "Departments of ECSE and PM&R (MetroHealth), Case Western Reserve University",
    title: "Developing Assist-as-Needed FES Control for Stroke Rehabilitation",
    abstract:
      "We target effort-dependent FES to promote volitional engagement and motor learning. After reviewing nonlinear muscle behavior and ‘slacking,’ we present an assist-as-needed controller that modulates stimulation based on estimated effort. We discuss methods to estimate volition during concurrent stimulation and ongoing work toward clinical translation.",
  },
  {
    name: "Nathaniel Makowski",
    affiliation: "Case Western Reserve University",
    title:
      "The COSMIIC System and Implanted Neuroprosthesis Implementation for Walking after Partial Paralysis",
    abstract:
      "Overview of COSMIIC: an open-source, modular, fully implantable neuroprosthesis platform. We summarize system components, capabilities, and progress toward multi-channel implants to enhance walking in partial paralysis.",
  },
  {
    name: "Sandra Hnat",
    affiliation:
      "Case Western Reserve University / Louis Stokes Cleveland VA Medical Center",
    title:
      "Hybrid Exoskeleton Control Strategies for Enhanced Lower-Limb Rehabilitation",
    abstract:
      "We highlight three efforts: (1) a biologically-inspired terminal ILC (BIOTILC) in a bilateral exoskeleton with promising early results; (2) a unilateral stroke exoskeleton with assist-as-needed personalization; and (3) an external stimulation subsystem for commercial exoskeletons using IMU-based gait event triggers for hamstrings, quads, and glutes.",
  },
  {
    name: "Derek Wolf",
    affiliation: "University of Cincinnati",
    title:
      "Data-Driven Trajectory Optimization and Model Predictive Control for FES-Driven Reaching",
    abstract:
      "We develop person-specific data-driven models for electrically stimulated arm reaching and use them in trajectory optimization and MPC. In an individual with C1–C2 SCI, the controller achieved ~8.5 cm average hand position error. The approach supports rehab and assistive control and can be combined with robotics for shared control when FES alone is insufficient.",
  },
  {
    name: "Nicholas A. Rubino",
    affiliation: "PhD Candidate, Syracuse University",
    title:
      "FES-Augmented Robotic Stretching: New Tools for Managing Spasticity in SCI",
    abstract:
      "A powered stretching device paired with open/closed-loop FES enables static, AIS, and PNF hamstring stretching for individuals with SCI. We describe a closed-loop kinematic tracker and FES controllers to emulate AIS/PNF, with preliminary results in hospitalized veterans demonstrating feasibility.",
  },
];

const PROGRAM = [
  { time: "1:00–1:10", item: "Welcome & Opening Remarks", speakers: ["Mayank Singh", "Nitin Sharma"] },
  { time: "1:10–1:35", item: "Ultrasound-Informed Closed-loop Koopman MPC for Drop-Foot", speakers: ["Mayank Singh"] },
  { time: "1:35–2:00", item: "Ultrasound-Informed Optimal Control of Hybrid Exoskeleton", speakers: ["Nitin Sharma"] },
  { time: "2:00–2:25", item: "Closed-Loop Cadence Control for FES Cycling", speakers: ["Victor Duenas"] },
  { time: "2:25–2:35", item: "Break", speakers: [] },
  { time: "2:35–3:00", item: "Memristance Models for Fatigue/Recovery", speakers: ["Hanz Richter"] },
  { time: "3:00–3:25", item: "Control in Biological Systems: Trunk Control & Seated Stability", speakers: ["Musa L. Audu"] },
  { time: "3:25–3:50", item: "Assist-as-Needed FES for Stroke Rehab", speakers: ["Michael J. Fu", "Mehmet Akif Gormez"] },
  { time: "3:50–4:15", item: "COSMIIC: Implanted Neuroprosthesis for Walking", speakers: ["Nathaniel Makowski"] },
  { time: "4:15–4:40", item: "Hybrid Exoskeleton Strategies at the VA", speakers: ["Sandra Hnat"] },
  { time: "4:40–5:05", item: "Data-Driven MPC for FES-Driven Reaching", speakers: ["Derek Wolf"] },
  { time: "5:05–5:25", item: "FES-Augmented Robotic Stretching for Spasticity", speakers: ["Nicholas A. Rubino"] },
  { time: "5:25–5:30", item: "Closing & Next Steps", speakers: ["Organizers"] },
];

// =====================
// UI Helpers
// =====================
function SectionHeading({ k, title, subtitle }) {
  return (
    <div id={k} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-base sm:text-lg opacity-80">{subtitle}</p>}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-sm border border-black/10 bg-white/60 backdrop-blur">
      {children}
    </span>
  );
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden bg-white/70">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm sm:text-base leading-relaxed border-t border-black/5">
          {children}
        </div>
      )}
    </div>
  );
}

// =====================
// Main Component
// =====================
export default function WorkshopSite() {
  const dateString = useMemo(() => WORKSHOP.date_display, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur border-b border-black/5 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#top" className="font-bold">{WORKSHOP.code} · FES Workshop</a>
          <div className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#details" className="hover:opacity-70">Details</a>
            <a href="#program" className="hover:opacity-70">Program</a>
            <a href="#organizers" className="hover:opacity-70">Organizers</a>
            <a href="#speakers" className="hover:opacity-70">Speakers</a>
            <a href="#topics" className="hover:opacity-70">Topics</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
          >
            {WORKSHOP.code}: {WORKSHOP.title}
          </motion.h1>
          <p className="mt-5 max-w-3xl text-base sm:text-lg opacity-80">
            {WORKSHOP.abstract}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Pill><Calendar className="inline h-4 w-4 mr-2" /> {dateString}</Pill>
            <Pill><Calendar className="inline h-4 w-4 mr-2" /> {WORKSHOP.time}</Pill>
            <Pill><MapPin className="inline h-4 w-4 mr-2" /> {WORKSHOP.location}</Pill>
            <Pill><Users className="inline h-4 w-4 mr-2" /> {WORKSHOP.organizers.length}+ organizers</Pill>
          </div>
        </div>
      </header>

      {/* About / Topics */}
      <SectionHeading k="about" title="About the Workshop" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border border-black/10 bg-white/70">
            <h3 className="font-semibold text-lg mb-2">Goals</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">
              We convene clinicians, engineers, and researchers to discuss cutting-edge control, modeling, and estimation approaches for FES systems—bridging laboratory innovation with clinical practice.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-black/10 bg-white/70">
            <h3 className="font-semibold text-lg mb-2">Who Should Attend</h3>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">
              Researchers and practitioners in rehabilitation robotics, neuromuscular control, biomechanics, embedded sensing, and human-in-the-loop optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <SectionHeading k="topics" title="Planned Topics & Sessions" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 -mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          {WORKSHOP.topics.map((t, i) => (
            <div key={i} className="rounded-2xl p-5 border border-black/10 bg-white/70 text-sm sm:text-base leading-relaxed">
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <SectionHeading k="details" title="Event Details" subtitle="Time and location will be announced soon." />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl p-4 border border-black/10">
                <div className="text-sm opacity-70">Time</div>
                <div className="font-semibold mt-1">{WORKSHOP.time}</div>
              </div>
              <div className="rounded-xl p-4 border border-black/10">
                <div className="text-sm opacity-70">Location</div>
                <div className="font-semibold mt-1">{WORKSHOP.location}</div>
              </div>
              <div className="rounded-xl p-4 border border-black/10">
                <div className="text-sm opacity-70">Date</div>
                <div className="font-semibold mt-1">{WORKSHOP.date_display}</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              Check this page for updates. A detailed program (with timeslots) is listed below and may be adjusted.
            </p>
          </div>
        </div>
      </div>

      {/* Program */}
      <SectionHeading k="program" title="Program" subtitle={`${WORKSHOP.date_display} · ${WORKSHOP.time}`} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-8">
        <div className="rounded-2xl border border-black/10 bg-white/70 divide-y">
          {PROGRAM.map((row, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3">
              <div className="font-semibold w-32 shrink-0">{row.time}</div>
              <div className="flex-1">
                <div className="font-medium">{row.item}</div>
                {row.speakers.length > 0 && (
                  <div className="text-sm opacity-70">{row.speakers.join(", ")}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizers */}
      <SectionHeading k="organizers" title="Organizers" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {WORKSHOP.organizers.map((o, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white/70 p-5">
              <div className="font-semibold">{o.name}</div>
              <div className="text-sm opacity-70 mt-1">{o.org}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Speakers */}
      <SectionHeading k="speakers" title="Speakers & Talks" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {SPEAKERS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              className="rounded-2xl border border-black/10 bg-white/70 p-5"
            >
              <div className="text-lg font-bold">{s.name}</div>
              <div className="text-sm opacity-70">{s.affiliation}</div>
              <div className="mt-3 font-semibold">{s.title}</div>
              <div className="mt-3 text-sm leading-relaxed opacity-90">
                <Accordion title="Abstract (click to expand)">
                  <p>{s.abstract}</p>
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <SectionHeading k="contact" title="Contact" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-20">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex items-center gap-3"><Mail className="h-5 w-5"/><span>{WORKSHOP.contactEmail}</span></div>
          <div className="flex items-center gap-3"><Globe className="h-5 w-5"/><span>Share this page with collaborators and speakers.</span></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm">
          <span>© {new Date().getFullYear()} {WORKSHOP.code} · FES Workshop</span>
          <span className="opacity-70">Built with React & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
