import { Calendar, Award, BookOpen, Users, DollarSign } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      date: "Nov 2024",
      category: "Achievement",
      icon: Award,
      title: "Bhattacharjee Successfully Defends PhD",
      description: "Kaustav Bhattacharjee successfully defended his PhD dissertation on Interactive Visualization Workflows for Mitigating Analytical Uncertainty.",
    },
    {
      date: "Jun 2024",
      category: "Publication",
      icon: BookOpen,
      title: "Koli's Paper Accepted at CHI-NLP Workshop",
      description: "Research on visual analytics for natural language processing accepted at the CHI 2024 workshop.",
    },
    {
      date: "Apr 2024",
      category: "Award",
      icon: Award,
      title: "Best Poster Prize at NYC Privacy Day",
      description: "Bhattacharjee's poster on privacy-aware visual analytics won the best poster prize at NYC Privacy Day 2024.",
    },
    {
      date: "Feb 2024",
      category: "Publication",
      icon: BookOpen,
      title: "Paper Published at IEEE ISGT NA 2024",
      description: "Research on visual analytics for smart grid decision-making published at the IEEE ISGT North America conference.",
    },
    {
      date: "Nov 2023",
      category: "Publication",
      icon: BookOpen,
      title: "Yuan's Paper Accepted at AI in Action Workshop",
      description: "Work on explainable AI for algorithmic ranking accepted at the NeurIPS 2023 workshop.",
    },
    {
      date: "Sep 2023",
      category: "Grant",
      icon: DollarSign,
      title: "DOE CESER Grant Awarded",
      description: "Dr. Dasgupta receives Department of Energy Cybersecurity, Energy Security, and Emergency Response (CESER) grant via Pacific Northwest National Laboratory.",
    },
    {
      date: "Aug 2023",
      category: "Event",
      icon: Users,
      title: "Lightning Talk at SOUPS 2023",
      description: "Bhattacharjee delivered a lightning talk on privacy visualization at the Symposium on Usable Privacy and Security.",
    },
    {
      date: "Jul 2023",
      category: "Grant",
      icon: DollarSign,
      title: "NSF Future of Work Grant Awarded",
      description: "Dr. Dasgupta awarded National Science Foundation grant for research on AI-driven decision making in the future of work.",
    },
    {
      date: "Jun 2023",
      category: "Event",
      icon: Users,
      title: "Yuan and Bhattacharjee Present at HILDA",
      description: "Two papers presented at the HILDA workshop at CHI 2023 on human-in-the-loop data analytics.",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Achievement: "bg-primary",
      Publication: "bg-blue-500",
      Award: "bg-amber-500",
      Grant: "bg-green-500",
      Event: "bg-purple-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Red Accent Line */}
      {/* <div className="relative h-0.5 bg-[#CC0000]">
        <div className="absolute inset-0 bg-[#CC0000] opacity-20 blur-lg h-6 -top-3" />
      </div> */}
      <div className="h-px bg-[#CC0000]/90" />
      
      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Lab News & Updates</h1>
          <p className="text-lg text-gray-600">
            Latest achievements, publications, and events from the NIIV Lab
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2" />

          <div className="space-y-12">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex items-start gap-8 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-[#CC0000] md:left-1/2" />

                {/* Empty space for alternating layout */}
                <div className="hidden flex-1 md:block" />

                {/* Content */}
                <div className="flex-1 transition-all hover:shadow-xl ml-16 md:ml-0 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className={`h-5 w-5 text-white p-1 rounded ${getCategoryColor(item.category)}`} />
                      <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 text-gray-900 px-2.5 py-0.5 text-xs font-semibold">
                        {item.category}
                      </span>
                      <div className="ml-auto flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-3 w-3" />
                        {item.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold leading-none tracking-tight text-gray-900">{item.title}</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default News;
