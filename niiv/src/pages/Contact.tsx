// import { useEffect, useState } from "react";
// import { Mail, MapPin, Briefcase, Copy, ExternalLink } from "lucide-react";

// const Contact = () => {
//   const njitCampus = new URL("../assets/images/njit-campus.png", import.meta.url).href;

//   // ---- Address & map helpers ----
//   const ADDRESS_TEXT = "218 Central Ave, Newark, NJ 07102";
//   const GMAPS_Q = encodeURIComponent(ADDRESS_TEXT);
//   const GMAPS_VIEW = `https://maps.google.com/?q=${GMAPS_Q}`;
//   const GMAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${GMAPS_Q}`;
//   const APPLE_MAPS = `https://maps.apple.com/?q=${GMAPS_Q}`;

//   const [mapsLabel, setMapsLabel] = useState("Open in Maps");
//   const [mapsHref, setMapsHref] = useState(GMAPS_VIEW);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//     if (isiOS) {
//       setMapsLabel("Open in Apple Maps");
//       setMapsHref(APPLE_MAPS);
//     } else {
//       setMapsLabel("Open in Google Maps");
//       setMapsHref(GMAPS_VIEW);
//     }
//   }, []);

//   const copyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(ADDRESS_TEXT);
//       setCopied(true);
//       window.setTimeout(() => setCopied(false), 1400);
//     } catch {
//       // noop
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Red Accent Line */}
//       <div className="bg-white bg-grid bg-vignette">
//         {/* <div className="relative h-0.5 bg-[#CC0000]">
//           <div className="absolute inset-0 -top-3 h-6 bg-[#CC0000] opacity-20 blur-lg" />
//         </div> */}
//         <div className="h-px bg-[#CC0000]/90" />
//       </div>

//       <div className="py-16">
//         <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
//           {/* Header */}
//           <div className="mb-12 text-center">
//             <h1 className="mb-4 text-4xl font-bold text-foreground">Get in Touch</h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Interested in our research or joining the lab? We'd love to hear from you.
//             </p>
//           </div>

//           {/* Two Column Layout */}
//           <div className="grid gap-8 lg:grid-cols-2 mb-16">
//             {/* Left Column */}
//             <div className="space-y-8">
//               {/* Email Card */}
//               <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
//                 <h2 className="mb-2 text-2xl font-bold text-foreground">Send Us a Message</h2>
//                 <p className="mb-6 text-muted-foreground">
//                   For research inquiries, collaborations, or prospective students, please contact us directly.
//                 </p>

//                 <a
//                   href="mailto:aritra.dasgupta@njit.edu"
//                   className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                 >
//                   <Mail className="h-5 w-5" />
//                   aritra.dasgupta@njit.edu
//                 </a>

//                 <p className="mt-3 text-xs text-muted-foreground">
//                   We typically respond within 2–3 business days.
//                 </p>
//               </div>

//               {/* Location Card (new design) + map functionality */}
//               <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
//                 {/* Image header */}
//                 <div className="relative h-64">
//                   <img src={njitCampus} alt="NJIT Campus" className="h-full w-full object-cover" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                     <div className="flex items-center gap-2 mb-2">
//                       <MapPin className="h-5 w-5" />
//                       <h3 className="text-xl font-semibold">Our Location</h3>
//                     </div>
//                     <p className="text-white/90">
//                       218 Central Ave
//                       <br />
//                       Newark, NJ, USA – 07102
//                     </p>
//                   </div>
//                 </div>

//                 {/* Map + actions */}
//                 <div className="p-6 space-y-5">
//                   {/* Embedded Map */}
//                   <div className="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-border bg-background">
//                     <iframe
//                       title="Map – 218 Central Ave, Newark, NJ 07102"
//                       src={`https://www.google.com/maps?q=${GMAPS_Q}&output=embed`}
//                       className="h-full w-full border-0"
//                       loading="lazy"
//                       referrerPolicy="no-referrer-when-downgrade"
//                     />
//                   </div>

//                   {/* Address + building */}
//                   <div className="text-sm">
//                     <p className="text-muted-foreground font-medium mb-1">Address</p>
//                     <p className="text-muted-foreground">
//                       GITC (William S. Guttenberg Information Technologies Center)
//                     </p>
//                     <a
//                       href={GMAPS_VIEW}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-1 inline-block text-foreground hover:text-[#CC0000] hover:underline"
//                     >
//                       {ADDRESS_TEXT}
//                     </a>
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex flex-wrap gap-2">
//                     <a
//                       href={GMAPS_DIR}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 rounded-lg bg-[#CC0000] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#b70000]"
//                     >
//                       <ExternalLink className="h-4 w-4" />
//                       Get directions
//                     </a>

//                     <a
//                       href={mapsHref}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
//                     >
//                       <MapPin className="h-4 w-4" />
//                       {mapsLabel}
//                     </a>

//                     <button
//                       type="button"
//                       onClick={copyAddress}
//                       className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
//                       aria-label="Copy address to clipboard"
//                     >
//                       <Copy className="h-4 w-4" />
//                       {copied ? "Copied!" : "Copy address"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column (sticky hiring card like your new design) */}
//             <div className="rounded-xl border-2 border-primary bg-primary/5 p-8 shadow-lg h-fit lg:sticky lg:top-24">
//               <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
//                 We're Hiring!
//               </div>

//               <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Research Lab</h2>

//               <p className="mb-6 text-muted-foreground">
//                 We are recruiting 2–3 PhD students for Fall 2025 as part of the PhD in Data Science program at NJIT.
//               </p>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-foreground mb-3">We're looking for:</h3>
//                 <ul className="space-y-2 text-muted-foreground">
//                   {[
//                     "Strong programming background (JavaScript, Python)",
//                     "Foundation in computational and statistical methods",
//                     "GRE Quantitative Score ≥ 163",
//                     "Keen interest in human-centered data science",
//                     "Passion for research and exploration",
//                   ].map((item) => (
//                     <li key={item} className="flex gap-2">
//                       <span className="text-primary">•</span>
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <a
//                 href="mailto:aritra.dasgupta@njit.edu?subject=PhD Application - NIIV Lab"
//                 className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//               >
//                 <Briefcase className="h-5 w-5" />
//                 Have Questions? Email Us
//               </a>
//             </div>
//           </div>

//           {/* Research Topics Section */}
//           <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
//             <h2 className="mb-3 text-3xl font-bold text-foreground">Research Topics</h2>
//             <p className="mb-6 text-muted-foreground">
//               Some of the research topics we are addressing include (but are not limited to) the following:
//             </p>

//             <ul className="grid gap-4 md:grid-cols-2">
//               {[
//                 {
//                   lead: "Funded by NSF",
//                   text: "Design and evaluate interactive explanation methods (XAI+visualization) for algorithmic rankers",
//                   linkText: "algorithmic rankers",
//                 },
//                 {
//                   lead: "Funded by NSF",
//                   text: "In collaboration with organizational psychologists and AI researchers, develop and evaluate transparent data-driven solutions for hiring AI",
//                 },
//                 {
//                   lead: "Funded by DOE",
//                   text: "Develop human-machine teaming tools for secure cyber-physical systems such as the electric grid",
//                 },
//                 { text: "Analyze how visual communication methods can aid evidence-based human reasoning" },
//                 {
//                   text: "Study how novel human-AI interfaces should be designed for optimizing crisis (e.g., the pandemic) information communication",
//                 },
//                 {
//                   text: "Explore the interplay between text-based and visual interfaces using a combination of GenAI and interactive visualizations for optimizing data-driven sensemaking of complex information",
//                 },
//               ].map((item, idx) => (
//                 <li key={idx} className="flex gap-3">
//                   <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
//                   <span className="text-foreground leading-relaxed">
//                     {item.lead ? <span className="font-semibold text-primary">{item.lead} </span> : null}
//                     {item.text}
//                     {item.linkText ? (
//                       <>
//                         {" "}
//                         <a href="#" className="text-primary underline hover:no-underline">
//                           {item.linkText}
//                         </a>
//                       </>
//                     ) : null}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Briefcase, Copy, ExternalLink } from "lucide-react";

const Contact = () => {
  const njitCampus = new URL("../assets/images/njit-campus.png", import.meta.url).href;

  // ---- Address & map helpers ----
  const ADDRESS_TEXT = "218 Central Ave, Newark, NJ 07102";
  const GMAPS_Q = encodeURIComponent(ADDRESS_TEXT);
  const GMAPS_VIEW = `https://maps.google.com/?q=${GMAPS_Q}`;
  const GMAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${GMAPS_Q}`;
  const APPLE_MAPS = `https://maps.apple.com/?q=${GMAPS_Q}`;

  const [mapsLabel, setMapsLabel] = useState("Open in Maps");
  const [mapsHref, setMapsHref] = useState(GMAPS_VIEW);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isiOS) {
      setMapsLabel("Open in Apple Maps");
      setMapsHref(APPLE_MAPS);
    } else {
      setMapsLabel("Open in Google Maps");
      setMapsHref(GMAPS_VIEW);
    }
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS_TEXT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // noop
    }
  };

  const topics = useMemo(
    () => [
      {
        funder: "NSF",
        text:
          "Design and evaluate interactive explanation methods (XAI + visualization) for algorithmic rankers",
        linkText: "algorithmic rankers",
      },
      {
        funder: "NSF",
        text:
          "In collaboration with organizational psychologists and AI researchers, develop and evaluate transparent data-driven solutions for hiring AI",
      },
      {
        funder: "DOE",
        text:
          "Develop human-machine teaming tools for secure cyber-physical systems such as the electric grid",
      },
      {
        text: "Analyze how visual communication methods can aid evidence-based human reasoning",
      },
      {
        text:
          "Study how novel human-AI interfaces should be designed for optimizing crisis (e.g., the pandemic) information communication",
      },
      {
        text:
          "Explore the interplay between text-based and visual interfaces using a combination of GenAI and interactive visualizations for optimizing data-driven sensemaking of complex information",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top red accent line (keep simple) */}
      <div className="bg-white bg-grid bg-vignette">
        <div className="h-px bg-[#CC0000]/90" />
      </div>

      <div className="py-16">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold text-foreground">Get in Touch</h1>
            <div className="mx-auto mb-4 h-px w-14 rounded-full bg-[hsl(25,65%,50%)]/55" />
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Interested in our research or joining the lab? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Email Card (slightly softer background) */}
              <div className="rounded-xl border border-border bg-muted/20 p-8 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Send Us a Message</h2>
                <p className="mb-6 text-muted-foreground">
                  For research inquiries, collaborations, or prospective students, please contact us directly.
                </p>

                <a
                  href="mailto:aritra.dasgupta@njit.edu"
                  className="
                    inline-flex items-center gap-2 rounded-lg
  bg-[#CC0000] px-6 py-3
  text-base font-medium text-white
  shadow-sm
  hover:bg-[#CC0000]/90
                  "
                >
                  <Mail className="h-5 w-5" />
                  aritra.dasgupta@njit.edu
                </a>

                <p className="mt-3 text-xs text-muted-foreground">
                  We typically respond within 2–3 business days.
                </p>
              </div>

              {/* Location Card */}
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                {/* Image header */}
                <div className="relative h-64">
                  <img src={njitCampus} alt="NJIT Campus" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <h3 className="text-xl font-semibold">Our Location</h3>
                    </div>
                    <p className="text-white/90">
                      218 Central Ave
                      <br />
                      Newark, NJ, USA – 07102
                    </p>
                  </div>
                </div>

                {/* Map + actions */}
                <div className="space-y-5 p-6">
                  {/* Embedded Map */}
                  <div className="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-border bg-background">
                    <iframe
                      title="Map – 218 Central Ave, Newark, NJ 07102"
                      src={`https://www.google.com/maps?q=${GMAPS_Q}&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Address + building */}
                  <div className="text-sm">
                    <p className="mb-1 font-medium text-muted-foreground">Address</p>
                    <p className="text-muted-foreground">
                      GITC (William S. Guttenberg Information Technologies Center)
                    </p>
                    <a
                      href={GMAPS_VIEW}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-foreground underline-offset-4 hover:text-[#CC0000] hover:underline"
                    >
                      {ADDRESS_TEXT}
                    </a>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {/* Primary CTA */}
                    <a
                      href={GMAPS_DIR}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                        text-white transition-colors bg-[#CC0000] hover:bg-[#CC0000]/90
                      "
                    >
                      <ExternalLink className="h-4 w-4" />
                      Get directions
                    </a>

                    {/* Secondary */}
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 rounded-lg border border-border
                        bg-background px-4 py-2 text-sm font-medium text-foreground
                        transition-colors hover:bg-muted/50
                      "
                    >
                      <MapPin className="h-4 w-4" />
                      {mapsLabel}
                    </a>

                    {/* Secondary */}
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="
                        inline-flex items-center gap-2 rounded-lg border border-border
                        bg-background px-4 py-2 text-sm font-medium text-foreground
                        transition-colors hover:bg-muted/50
                      "
                      aria-label="Copy address to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy address"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hiring Card (calm academic) */}
            <div className="h-fit rounded-xl border border-border bg-card p-8 shadow-sm lg:sticky lg:top-24">
              <div className="mb-4 inline-flex items-center rounded-full bg-[#CC0000]/10 px-3 py-1 text-sm font-semibold text-[#CC0000]">
                We&apos;re Hiring
              </div>

              <h2 className="mb-3 text-3xl font-bold text-foreground">Join Our Research Lab</h2>
              <div className="mb-6 h-px w-12 rounded-full bg-[hsl(25,65%,50%)]/55" />

              <p className="mb-6 text-muted-foreground">
                We are recruiting 2–3 PhD students for Fall 2025 as part of the PhD in Data Science program at NJIT.
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">We&apos;re looking for:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    "Strong programming background (JavaScript, Python)",
                    "Foundation in computational and statistical methods",
                    "GRE Quantitative Score ≥ 163",
                    "Keen interest in human-centered data science",
                    "Passion for research and exploration",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(25,65%,50%)]/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="mailto:aritra.dasgupta@njit.edu?subject=PhD%20Application%20-%20NIIV%20Lab"
                className="
                  inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3
                  text-base font-medium text-white shadow-sm transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  bg-[#CC0000] hover:bg-[#CC0000]/90
                  focus-visible:ring-[#CC0000]
                "
              >
                <Briefcase className="h-5 w-5" />
                Have Questions? Email Us
              </a>

              <p className="mt-3 text-xs text-muted-foreground">
                Tip: include your CV + brief research interests in the email.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px w-full bg-gray-100" />

          {/* Research Topics Section */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-3 text-3xl font-bold text-foreground">Research Topics</h2>
            <p className="mb-6 text-muted-foreground">
              Some of the research topics we are addressing include (but are not limited to) the following:
            </p>

            <ul className="grid gap-4 md:grid-cols-2">
              {topics.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(25,65%,50%)]/80" />
                  <div className="text-foreground leading-relaxed">
                    {item.funder ? (
                      <span className="mr-2 inline-flex items-center gap-1 rounded-full
                          bg-[hsl(25,65%,50%)]/15
                          px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide
                          text-[hsl(25,65%,50%)]">
                        Funded by {item.funder}
                      </span>
                    ) : null}
                    <span className="text-muted-foreground">{item.text}</span>
                    {item.linkText ? (
                      <>
                        {" "}
                        <a
                          href="#"
                          className="text-[#2563EB] underline underline-offset-4 hover:no-underline"
                        >
                          {item.linkText}
                        </a>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* tiny accent at bottom (optional) */}
          <div className="mt-10 flex justify-center">
            <div className="h-px w-16 rounded-full bg-[hsl(25,65%,50%)]/45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
