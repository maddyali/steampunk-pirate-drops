import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      <header>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/drops">Drops</Link>
      </header>
      {children}
    </div>
  );
}
