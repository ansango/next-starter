import Image from "next/image";
import styles from "@/styles/components/ui/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image src="/static/images/then.png" alt="Vercel Logo" width={72} height={72} />
    </footer>
  );
};

export default Footer;
