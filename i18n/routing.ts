// SPDX-FileCopyrightText: 2025 2025 wahl.chat
//
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
