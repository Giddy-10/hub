'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateSpecificJokePage(path: string) {
  // Ensure the path starts with a '/' for revalidatePath
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  revalidatePath(fullPath);
}