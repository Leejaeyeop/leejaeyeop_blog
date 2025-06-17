import { ExperienceArticleProps } from "@/components/organism/articles/ExperienceArticle";
import {
  AsianArticle,
  BareunArticle,
  DalgonaArticle,
  ImqaArticle,
} from "./work/workArticles";
import {
  FairyTaleArticle,
  PortfolioArticle,
  ReactProgressBarArticle,
  TsGuardArticle,
} from "./personal/personalArticles";

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
