/**
 * Turns arbitrary text into a URL-friendly slug.
 */

export function slugify (_input: string): string {
	return _input.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
