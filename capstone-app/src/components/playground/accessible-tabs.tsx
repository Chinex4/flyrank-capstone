"use client";

import { KeyboardEvent, useRef, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: string;
};

const tabs: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    content:
      "This tab explains the purpose of the playground and how reusable interaction patterns can support StudyFlow.",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    content:
      "The tabs use semantic roles, linked ids, aria-selected, and keyboard navigation for predictable assistive technology support.",
  },
  {
    id: "testing",
    label: "Testing",
    content:
      "Use keyboard-only testing to verify Tab, ArrowLeft, ArrowRight, Home, End, and click activation behavior.",
  },
];

export function AccessibleTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectAndFocusTab = (index: number) => {
    setSelectedIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = tabs.length - 1;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocusTab(selectedIndex === 0 ? lastIndex : selectedIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocusTab(selectedIndex === lastIndex ? 0 : selectedIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectAndFocusTab(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectAndFocusTab(lastIndex);
    }
  };

  return (
    <div className="grid gap-4">
      <div
        role="tablist"
        aria-label="Playground component notes"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const isSelected = selectedIndex === index;
          const tabId = `playground-tab-${tab.id}`;
          const panelId = `playground-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className="tab-button"
              onClick={() => setSelectedIndex(index)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const isSelected = selectedIndex === index;
        const tabId = `playground-tab-${tab.id}`;
        const panelId = `playground-panel-${tab.id}`;

        return (
          <section
            key={tab.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className="tab-panel"
            hidden={!isSelected}
            tabIndex={0}
          >
            <h3 className="text-xl font-semibold">{tab.label}</h3>
            <p className="mt-2 text-secondary-text">{tab.content}</p>
          </section>
        );
      })}
    </div>
  );
}
