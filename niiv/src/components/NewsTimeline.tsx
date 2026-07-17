import { Calendar, Award, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsTimeline = () => {
  const recentNews = [
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
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Achievement: "bg-primary",
      Publication: "bg-blue-500",
      Award: "bg-amber-500",
      Grant: "bg-green-500",
      Event: "bg-purple-500",
    };
    return colors[category] || "bg-muted";
  };

  return (
    <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Latest News & Updates</h2>
        <p className="text-gray-600">Recent highlights from the NIIV Lab</p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-16 w-0.5 bg-gray-200 md:left-8" />

        <div className="space-y-8">
          {recentNews.map((item, idx) => (
            <div key={idx} className="relative pl-12 md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-4 border-white bg-[#CC0000] md:left-8" />

              {/* Content */}
              <div className="group transition-all hover:shadow-xl hover:scale-[1.02] rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <item.icon className={`h-5 w-5 text-white p-1 rounded ${getCategoryColor(item.category)}`} />
                    <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 text-gray-900 px-2.5 py-0.5 text-xs font-semibold">
                      {item.category}
                    </span>
                    <div className="ml-auto flex items-center text-sm text-gray-600">
                      <Calendar className="mr-1 h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold leading-none tracking-tight text-gray-900 group-hover:text-[#CC0000] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            to="/news"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-11 px-8 text-base"
          >
            View All News
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTimeline;
