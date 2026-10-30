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
  // Only for /design-system: shows an option's hover style without a pointer.
  previewHoverIndex?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "data-state"?: "hover" | "active";
}

type Highlight = "none" | "pointer" | "keyboard";

export function Dropdown({
  options,
  value,
  onChange,
  variant = "select",
  id,
  disabled,
  defaultOpen = false,
  previewHoverIndex,
  "aria-label": ariaLabel = variant === "sort" ? "Sort by" : undefined,
  "aria-labelledby": ariaLabelledBy,
  ...triggerAttributes
}: DropdownProps) {
  const uid = useId();
  const listId = `${uid}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedLabel = options[selectedIndex]?.label ?? "";

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));
  const [highlight, setHighlight] = useState<Highlight>("none");

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

  function open(nextHighlight: Highlight) {
    setActiveIndex(Math.max(selectedIndex, 0));
    setHighlight(nextHighlight);
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

  function moveActiveOption(index: number) {
    setActiveIndex(index);
    setHighlight("keyboard");
  }

  // Focus stays on the trigger, so it handles the keys whether the menu is open or closed.
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        open("keyboard");
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActiveOption((activeIndex + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActiveOption(activeIndex === 0 ? options.length - 1 : activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        moveActiveOption(0);
        break;
      case "End":
        event.preventDefault();
        moveActiveOption(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(activeIndex);
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
        role="combobox"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen ? `${uid}-${activeIndex}` : undefined}
        className={styles[variant]}
        onClick={() => (isOpen ? setIsOpen(false) : open("none"))}
        onKeyDown={handleKeyDown}
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
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={`${styles.menu} ${variant === "sort" ? styles.sortMenu : ""} ${
            highlight === "keyboard" ? styles.keyboardNavigation : ""
          }`}
          onMouseDown={(event) => event.preventDefault()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${uid}-${index}`}
              role="option"
              aria-selected={option.value === value}
              data-state={index === previewHoverIndex ? "hover" : undefined}
              className={`${styles.option} ${highlight !== "none" && index === activeIndex ? styles.activeOption : ""}`}
              onClick={() => select(index)}
              onMouseMove={() => {
                setActiveIndex(index);
                setHighlight("pointer");
              }}
            >
              {option.label}
              {option.value === value && (
                <span className={styles.check}>
                  <Icon name="check" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
