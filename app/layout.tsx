import "./globals.css";
import Link from "next/link";
export const metadata={title:"StudySpark",description:"AI-studeren vanuit je eigen leerstof."};
export default function Layout({children}:{children:React.ReactNode}){return <><header className="top"><div className="container row"><Link href="/" className="brand">Study<b>Spark</b></Link><nav className="nav"><Link href="/demo">Demo</Link><Link href="/dashboard">Dashboard</Link><Link href="/upload" className="btn primary">Nieuw materiaal</Link></nav></div></header>{children}</>}
