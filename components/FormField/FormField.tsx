"use client";

import { useId, type ReactNode } from "react";
import styles from "./FormField.module.scss";

export interface FormFieldControlProps {
  id: string;
  "aria-labelledby": string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
}

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: (control: FormFieldControlProps) => ReactNode;
}

export function FormField({ label, hint, error, children }: FormFieldProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ");

  return (
    <div className={styles.field}>
      <label id={labelId} htmlFor={id} className={styles.label}>
        {label}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <div className={styles.control}>
        {children({
          id,
          "aria-labelledby": labelId,
          "aria-describedby": describedBy || undefined,
          "aria-invalid": error ? true : undefined,
        })}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
