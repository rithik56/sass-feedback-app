"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "../../lib/feedback";
import type { ProductRequest } from "../../lib/types";
import { Button, LinkButton } from "../Button/Button";
import { Card } from "../Card/Card";
import { Dropdown } from "../Dropdown/Dropdown";
import { FormField } from "../FormField/FormField";
import { GoBack } from "../GoBack/GoBack";
import { TextArea } from "../TextArea/TextArea";
import { TextInput } from "../TextInput/TextInput";
import styles from "./FeedbackForm.module.scss";

const EMPTY_ERROR = "Can’t be empty";

export interface FeedbackFormProps {
  // The feedback to edit. Leave it out to create new feedback.
  request?: ProductRequest;
}

export function FeedbackForm({ request }: FeedbackFormProps) {
  const [title, setTitle] = useState(request?.title ?? "");
  const [category, setCategory] = useState<string>(request?.category ?? CATEGORY_OPTIONS[0].value);
  const [status, setStatus] = useState<string>(request?.status ?? STATUS_OPTIONS[0].value);
  const [description, setDescription] = useState(request?.description ?? "");
  const [showErrors, setShowErrors] = useState(false);

  const titleError = showErrors && !title.trim() ? EMPTY_ERROR : undefined;
  const descriptionError = showErrors && !description.trim() ? EMPTY_ERROR : undefined;
  const backHref = request ? `/feedback/${request.id}` : "/";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);
  }

  return (
    <main className={styles.page}>
      <GoBack href={backHref} />

      <Card className={styles.card}>
        <Image
          className={styles.icon}
          src={request ? "/assets/shared/icon-edit-feedback.svg" : "/assets/shared/icon-new-feedback.svg"}
          alt=""
          width={56}
          height={56}
        />
        <h1 className={`${styles.title} ${request ? styles.editTitle : ""}`}>
          {request ? `Editing ‘${request.title}’` : "Create New Feedback"}
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <FormField label="Feedback Title" hint="Add a short, descriptive headline" error={titleError}>
              {(control) => <TextInput {...control} value={title} onChange={(event) => setTitle(event.target.value)} />}
            </FormField>

            <FormField label="Category" hint="Choose a category for your feedback">
              {(control) => <Dropdown {...control} options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />}
            </FormField>

            {request && (
              <FormField label="Update Status" hint="Change feature state">
                {(control) => <Dropdown {...control} options={STATUS_OPTIONS} value={status} onChange={setStatus} />}
              </FormField>
            )}

            <FormField
              label="Feedback Detail"
              hint="Include any specific comments on what should be improved, added, etc."
              error={descriptionError}
            >
              {(control) => (
                <TextArea {...control} value={description} onChange={(event) => setDescription(event.target.value)} />
              )}
            </FormField>
          </div>

          <div className={`${styles.actions} ${descriptionError ? styles.actionsAfterError : ""}`}>
            <Button type="submit" compact className={`${styles.action} ${styles.submit}`}>
              {request ? "Save Changes" : "Add Feedback"}
            </Button>
            <LinkButton href={backHref} variant="navy" compact className={styles.action}>
              Cancel
            </LinkButton>
            {request && (
              <Button variant="red" compact className={`${styles.action} ${styles.delete}`}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </Card>
    </main>
  );
}
