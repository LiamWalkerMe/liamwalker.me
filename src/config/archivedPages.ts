export const archivedPageRegistry = [
  {
    label: 'ZORA 2024',
    to: '/zora2024',
    archived: true,
  },
] as const

export function getArchivedPages() {
  return archivedPageRegistry.filter((page) => page.archived)
}

export function isArchivedPath(pathname: string) {
  return getArchivedPages().some((page) => pathname === page.to || pathname.startsWith(`${page.to}/`))
}
