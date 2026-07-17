import { FileText, ExternalLink, Play } from "lucide-react";
import type { Paper } from "../data/projectData.ts";

interface PaperCardProps {
  paper: Paper;
}

const PaperCard = ({ paper }: PaperCardProps) => {
  return (
    <article className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Paper Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {paper.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{paper.subtitle}</p>
        <p className="text-sm text-[#CC0000] font-semibold">{paper.venue}</p>
      </div>

      {/* Media Section */}
      {paper.media && (
        <div className="mb-4">
          {paper.mediaType === "video" ? (
            <div className="relative w-full rounded-lg overflow-hidden shadow-md" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={paper.media}
                title={paper.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={paper.media}
              alt={paper.title}
              className="w-full rounded-lg shadow-md object-cover max-h-80"
            />
          )}
        </div>
      )}

      {/* Abstract */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {paper.abstract}
      </p>

      {/* Action Links */}
      <div className="flex flex-wrap gap-3">
        {paper.links.paper && (
          <a
            href={paper.links.paper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#CC0000] text-white px-4 py-2 text-sm rounded-md hover:bg-[#CC0000]/90 transition-colors shadow-sm hover:shadow-md"
          >
            <FileText className="h-4 w-4" />
            Paper
          </a>
        )}
        {paper.links.details && (
          <a
            href={paper.links.details}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Details
          </a>
        )}
        {paper.links.video && !paper.media && (
          <a
            href={paper.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Play className="h-4 w-4" />
            Video
          </a>
        )}
      </div>
    </article>
  );
};

export default PaperCard;
