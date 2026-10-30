import Image from "next/image";
import { LinkButton } from "../Button/Button";
import { Card } from "../Card/Card";
import styles from "./EmptyFeedback.module.scss";

export function EmptyFeedback() {
  return (
    <Card className={styles.empty}>
      <Image className={styles.illustration} src="/assets/suggestions/illustration-empty.svg" alt="" width={102} height={108} />
      <h2 className={styles.title}>There is no feedback yet.</h2>
      <p className={styles.text}>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
      </p>
      <LinkButton href="/feedback/new" compact className={styles.button}>
        + Add Feedback
      </LinkButton>
    </Card>
  );
}
