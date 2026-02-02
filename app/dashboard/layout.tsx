export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0B0F14", color: "#F5F7FA" }}>
      {children}
    </div>
  );
}
