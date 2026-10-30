"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Dropdown.module.scss";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "select" | "sort";
  id?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "data-state"?: "hover" | "active";
}

export function Dropdown({
  options,
  value,
  onChange,
  variant = "select",
  id,
  disabled,
  defaultOpen = false,
  ...triggerAttributes
}: DropdownProps) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const moveFocusToList = useRef(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedLabel = options[selectedIndex]?.label ?? "";

  useEffect(() => {
    if (isOpen && moveFocusToList.current) {
      listRef.current?.focus();
    }
    moveFocusToList.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isOpen]);

  function open(startIndex: number) {
    moveFocusToList.current = true;
    setActiveIndex(startIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function select(index: number) {
    onChange(options[index].value);
    close();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      open(Math.max(selectedIndex, 0));
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => (index <= 0 ? options.length - 1 : index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex >= 0) {
          select(activeIndex);
        }
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={styles.dropdown}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={styles[variant]}
        onClick={() => (isOpen ? setIsOpen(false) : open(-1))}
        onKeyDown={handleTriggerKeyDown}
        {...triggerAttributes}
      >
        {variant === "sort" ? (
          <span>
            Sort by : <strong className={styles.sortValue}>{selectedLabel}</strong>
          </span>
        ) : (
          selectedLabel
        )}
        <Icon name={isOpen ? "arrow-up" : "arrow-down"} />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={activeIndex >= 0 ? `${uid}-${activeIndex}` : undefined}
          className={`${styles.menu} ${variant === "sort" ? styles.sortMenu : ""}`}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${uid}-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${index === activeIndex ? styles.activeOption : ""}`}
              onClick={() => select(index)}
            >
              {option.label}
              {option.value === value && <Icon name="check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
