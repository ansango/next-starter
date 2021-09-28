import type { NextPage } from "next";
import PageSeo from "@/components/seo/PageSeo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Home.module.css";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation();
  console.log(t("home:welcome_msg"));
  return (
    <>
      <PageSeo title="Next.js starter" description="A Next.js Starter" />
      <></>

      <main className={styles.main}>
        <h1 className={styles.title}>{t("home:welcome_msg")}</h1>
        <p className={styles.description}>Configuración del starter</p>
        <ul className={styles.grid}>
          {tools.map((tool) => (
            <li key={tool.name} className={styles.card}>
              <h2>{t(`home:${tool.name}`)}</h2>
              <p>{t(`home:${tool.description}`)}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;

const tools = [
  {
    name: "Next.js",
    url: "https://nextjs.org/",
    description: "The React Framework",
  },
  {
    name: "Typescript",
    url: "https://www.typescriptlang.org/",
    description: "Typed superset of JavaScript",
  },
  {
    name: "ESLint",
    url: "https://eslint.org/",
    description: "Code quality tool",
  },
  {
    name: "Prettier",
    url: "https://prettier.io/",
    description: "A code formatter",
  },
  {
    name: "Husky",
    url: "https://github.com/typicode/husky",
    description: "Modern native Git hooks",
  },
  {
    name: "Lint-Staged",
    url: "https://github.com/okonet/lint-staged",
    description: "Run linters on git staged files",
  },
  {
    name: "next-i18next",
    url: "https://github.com/isaachinman/next-i18next",
    description: "Translate your NextJs apps.",
  },
  {
    name: "i18nexus",
    url: "https://i18nexus.com/",
    description: "Automate your translations ",
  },
  {
    name: "Sitemap Generator",
    url: "",
    description: "Sitemap ready on deploy",
  },
  {
    name: "RSS Generator",
    url: "",
    description: "Feed ready on deploy",
  },
];
