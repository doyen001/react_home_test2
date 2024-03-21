"use client";
import React, { useRef, RefObject, KeyboardEvent, FormEvent } from "react";
import styles from "./searchbar.module.css";
import SearchBarIcon from "./SearchBarIcon";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface SearchBarProps {
  className?: string;
  style?: React.CSSProperties;
  placeholderText?: string;
  initialText?: string;
  handleSubmit?: Function;
  shouldReanchor: boolean;
  setSearchState?: (text: string) => void;
}

export default function SearchBar({
  className,
  style,
  placeholderText,
  initialText,
  handleSubmit,
  shouldReanchor,
  setSearchState,
}: SearchBarProps) {
  const textareaRef: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);
  const wrapperRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleTextAreaChange = () => {
    const textarea: HTMLTextAreaElement | null = textareaRef.current;
    const wrapper: HTMLDivElement | null = wrapperRef.current;
    if (!textarea || !wrapper) return;

    const currentHeight: number = textarea.clientHeight;
    textarea.style.minHeight = "auto";
    textarea.style.minHeight = `${textarea.scrollHeight}px`;
    const diff: number = textarea.clientHeight - currentHeight;
    // This could also be negative when text is deleted.
    if (diff != 0 && shouldReanchor) {
      const computedStyle = window.getComputedStyle(wrapper);
      let margin: number | null = parseInt(computedStyle.marginTop);
      if (isNaN(margin)) margin = 0;
      wrapper.style.marginTop = `${margin + diff}px`;
    }

    const text: string = textarea.value.trim();
    if (setSearchState) {
      setSearchState(text);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!textareaRef.current) return;
    const currentQuestion = textareaRef.current.value;
    if (currentQuestion === "") return;
    handleSubmit && handleSubmit(currentQuestion);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const textarea: HTMLTextAreaElement | null = textareaRef.current;
    if (!textarea) return;
    const text: string = textarea.value.trim();
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
    }
    if (event.key === "Enter" && event.shiftKey === false && text !== "") {
      if (handleSubmit === undefined || handleSubmit === null) return;
      handleFormSubmit(
        new Event("submit", {
          bubbles: true,
          cancelable: true,
        }) as unknown as React.FormEvent<HTMLFormElement>
      );
    }
  };

  //
  return (
    <div
      className={`${styles.searchbar} ${className}`}
      style={style}
      ref={wrapperRef}
    >
      <form onSubmit={handleFormSubmit}>
        <div>
          <textarea
            ref={textareaRef}
            rows={2}
            placeholder={placeholderText}
            onInput={handleTextAreaChange}
            onKeyDown={handleKeyPress}
            className={`${styles.searchTextArea} ${inter.className} `}
            defaultValue={initialText}
          />
          <button type="submit" style={{ alignSelf: "flex-end" }}>
            <SearchBarIcon
              style={{
                fontSize: "42px",
                padding: "6px",
              }}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
