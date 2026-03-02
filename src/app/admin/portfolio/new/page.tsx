import AdminSidebar from "../../components/AdminSidebar";
import PortfolioForm from "../PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">Tambah Portofolio Baru</h1>
          <p className="text-sm text-black/40 mt-1">
            Isi semua field yang diperlukan lalu klik Simpan
          </p>
        </div>
        <PortfolioForm mode="create" />
      </main>
    </div>
  );
}
