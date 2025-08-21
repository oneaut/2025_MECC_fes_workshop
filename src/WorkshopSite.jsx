import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Users, Mail, Globe } from "lucide-react";

// =====================
// Data
// =====================
const WORKSHOP = {
  code: "W06",
  title:
    "Advancements in Modeling, Control, and Estimation for Functional Electrical Stimulation Systems: A MECC 2025 Workshop",
  time: "1:00–5:30 PM",
  location: "TBD",
  date_display: "Oct 5",
  organizers: [
    { name: "Mayank Singh", org: "North Carolina State University" },
    { name: "Nitin Sharma", org: "North Carolina State University" },
    { name: "Victor Duenas", org: "Syracuse University" },
  ],
  contactEmail: "msingh25@ncsu.edu",
  abstract:
    "The central theme of this workshop is Functional Electrical Stimulation (FES) control for dynamic movement, therapy, and rehabilitation—directly. The workshop discusses FES-induced challenges such as nonlinear, time-varying neuromuscular dynamics; muscle fatigue; inter- and intra-subject variability. Presentations highlight adaptive/learning control, Model Predictive Control for FES, and sensing interfaces (ultrasound, EMG, Implanted) that enable personalized, and clinically viable methods for FES-based therapy.",
  topics: [
    "Overview of FES for assistive and rehabilitative movement (SCI and stroke).",
    "Core challenges: nonlinear, time-varying responses; fatigue; variability; delays.",
    "Control methods: adaptive/Lyapunov, ILC, robust/SMC, MPC, intelligent (NN/RL).",
    "Human–machine interfaces for FES: ultrasound, EMG-in-the-loop, BCI-FES.",
  ],
};


const SPEAKERS = [
  {
    name: "Mayank Singh",
    affiliation: "PhD Candidate, North Carolina State University",
    title:
      "Ultrasound-Informed Closed-loop Koopman Model Predictive Control for Drop-Foot Correction",
    abstract:
      "TBD.",
  },
  {
    name: "Victor Duenas",
    affiliation: "Syracuse University",
    title:
      "Closed-Loop Cadence Controllers for FES-Induced Leg Cycling with Adaptive Motorized Assistance",
    abstract:
     "Functional electrical stimulation (FES)-induced cycling can aid in recovering muscle capacity and improving cardiovascular function following a spinal cord injury (SCI) or stroke. In stationary leg cycling, fall risks are mitigated –enabling people with balance deficits to actively exercise. Although significant progress has been made on the closed-loop control of FES-cycling systems, a critical need exists to develop adaptive strategies to overcome inherent technical challenges (i.e., nonlinear, time-varying muscle responses to FES, and uncertain parameters of the cycle-rider system) and capitalize on the participant's volitional effort, thus avoiding passive motion. This lecture covers the implementation and experimental results of a unified control design for muscles and an electric motor to provide assistance -customizing pedaling patterns across participants and exploiting the rider’s volition when possible. The closed-loop adaptive motor controller achieves cadence tracking and strategically exploits estimates of uncertain parameters of the cycle-rider dynamics and muscle effectiveness using input-output data. A state-feedback, saturated muscle controller is designed to yield bounded muscle responses. To demonstrate feasibility and safety, the controllers were tested in cycling trials with different speed trajectories and control parameters in able-bodied individuals and participants with SCI and post-stroke. The controllers require minimal tuning while obtaining predictable, satisfactory pedaling performance despite the inherent variability across participants.",
  },
  {
    name: "Hanz Richter",
    affiliation: "Cleveland State University",
    title: "Memristance as a Modeling Primitive for Muscle Fatigue and Recovery",
    abstract:
      "The physical realization of memristance -a constitutive relation between charge and magnetic flux- was speculated by Leon Chua in 1971 as the fourth fundamental circuit element, completing the known triad of capacitance, inductance and resistance. It was not until 2008 when researchers at HP labs obtained a physical element based on semiconductors that realized this element. Since then, analog devices implementing memristors, as well as devices in other physical domains behaving as memristors have been produced and studied. Memristor chips have found application in neuromorphic analog computing, due to their ability to mimic synaptic behavior. Memristance has also been considered for dynamic modeling of systems possessing memory and as part of adaptive algorithms. In this talk, memristance is presented as a new paradigm to capture the dynamic characteristics of muscular fatigue. A brief overview of the four physical constitutive relations is presented, highlighting the role of memristance.  An elementary fatigue model is constructed by dynamic extension of the Hill model, where a state variable is used to track the progression of fatigue or its reversal, as driven by activation inputs. The model is shown to be well-posed and to reproduce typical fatigue and recovery processes in the time domain.  The proposed model is also shown to satisfy the well-known spectral magnitude increase observed in EMG recordings of muscles undergoing fatigue. Finally, current and future work on the experimental identification of model parameters and the definition of more general models made of several memristive circuits is discussed.",
  },
  {
    name: "Musa L. Audu",
    affiliation: "Case Western Reserve University",
    title:
      "Challenges in Applying Control Concepts in Biological Systems with Applications to Trunk Control and Seated Stability after SCI",
    abstract:
      "Over the last couple of years there has been a resurging interest in applying concepts from control theory to biological systems. A lot of this is associated with the development of robust functional neuromuscular stimulation (FNS) systems; especially where these systems are fully implanted within the body and are therefore available for spontaneous use by the users without any need for donning and duffing. Our lab has been at the forefront in the deployment of a wide variety of implanted FNS systems. With these systems, it is possible to apply control systems to maintain stability (standing or sitting) in individuals that have lost these functions due to paralysis caused by spinal cord injury (SCI), stroke or other paralyzing disorders. However, there are a number of challenges that prevent the full implementation of these principles in the way that they are in engineering systems. In this presentation, we will explain some of these challenges and give perceptions of how they could be mitigated in the future.",
  },
  {
    name: "Michael J. Fu & Mehmet Akif Gormez",
    affiliation:
      "Departments of ECSE and PM&R (MetroHealth), Case Western Reserve University",
    title: "Developing Assist-as-Needed FES Control for Stroke Rehabilitation",
    abstract:
      "This presentation addresses clinical and technical challenges in applying Functional Electrical Stimulation (FES) for upper extremity rehabilitation following neurological injury due to stroke in an effort-dependent manner to promote volitional effort and motor learning during task practice by participants. We will discuss the limitations and effectiveness of current FES therapies, including nonlinear muscle behavior and reduced voluntary effort—referred to as “slacking.” We then introduce a human-in-the-loop assist-as-needed approach to modulate stimulation based on estimated user effort. The presentation outline is 1) Background on muscles, the nervous system, and stroke; 2) FES therapy after stroke and challenges in estimating volitional effort during simultaneous stimulation; 3) Ongoing work to develop an assist-as-needed FES controller.",
  },
  {
    name: "Nathaniel Makowski",
    affiliation: "Case Western Reserve University",
    title:
      "The COSMIIC System and Implanted Neuroprosthesis Implementation for Walking after Partial Paralysis",
    abstract:
      "The COSMIIC System is an open-source, modular, fully implantable neuroprosthesis system. This talk summarizes the components that comprise the system and its capabilities. We will also discuss the ongoing implementation of implanted, multi-channel neuroprostheses to enhance walking after partial paralysis.",
  },
  {
    name: "Sandra Hnat",
    affiliation:
      "Case Western Reserve University / Louis Stokes Cleveland VA Medical Center",
    title:
      "Hybrid Exoskeleton Control Strategies for Enhanced Lower-Limb Rehabilitation",
    abstract:
      "We will highlight the current hybrid exoskeleton technologies being developed at the Louis Stokes Cleveland VA Medical Center. There are three key areas of development: 1) a biologically-inspired terminal iterative learning controller (BIOTILC) used in a bilateral exoskeleton for individuals with spinal cord injury, which has shown promising results in simulation and initial participant testing; 2) a unilateral exoskeleton for stroke survivors, with ongoing work to implement assist-as-needed approaches for more personalized support; and, 3) an external electrical stimulation subsystem designed to work with commercial exoskeletons, which employ IMU-based algorithms to trigger muscle stimulation (hamstrings, quads, glutes) based on thigh and shank velocity for enhanced rehabilitative outcomes.",
  },
  {
    name: "Derek Wolf",
    affiliation: "University of Cincinnati",
    title:
      "Data-Driven Trajectory Optimization and Model Predictive Control for FES-Driven Reaching",
    abstract:
      "The restoration of hand and arm function is the highest rehabilitation priority for individuals with tetraplegia due to spinal cord injury. Functional electrical stimulation (FES) offers promise to restore reaching and grasping to these individuals and has shown success in rehabilitation applications. A major barrier to implementing FES-driven reaching neuroprostheses outside the clinic is the complex control problem caused by the everchanging detrimental muscle characteristics (i.e., atrophy, rapid fatigue, and fewer activatable muscles) that develop following spinal cord injury. Additionally, the goal-directed, non-repetitive nature of reaching motions creates a need for a control strategy that can complete any novel, arbitrary reach. We addressed these barriers by developing person- specific, data-driven models of an individual’s arm when electrically stimulated. Using these models as the basis of a data-driven trajectory optimization and a model predictive control strategy that accounts for the person-specific muscle capabilities, we implemented a full-arm reaching controller in an individual with a C1-C2 level spinal cord injury. The controller achieved an average hand position accuracy of 8.5 cm. Person-specific models like these have great potential to be used to drive rehabilitation as well as control assistive devices for daily use. This control strategy could also be used in combination with a robotic device for shared control of reaching motions that are infeasible or inaccurate with FES alone.",
},
  {
    name: "Nicholas A. Rubino",
    affiliation: "PhD Candidate, Syracuse University",
    title:
      "FES-Augmented Robotic Stretching: New Tools for Managing Spasticity in SCI",
    abstract:
      "Hamstring spasticity in people with spinal cord injury (SCI) causes severe lower limb dysfunction. Static stretching is a primary treatment for spasticity; however, providing personalized and repeatable stretches is caregiver intensive. Recent work has developed a powered robotic device paired with functional electrical stimulation (FES) to automate static, active isolated (AIS), and proprioceptive neuromuscular facilitation (PNF) stretching of the hamstrings. Compared with static stretching, which relies primarily on passive tension, AIS and PNF stretching exploit reciprocal inhibition and Golgi tendon organ activation in a lengthened agonist, respectively, to more effectively increase range of motion and soft tissue extensibility. However, these techniques require voluntary activation of the agonist (PNF) or antagonist (AIS) muscles. The role of FES in stretching for people with SCI is to augment or replace the participant&#39;s ability to provide voluntary muscle activation and facilitate more effective stretching techniques such as AIS and PNF for treatment of spasticity. This lecture covers the iterative implementation of a closed-loop kinematic tracking controller for the powered stretching device paired with open-and closed-loop FES controllers used to emulate AIS and PNF stretching of the hamstrings. Preliminary experiments of the closed-loop stretching techniques in hospitalized veterans with SCI will be presented.",
  },
  {
    name: "Shane King",
    affiliation: "Dept. of Mechanical Engineering, Rice University",
    title: "Personalized Hybrid FES-Exoskeleton Assistance of the Upper Limb for Individuals with Tetraplegia",
    abstract: "With approximately 300,000 people in the United States living with a spinal cord injury, roughly 60% experience tetraplegia. 49% of surveyed individuals with tetraplegia indicate that the restoration of arm and hand function is their top priority. Based on these results, there is a need for an assistive device to improve upper limb functionality to increase the level of independence of those living with tetraplegia. While previous endeavors have used robotic exoskeletons or functional electrical stimulation (FES) towards this goal, the limitations of each of these modalities have inhibited their accessibility and delayed their widespread adoption including the high bulk of exoskeleton systems due to high power consumption and poor accuracy and repeatability of FES systems for reaching tasks. Our proposed solution utilizes a hybrid FES-exoskeleton system to preserve the benefits of each system while eliminating their deficits. We use model predictive control to coordinate motion between both the FES and exoskeleton systems on the same joints in parallel. By relying primarily on FES to provide the bulk of the torque production, but using the exoskeleton to fine tune movement, we can ensure high accuracy movements while reducing power consumption to allow for future low-weight, wearable exoskeleton designs. Our experiments applying this control methodology have shown promising results in one and two degree of freedom movements at the elbow and wrist. However, when performing more complex movements, torque reduction is reduced, potentially due to muscle model inaccuracies and overstimulation of the forearm. In an effort to resolve these issues, we are investigating methods to personalize movement trajectories based on an individual’s muscle models. With personalization, we seek to optimize trajectories to reduce the required muscular effort while ensuring efficient, smooth, and achievable trajectories based on an individual’s muscle capabilities in an effort to improve the performance of the hybrid system for individuals with spinal cord injury..",
  },
  {
    name: "Ronald Triolo",
    affiliation: "Dept. of Veterans Affairs & Case Western Reserve University",
    title: "Simple Control Systems Enable Enhanced Options for Mobility and Exercise after Paralysis",
    abstract: "Relatively unsophisticated control systems for peripheral nerve stimulation can enable repeatable, clinically useful, and health and independence promoting options for persons paralyzed by SCI or other CNS disorders. This high-level presentation will summarize a few examples of such systems that facilitate independent transfers, standing, stepping, and seated mobility, or reduce the need for personal assistance. In addition, practical and readily implementable approaches can prolong contractile output to extend exercise duration or intensity and thus promote positive physiological adaptation and the overall health and social engagement of individuals with paralysis. Clinical need and motivation for the development of neural stimulation technologies, as well as their physiological, functional, and psychosocial impacts as evidenced by experiences at Case Western Reserve University and the Louis Stokes Cleveland VA Medical Center will be highlighted..",
  },
];


const PROGRAM = [
  { time: "1:00–1:10", item: "Welcome & Opening Remarks", speakers: ["Mayank Singh", "Nitin Sharma"] },
  { time: "1:10–1:35", item: "Ultrasound-Informed Closed-loop Koopman MPC for Drop-Foot", speakers: ["Mayank Singh"] },
  { time: "1:35–2:00", item: "Closed-Loop Cadence Control for FES Cycling", speakers: ["Victor Duesnas"] },
  { time: "2:00–2:25", item: "Personalized Hybrid FES-Exoskeleton Assistance of the Upper Limb for Individuals with Tetraplegia", speakers: ["Shane King"] },
  { time: "2:25–2:35", item: "Break", speakers: [] },
  { time: "2:35–3:00", item: "Memristance Models for Fatigue/Recovery", speakers: ["Hanz Richter"] },
  { time: "3:00–3:25", item: "Control in Biological Systems: Trunk Control & Seated Stability", speakers: ["Musa L. Audu"] },
  { time: "3:25–3:50", item: "Assist-as-Needed FES for Stroke Rehab", speakers: ["Michael J. Fu", "Mehmet Akif Gormez"] },
  { time: "3:50–4:15", item: "COSMIIC: Implanted Neuroprosthesis for Walking", speakers: ["Nathaniel Makowski"] },
  { time: "4:15–4:40", item: "Hybrid Exoskeleton Strategies at the VA", speakers: ["Sandra Hnat"] },
  { time: "4:40–5:05", item: "Data-Driven MPC for FES-Driven Reaching", speakers: ["Derek Wolf"] },
  { time: "5:05–5:25", item: "FES-Augmented Robotic Stretching for Spasticity", speakers: ["Nicholas A. Rubino"] },
  { time: "5:25–5:30", item: "Simple Control Systems Enable Enhanced Options for Mobility and Exercise after Paralysis", speakers: ["Ronald Triolo"] },
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
