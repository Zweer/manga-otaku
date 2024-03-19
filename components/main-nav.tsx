"use client"

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuConfig } from "@/config/menu";
import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src="/favicon-32x32.png" alt={siteConfig.name} className="h-6 w-6" width={24} height={24} />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        {menuConfig.map((menuItem) => (
          <Link
            key={menuItem.href}
            href={menuItem.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === menuItem.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
