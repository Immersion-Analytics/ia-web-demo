import Link from "next/link"

interface IALinkProps {
  children: React.ReactNode
  path: string
  className?: string
}
export function IALink(p: IALinkProps) {
    return (
        <Link className={p.className + " text-slate-400"} href={"https://immersionanalytics.com" + p.path} target="_blank">{p.children}</Link>
    )
}