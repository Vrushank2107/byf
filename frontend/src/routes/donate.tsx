import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, FileCheck, Sparkles, Loader2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IMG } from "@/lib/site-data";
import { api } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { breadcrumbJsonLd, createPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/donate")({
  head: () => {
    const seo = createPageSeo({
      title: "Donate to Baroda Youth Federation — Every rupee changes a life in Vadodara",
      description:
        "Donate to Baroda Youth Federation and support our mission in Vadodara. 80G tax-deductible.",
      path: "/donate",
      keywords: ["donate Baroda Youth Federation", "charity Vadodara", "80G donation Gujarat", "nonprofit donation India"],
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Donate", path: "/donate" },
      ]),
    });

    return {
      ...seo,
      scripts: [
        ...(seo.scripts ?? []),
        { src: "https://checkout.razorpay.com/v1/checkout.js", async: true },
      ],
    };
  },
  component: DonatePage,
});

const PRESETS = [500, 1000, 2500, 5000, 10000, 25000];
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function DonatePage() {
  const [amount, setAmount] = useState<number>(2500);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [settings, setSettings] = useState<{ donateHeroImage?: string } | null>(null);
  const [heroImage, setHeroImage] = useState(IMG.blanket);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pan: '',
    isAnonymous: false,
  });

  useEffect(() => {
    api.getSettings().then((data) => {
      setSettings(data);
      if (data.donateHeroImage) {
        setHeroImage(imageUrl(data.donateHeroImage));
      }
    }).catch((error) => {
      console.error('Failed to fetch site settings:', error);
    });
  }, []);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const orderData = await api.createDonationOrder({
        ...donorInfo,
        amount,
        fund: 'general',
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Baroda Youth Federation',
        description: 'Donation to Baroda Youth Federation',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyData = await api.verifyDonation({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              donationId: orderData.donationId,
            });
            setReceiptData(verifyData.donation);
            setShowReceipt(true);
            setShowDonorForm(false);
            setDonorInfo({
              name: '',
              email: '',
              phone: '',
              address: '',
              pan: '',
              isAnonymous: false,
            });
          } catch {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: donorInfo.name,
          email: donorInfo.email,
          contact: donorInfo.phone,
        },
        theme: {
          color: '#E11D48',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function (response: any) {
        alert('Payment failed. Please try again.');
      });
    } catch (error) {
      console.error('Donation error:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title={<>₹500 feeds a family for a week. <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Your turn.</span></>}
        description="100% of donations go directly to programs. Operations are funded separately."
        image={heroImage}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeader eyebrow="Make a donation" title={<>Support our <span className="gradient-text">mission.</span></>} />
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10">
              <div className="mt-8">
                <label className="text-sm font-semibold text-foreground">Choose an amount</label>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(p)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                        amount === p
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary"
                      }`}
                    >
                      {fmt(p)}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center rounded-xl border border-border bg-background pl-4 pr-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="font-display text-base font-semibold text-muted-foreground">₹</span>
                  <input
                    type="number"
                    min={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value || 0))}
                    className="w-full bg-transparent px-3 py-3 text-base font-semibold text-foreground outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowDonorForm(true)}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-warm py-4 font-display font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5"
              >
                <Heart className="h-5 w-5 fill-current" />
                Donate {fmt(amount)}
              </button>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> Secure</div>
                <div className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-accent" /> Receipt on request</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> 100% to program</div>
              </div>
            </div>

            <div className="space-y-5">
              <article className="rounded-3xl border border-border bg-primary p-7 text-primary-foreground shadow-soft">
                <h4 className="font-display text-xl font-bold">What your money becomes</h4>
                <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹500</span> — 1 month of meals for a child</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹1,000</span> — School kit for 5 students</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹2,500</span> — Sanitary pads for 25 girls / year</li>
                  <li className="flex items-start gap-3"><span className="font-display font-bold text-secondary">₹10,000</span> — Full notebook kit for a school</li>
                </ul>
              </article>

              <article className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Donor story</p>
                <blockquote className="mt-3 font-display text-base leading-relaxed text-foreground">
                  "I started with ₹500 a month. Three years later, the school they built with our funds is my proudest investment."
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">— Arjun Mehta, Monthly donor since 2022</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Form Modal */}
      {showDonorForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-4 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex max-h-[calc(100svh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft sm:rounded-3xl"
          >
            <div className="shrink-0 border-b border-border px-5 py-5 sm:px-8 sm:py-6">
              <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">Donor Information</h3>
              <p className="mt-1 text-sm text-muted-foreground sm:mt-2">We’ll use these details to process your donation</p>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
              <div>
                <label className="text-sm font-semibold text-foreground">Full Name *</label>
                <input
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">Email *</label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">Phone *</label>
                <input
                  type="tel"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">Address *</label>
                <textarea
                  value={donorInfo.address}
                  onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                  rows={3}
                  placeholder="Your full address"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">PAN Number</label>
                <input
                  type="text"
                  value={donorInfo.pan}
                  onChange={(e) => setDonorInfo({ ...donorInfo, pan: e.target.value.toUpperCase() })}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={donorInfo.isAnonymous}
                  onChange={(e) => setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })}
                  className="h-5 w-5 rounded border-border"
                />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Make this donation anonymous
                </label>
              </div>
            </div>

            <div className="shrink-0 border-t border-border bg-card px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  onClick={() => setShowDonorForm(false)}
                  className="flex-1 rounded-full border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonate}
                  disabled={loading || !donorInfo.name || !donorInfo.email || !donorInfo.phone || !donorInfo.address}
                  className="flex-1 rounded-full gradient-warm px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${fmt(amount)}`
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Heart className="h-8 w-8 fill-green-600 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Thank You!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Your donation has been received successfully</p>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt Number</span>
                  <span className="font-semibold text-foreground">{receiptData.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-foreground">{fmt(receiptData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(receiptData.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-primary/10 p-4 text-center">
              <p className="text-xs font-semibold text-primary">Donation Receipt</p>
              <p className="mt-1 text-xs text-muted-foreground">A confirmation receipt will be shared with you after the transaction.</p>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="mt-6 w-full rounded-full gradient-warm px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
