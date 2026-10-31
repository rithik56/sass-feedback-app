"use client";

import { useState, type ReactNode } from "react";
import { Button, type ButtonVariant } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { FormField } from "../../components/FormField/FormField";
import { GoBack } from "../../components/GoBack/GoBack";
import { Tag } from "../../components/Tag/Tag";
import { TextArea } from "../../components/TextArea/TextArea";
import { TextInput } from "../../components/TextInput/TextInput";
import { Upvote } from "../../components/Upvote/Upvote";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "../../lib/feedback";
import styles from "./DesignSystemPreview.module.scss";

const COLORS = [
  { token: "purple", hex: "#AD1FEA" },
  { token: "purple-hover", hex: "#C75AF6" },
  { token: "blue", hex: "#4661E6" },
  { token: "blue-hover", hex: "#7C91F9" },
  { token: "navy", hex: "#3A4374" },
  { token: "navy-hover", hex: "#656EA3" },
  { token: "red", hex: "#D73737" },
  { token: "red-hover", hex: "#E98888" },
  { token: "navy-dark", hex: "#373F68" },
  { token: "slate", hex: "#647196" },
  { token: "white", hex: "#FFFFFF" },
  { token: "surface", hex: "#F7F8FD" },
  { token: "surface-alt", hex: "#F2F4FF" },
  { token: "surface-hover", hex: "#CFD7FF" },
  { token: "orange", hex: "#F49F85" },
  { token: "sky", hex: "#62BCFA" },
  { token: "icon-muted", hex: "#CDD2EE" },
];

const TYPE_STYLES = [
  { name: "h1", spec: "Bold, 24/35, -0.33px" },
  { name: "h2", spec: "Bold, 20/29, -0.25px" },
  { name: "h3", spec: "Bold, 18/26, -0.25px" },
  { name: "h4", spec: "Bold, 14/20, -0.2px" },
  { name: "body-1", spec: "Regular, 16/23" },
  { name: "body-2", spec: "Regular, 15/22" },
  { name: "body-3", spec: "Semibold, 13/19" },
  { name: "upvote", spec: "Bold, 13/19, -0.18px" },
  { name: "button", spec: "Bold, 14/20" },
  { name: "caption", spec: "Regular, 14/20" },
  { name: "caption-sm", spec: "Regular, 13/19" },
  { name: "title-sm", spec: "Bold, 13/19, -0.18px" },
  { name: "button-sm", spec: "Bold, 13/19" },
  { name: "count", spec: "Bold, 16/23, -0.22px" },
  { name: "brand-sm", spec: "Bold, 15/22, -0.19px" },
  { name: "subtitle", spec: "Medium, 15/22" },
  { name: "subtitle-sm", spec: "Medium, 13/19" },
];

const BUTTON_VARIANTS: ButtonVariant[] = ["purple", "blue", "navy", "red"];

function noop() {}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

interface StateProps {
  label: string;
  children: ReactNode;
}

function State({ label, children }: StateProps) {
  return (
    <div className={styles.state}>
      <div className={styles.stateContent}>{children}</div>
      <p className={styles.stateLabel}>{label}</p>
    </div>
  );
}

export function DesignSystemPreview() {
  const [upvoted, setUpvoted] = useState(false);
  const [tagActive, setTagActive] = useState(false);
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0].value);
  const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0].value);
  const [title, setTitle] = useState("");

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Design System</h1>

      <Section title="Colors">
        <div className={styles.swatches}>
          {COLORS.map(({ token, hex }) => (
            <div key={token}>
              <div className={`${styles.swatch} ${styles[`swatch-${token}`]}`} />
              <p className={styles.swatchName}>{token}</p>
              <p className={styles.swatchHex}>{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className={styles.typeList}>
          {TYPE_STYLES.map(({ name, spec }) => (
            <div key={name}>
              <p className={styles.stateLabel}>
                {name}: {spec}
              </p>
              <p className={styles[`type-${name}`]}>Sed egestas ante et vulputate volutpat</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className={styles.grid}>
          {BUTTON_VARIANTS.map((variant) => (
            <State key={variant} label={`${variant}: default`}>
              <Button variant={variant}>Button</Button>
            </State>
          ))}
          {BUTTON_VARIANTS.map((variant) => (
            <State key={variant} label={`${variant}: hover`}>
              <Button variant={variant} data-state="hover">
                Button
              </Button>
            </State>
          ))}
          <State label="Disabled">
            <Button disabled>Button</Button>
          </State>
          <State label="With a longer label">
            <Button>+ Add Feedback</Button>
          </State>
          <State label="Compact (smaller on mobile)">
            <Button compact>+ Add Feedback</Button>
          </State>
        </div>
      </Section>

      <Section title="Go Back">
        <div className={styles.grid}>
          <State label="Text: default">
            <GoBack href="/design-system" />
          </State>
          <State label="Text: hover">
            <GoBack href="/design-system" data-state="hover" />
          </State>
          <State label="Dark: default">
            <div className={styles.darkBar}>
              <GoBack href="/design-system" variant="dark" />
            </div>
          </State>
          <State label="Dark: hover">
            <div className={styles.darkBar}>
              <GoBack href="/design-system" variant="dark" data-state="hover" />
            </div>
          </State>
        </div>
      </Section>

      <Section title="Upvote">
        <div className={styles.grid}>
          <State label="Default">
            <Upvote count={99} title="Example" />
          </State>
          <State label="Hover">
            <Upvote count={99} title="Example" data-state="hover" />
          </State>
          <State label="Active">
            <Upvote count={100} title="Example" active />
          </State>
          <State label="Disabled">
            <Upvote count={99} title="Example" disabled />
          </State>
          <State label="Try it">
            <Upvote count={upvoted ? 100 : 99} title="Example" active={upvoted} onClick={() => setUpvoted(!upvoted)} />
          </State>
          <State label="Compact (horizontal on mobile)">
            <Upvote count={99} title="Example" compact />
          </State>
          <State label="Horizontal">
            <Upvote count={99} title="Example" horizontal />
          </State>
        </div>
      </Section>

      <Section title="Tags">
        <div className={styles.grid}>
          <State label="Default">
            <Tag onClick={noop}>UX</Tag>
          </State>
          <State label="Hover">
            <Tag onClick={noop} data-state="hover">
              UX
            </Tag>
          </State>
          <State label="Active">
            <Tag onClick={noop} active>
              UX
            </Tag>
          </State>
          <State label="Disabled">
            <Tag onClick={noop} disabled>
              UX
            </Tag>
          </State>
          <State label="Static label">
            <Tag>Enhancement</Tag>
          </State>
          <State label="Try it">
            <Tag active={tagActive} onClick={() => setTagActive(!tagActive)}>
              UX
            </Tag>
          </State>
        </div>
      </Section>

      <Section title="Sort dropdown">
        <div className={styles.grid}>
          <State label="Default (try it)">
            <div className={styles.sortBar}>
              <Dropdown variant="sort" options={SORT_OPTIONS} value={sort} onChange={setSort} />
            </div>
          </State>
          <State label="Hover">
            <div className={styles.sortBar}>
              <Dropdown variant="sort" options={SORT_OPTIONS} value={sort} onChange={noop} data-state="hover" />
            </div>
          </State>
          <div className={styles.openMenu}>
            <State label="Menu open">
              <div className={styles.sortBar}>
                <Dropdown variant="sort" options={SORT_OPTIONS} value={SORT_OPTIONS[0].value} onChange={noop} defaultOpen previewHoverIndex={1} />
              </div>
            </State>
          </div>
        </div>
      </Section>

      <Section title="Form fields">
        <div className={styles.fields}>
          <State label="Text field: default (try it)">
            <FormField label="Feedback Title" hint="Add a short, descriptive headline">
              {(control) => <TextInput {...control} value={title} onChange={(event) => setTitle(event.target.value)} />}
            </FormField>
          </State>
          <State label="Text field: active">
            <TextInput aria-label="Active example" defaultValue="Lorem ipsum dolor" data-state="active" />
          </State>
          <State label="Text field: error">
            <FormField label="Feedback Title" error="Can’t be empty">
              {(control) => <TextInput {...control} />}
            </FormField>
          </State>
          <State label="Text field: disabled">
            <TextInput aria-label="Disabled example" defaultValue="Lorem ipsum dolor" disabled />
          </State>
          <State label="Textarea: default">
            <FormField label="Feedback Detail" hint="Include any specific comments on what should be improved, added, etc.">
              {(control) => <TextArea {...control} />}
            </FormField>
          </State>
          <State label="Textarea: error">
            <FormField label="Feedback Detail" error="Can’t be empty">
              {(control) => <TextArea {...control} />}
            </FormField>
          </State>
          <State label="Select: default (try it)">
            <FormField label="Category" hint="Choose a category for your feedback">
              {(control) => <Dropdown {...control} options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />}
            </FormField>
          </State>
          <State label="Select: active">
            <Dropdown aria-label="Active example" options={CATEGORY_OPTIONS} value={CATEGORY_OPTIONS[0].value} onChange={noop} data-state="active" />
          </State>
          <div className={styles.openSelect}>
            <State label="Select: menu open">
              <Dropdown aria-label="Open example" options={CATEGORY_OPTIONS} value={CATEGORY_OPTIONS[0].value} onChange={noop} defaultOpen previewHoverIndex={1} />
            </State>
          </div>
        </div>
      </Section>

      <Section title="Card">
        <Card className={styles.cardExample}>White surface with a 10px corner radius. Pages add their own padding.</Card>
      </Section>
    </main>
  );
}
