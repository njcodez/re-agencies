// lib/utils.ts

/**
 * Conditionally join class names together.
 * 
 * @param classes - A variable number of class names and/or conditional expressions
 * @returns A string of class names separated by spaces
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
  }
  