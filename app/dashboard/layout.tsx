import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0B0F14", color: "#F5F7FA" }}>
      <DashboardNav />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 18 }}>{children}</div>
    </div>
  );
}
