import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  const isCurrentLink = pathname === props.to

  return (
    <Link
      className={`
        flex h-10 items-center gap-2 rounded-[10px] px-4
        ${
          isCurrentLink
            ? 'action-sm pointer-events-none bg-[var(--shape)] text-[var(--orange-base)]'
            : 'body-sm text-[var(--gray-300)] hover:text-[var(--orange-dark)]'
        }
      `}
      {...props}
    />
  )
}
