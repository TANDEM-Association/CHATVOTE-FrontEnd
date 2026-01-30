// SPDX-FileCopyrightText: 2025 2025 wahl.chat
//
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0

export const locales = ['fr', 'de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';
