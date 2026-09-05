"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { ContactAction } from "@/components/actions/contact-action";
import type { ContactState, NavigationItem } from "@/content/types";

type MobileMenuProps = {
  navigation: readonly NavigationItem[];
  contact: ContactState;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribeToEnhancement = () => () => {};

export function MobileMenu({ navigation, contact }: MobileMenuProps) {
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
    <div className="mobile-menu">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="mobile-menu__trigger"
        hidden={!isEnhanced}
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className="mobile-menu__trigger-lines">
          <span />
          <span />
        </span>
      </button>

      <nav
        aria-label="Mobile fallback"
        className="mobile-menu__fallback"
        hidden={isEnhanced}
      >
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <ContactAction
          className="mobile-menu__fallback-contact"
          contact={contact}
          label="Start a conversation"
        />
      </nav>

      {isEnhanced && isOpen ? (
        <div
          aria-label="Navigation"
          aria-modal="true"
          className="mobile-menu__dialog"
          id="mobile-navigation"
          ref={dialogRef}
          role="dialog"
        >
          <div className="mobile-menu__topline">
            <span className="mobile-menu__label">Navigation</span>
            <button
              aria-label="Close menu"
              className="mobile-menu__close"
              onClick={closeMenu}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m5 5 14 14M19 5 5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="mobile-menu__navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>

          <ContactAction
            className="mobile-menu__contact"
            contact={contact}
            label="Start a conversation"
          />
        </div>
      ) : null}
    </div>
  );
}
