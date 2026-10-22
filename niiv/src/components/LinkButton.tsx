import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonClassName, secondaryButtonClassName } from "../lib/buttons";

type LinkButtonProps = {
  href: string;
  label: string;
  icon?: LucideIcon;
  /** Primary (black) for the one main action; outlined otherwise. */
  primary?: boolean;
};

/** A link styled as a button. Site paths open in place; other links open in a new tab. */
const LinkButton = ({ href, label, icon: Icon, primary = false }: LinkButtonProps) => {
  const className = primary ? buttonClassName : secondaryButtonClassName;
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {label}
    </>
  );

  if (href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href)) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};

export default LinkButton;
