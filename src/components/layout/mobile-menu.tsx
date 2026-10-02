"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { ActionLink } from "@/components/actions/action-link";
import type { ContentAction, NavigationItem } from "@/content/types";
import { cx, label } from "@/lib/ui";

type MobileMenuProps = {
  navigation: readonly NavigationItem[];
  action: ContentAction;
};

const roundControl =
  "grid size-11 place-items-center rounded-full border border-line bg-transparent";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribeToEnhancement = () => () => {};

export function MobileMenu({ navigation, action }: MobileMenuProps) {
  const isEnhanced = useSyncExternalStore(
    subscribeToEnhancement,
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const desktopBreakpoint = window.matchMedia("(min-width: 56.25rem)");

    function closeAtDesktop(
      mediaQuery: MediaQueryList | MediaQueryListEvent,
    ) {
      if (mediaQuery.matches) setIsOpen(false);
    }

    closeAtDesktop(desktopBreakpoint);
    desktopBreakpoint.addEventListener("change", closeAtDesktop);

    return () => {
      desktopBreakpoint.removeEventListener("change", closeAtDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    const focusableElements = dialog
      ? Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        )
      : [];

    document.body.style.overflow = "hidden";
    focusableElements[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <div
      className="hidden items-center max-nav:flex data-[enhanced=false]:max-nav:order-1 data-[enhanced=false]:max-nav:basis-full"
      data-enhanced={isEnhanced ? "true" : "false"}
    >
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open menu"
        className={roundControl}
        hidden={!isEnhanced}
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className="mx-auto grid w-5 gap-1.5">
          <span className="h-px bg-ink" />
          <span className="h-px bg-ink" />
        </span>
      </button>

      <nav
        aria-label="Mobile fallback"
        className="grid w-full gap-1 py-4"
        hidden={isEnhanced}
      >
        {navigation.map((item) => (
          <Link
            className="inline-flex min-h-11 items-center text-muted no-underline"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
        <ActionLink className="mt-2 justify-self-start" href={action.href} variant="capsule">
          {action.label}
        </ActionLink>
      </nav>

      {isEnhanced && isOpen ? (
        <div
          aria-label="Navigation"
          aria-modal="true"
          className="fixed inset-0 z-80 grid h-dvh max-h-dvh min-h-0 grid-rows-[auto_1fr_auto] overflow-y-auto overscroll-contain bg-paper p-6"
          id="mobile-navigation"
          ref={dialogRef}
          role="dialog"
        >
          <div className="flex items-center justify-between border-b border-line pb-6">
            <span className={cx(label, "text-xs text-muted")}>Navigation</span>
            <button
              aria-label="Close menu"
              className={roundControl}
              onClick={closeMenu}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="m5 5 14 14M19 5 5 19" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-col items-start justify-center gap-4 py-12"
          >
            {navigation.map((item) => (
              <Link
                className="inline-flex min-h-11 items-center font-display text-[clamp(2rem,11vw,3.5rem)] leading-none font-medium tracking-[-0.035em] no-underline hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ActionLink className="w-full" href={action.href} variant="capsule">
            {action.label}
          </ActionLink>
        </div>
      ) : null}
    </div>
  );
}
