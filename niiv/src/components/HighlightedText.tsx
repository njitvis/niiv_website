type HighlightedTextProps = {
  text: string;
  terms: string[];
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HighlightedText = ({ text, terms }: HighlightedTextProps) => {
  const displayTerms = terms.filter((term) => term.length > 0);

  if (displayTerms.length === 0) return <>{text}</>;

  const matcher = new RegExp(
    `(${displayTerms.map(escapeRegExp).join("|")})`,
    "gi",
  );
  const parts = text.split(matcher);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = displayTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase(),
        );

        return isMatch ? (
          <mark
            key={`${part}-${index}`}
            className="rounded-sm bg-[#CC0000]/10 px-0.5 font-semibold text-[#8F0000]"
          >
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
};

export default HighlightedText;
