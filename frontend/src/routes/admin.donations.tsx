import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/admin/donations")({
  component: AdminDonations,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data = await api.getDonations();
      setDonations(data);
    } catch (error) {
      console.error('Failed to load donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Refunded':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Donations</h1>
          <p className="text-muted-foreground">Manage donation records</p>
        </div>

        {selectedDonation && (
          <DonationDetail
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
          />
        )}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Fund
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-16" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
                      </tr>
                    ))}
                  </>
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No donations found
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">
                            {donation.isAnonymous ? 'Anonymous' : donation.name}
                          </div>
                          {!donation.isAnonymous && (
                            <div className="text-sm text-muted-foreground">{donation.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ₹{donation.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {donation.fund}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedDonation(donation)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          aria-label="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function DonationDetail({ donation, onClose }: { donation: any; onClose: () => void }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Donation Details</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Donor Name</label>
            <p className="font-medium">{donation.isAnonymous ? 'Anonymous' : donation.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <p className="font-medium">{donation.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
            <p className="font-medium">{donation.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
            <p className="font-medium">{donation.address}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Amount</label>
            <p className="font-medium text-2xl">₹{donation.amount.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Fund</label>
            <p className="font-medium">{donation.fund}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
            <p className="font-medium">{donation.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">PAN Number</label>
            <p className="font-medium">{donation.pan || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <label className="block text-muted-foreground mb-1">Receipt Number</label>
            <p className="font-medium">{donation.receiptNumber || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Razorpay Order ID</label>
            <p className="font-medium font-mono text-xs">{donation.razorpayOrderId || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Razorpay Payment ID</label>
            <p className="font-medium font-mono text-xs">{donation.razorpayPaymentId || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Date</label>
            <p className="font-medium">{new Date(donation.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
