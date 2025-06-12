import { ExperienceArticleProps } from "@/components/organism/articles/ExperienceArticle";
import {
  AsianArticle,
  BareunArticle,
  DalgonaArticle,
  ImqaArticle,
} from "./work/workSection";
import {
  FairyTaleArticle,
  PortfolioArticle,
  ReactProgressBarArticle,
  TsGuardArticle,
} from "./personal/personalSection";

export type Props = Pick<
  ExperienceArticleProps,
  "idx" | "setCursection" | "currentSection"
>;

export {
  ImqaArticle,
  DalgonaArticle,
  AsianArticle,
  BareunArticle,
  TsGuardArticle,
  FairyTaleArticle,
  ReactProgressBarArticle,
  PortfolioArticle,
};
