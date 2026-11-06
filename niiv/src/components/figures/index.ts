import type { ComponentType } from "react";
import GenerateValidateRepairFigure from "./GenerateValidateRepairFigure";

/**
 * Figures drawn in code instead of shown as an image. A paper figure with a
 * matching `interactive` id is replaced by its component on the paper page;
 * its image is still used everywhere else (thumbnails, the home spotlight).
 */
export const INTERACTIVE_FIGURES: Record<string, ComponentType> = {
  "generate-validate-repair": GenerateValidateRepairFigure,
};
