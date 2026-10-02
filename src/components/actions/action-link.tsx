import Link from "next/link";
import type { ReactNode } from "react";

import { EditorialArrow } from "@/components/editorial/editorial-arrow";
import { cx, label } from "@/lib/ui";

export type ActionVariant = "primary" | "secondary" | "capsule";
export type ActionSurface = "light" | "dark";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-4 no-underline transition-colors duration-160 ease-out motion-reduce:transition-none";

const variants: Record<ActionVariant, Record<ActionSurface, string>> = {
  primary: {
    light:
      "rounded-action bg-accent px-4 py-3 text-sm font-semibold leading-tight text-accent-ink hover:bg-ink hover:text-paper-bright focus-visible:bg-ink focus-visible:text-paper-bright",
    dark: "rounded-full bg-accent px-5 py-3 text-sm font-semibold leading-tight text-accent-ink hover:bg-paper-bright hover:text-ink focus-visible:bg-paper-bright focus-visible:text-ink",
  },
  secondary: {
    light:
      "rounded-action border border-line px-4 py-3 text-sm font-semibold leading-tight text-ink hover:border-ink focus-visible:border-ink",
    dark: "rounded-full border border-line-dark px-5 py-3 text-sm font-semibold leading-tight text-paper-bright hover:border-paper-bright focus-visible:border-paper-bright",
  },
  capsule: {
    light: cx(
      label,
      "rounded-full border border-ink bg-ink py-2 ps-4 pe-3 tracking-wider text-paper-bright hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-ink active:border-ink active:bg-ink active:text-paper",
    ),
    dark: cx(
      label,
      "rounded-full border border-paper-bright bg-paper-bright py-2 ps-4 pe-3 tracking-wider text-ink hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-ink",
    ),
  },
};

export function actionClasses(
  variant: ActionVariant,
  surface: ActionSurface = "light",
) {
  return cx(base, variants[variant][surface]);
}

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  surface?: ActionSurface;
  arrow?: boolean;
  className?: string;
};

/** Internal routes use client navigation; mailto and external URLs do not. */
export function ActionLink({
  href,
  children,
  variant = "primary",
  surface = "light",
  arrow = true,
  className,
}: ActionLinkProps) {
  const classes = cx(actionClasses(variant, surface), className);
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <EditorialArrow size={variant === "capsule" ? "sm" : "md"} />
      ) : null}
    </>
  );

  return href.startsWith("/") ? (
    <Link className={classes} href={href}>
      {content}
    </Link>
  ) : (
    <a className={classes} href={href}>
      {content}
    </a>
  );
}
