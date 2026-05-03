"use client";
import React, { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

interface PaymentFormData {
  name: string;
  email: string;
  amount: string;
  course: string;
  proofImage: File | null;
}

type SubmissionState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const inputClassName =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#9f0712] focus:ring-4 focus:ring-[#9f0712]/10";

export function PaymentUploadForm() {
  const [formData, setFormData] = useState<PaymentFormData>({
    name: "",
    email: "",
    amount: "",
    course: "",
    proofImage: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [courseValidationError, setCourseValidationError] = useState(false);
  const [courseBlinking, setCourseBlinking] = useState(false);
  const [copiedAccountNumber, setCopiedAccountNumber] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText("6729652572");
      setCopiedAccountNumber(true);
      setShowToast(true);
      setTimeout(() => {
        setCopiedAccountNumber(false);
        setShowToast(false);
      }, 2000);
    } catch {
      console.error("Failed to copy account number");
    }
  };

  const handlePaymentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!formData.course) {
      e.preventDefault();
      setCourseValidationError(true);
      setCourseBlinking(true);
      setSubmissionState({
        type: "error",
        message: "You need to select a course of interest first",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setCourseValidationError(false);
        setCourseBlinking(false);
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "amount") {
      value = value.replace(/\D/g, "");
    }

    if (name === "course") {
      setCourseValidationError(false);
      setCourseBlinking(false);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      proofImage: file
    }));
  };

  const isFormValid = formData.name && formData.email && formData.amount && formData.proofImage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (!formData.proofImage) {
      setSubmissionState({
        type: "error",
        message: "Please upload your proof of payment before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionState(null);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('course', formData.course);
      formDataToSubmit.append('amount', formData.amount);
      formDataToSubmit.append('paymentType', 'proof_submission');
      formDataToSubmit.append('proofImage', formData.proofImage);

      const response = await fetch('/api/payment-receipts', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setSubmissionState({
          type: "success",
          message:
            "Payment proof submitted successfully. Our team will review it in the payment checker.",
        });
        setFormData({
          name: "",
          email: "",
          amount: "",
          course: "",
          proofImage: null,
        });
        setFileInputKey((prev) => prev + 1);
      } else {
        setSubmissionState({
          type: "error",
          message: result?.error || "Failed to submit payment proof. Please try again.",
        });
      }
    } catch {
      setSubmissionState({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f0f0] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.12)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(159,7,18,0.12),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(0,0,0,0.08),_transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-10 lg:px-8 lg:py-14">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl space-y-6 rounded-[24px] sm:rounded-[30px] border border-[#9f0712]/15 bg-white/85 p-4 text-slate-900 shadow-[0_20px_60px_rgba(159,7,18,0.08)] backdrop-blur sm:p-8">
              <div className="inline-flex items-center rounded-full border border-[#9f0712]/15 bg-[#9f0712] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Tech Trailblazer Academy
              </div>

              <div className="space-y-5">
                <div className="inline-flex bg-gradient-to-r from-[#9f0712] to-[#7f000a] px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-[#9f0712]/20">
                  Payment & Proof Submission
                </div>
                <div className="space-y-3">
                  <h1 className="text-2xl font-black uppercase tracking-tight text-[#9f0712] sm:text-4xl md:text-5xl lg:text-6xl">
                    Payment <span className="text-slate-950">& Proof</span>
                  </h1>
                  <div className="inline-flex border-2 border-slate-900 bg-gradient-to-r from-white to-slate-50 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-slate-950 shadow-sm sm:px-5 sm:py-2 sm:text-lg">
                    Minimal Form
                  </div>
                </div>
                <div className="space-y-4 rounded-[20px] bg-gradient-to-r from-[#9f0712]/5 to-[#7f000a]/5 p-3 sm:p-4 border border-[#9f0712]/10">
                  <div className="space-y-5 rounded-[20px] bg-white p-4 sm:p-6 border border-[#9f0712]/20 shadow-sm">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#9f0712] to-[#7f000a] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">Payment Details</h3>
                        <p className="text-xs text-slate-500">Transfer to this account</p>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border-2 border-slate-100">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bank</span>
                          <span className="px-2 py-1 bg-[#9f0712]/10 text-[#9f0712] text-xs font-semibold rounded-full">MFB</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-slate-800">MONIEPOINT MFB</p>
                      </div>

                      <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border-2 border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 sm:mb-2">Account Name</span>
                        <p className="text-sm sm:text-base font-semibold text-slate-800">Precious Chibueze Amah</p>
                      </div>

                      <div className="bg-gradient-to-r from-[#9f0712]/5 to-[#7f000a]/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 border-2 border-[#9f0712]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#9f0712]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#9f0712]/60 uppercase tracking-wider">Account Number</span>
                            <button
                              onClick={handleCopyAccountNumber}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                copiedAccountNumber
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-[#9f0712]/10 text-[#9f0712] hover:bg-[#9f0712]/20"
                              }`}
                            >
                              {copiedAccountNumber ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xl sm:text-2xl font-black text-[#9f0712] tracking-wider">6729652572</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4 sm:mb-5">
                        <div className="w-1 h-5 bg-gradient-to-b from-[#9f0712] to-[#7f000a] rounded-full flex-shrink-0" />
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">How to Complete Your Payment</h4>
                      </div>

                      <div className="relative space-y-0">
                        {/* Timeline line */}
                        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-slate-200 via-[#9f0712]/20 to-slate-200" />

                        {/* Step 1 */}
                        <div className="relative flex gap-3 sm:gap-4 pb-4 sm:pb-6">
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#9f0712] to-[#7f000a] flex items-center justify-center shadow-lg shadow-[#9f0712]/20">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4 4" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 pt-0.5 sm:pt-1">
                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
                              <p className="text-sm font-semibold text-slate-800 mb-1">Make the Transfer</p>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Transfer <span className="font-bold text-[#9f0712]">N50,000</span> to the Moniepoint account shown above
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex gap-3 sm:gap-4 pb-4 sm:pb-6">
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#9f0712]/20 flex items-center justify-center">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#9f0712]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 pt-0.5 sm:pt-1">
                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
                              <p className="text-sm font-semibold text-slate-800 mb-1">Save Your Receipt</p>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Capture and save your payment receipt or screenshot</p>
                            </div>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex gap-3 sm:gap-4">
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#9f0712]/20 flex items-center justify-center">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#9f0712]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 pt-0.5 sm:pt-1">
                            <div className="bg-gradient-to-r from-[#9f0712]/5 to-[#7f000a]/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#9f0712]/10">
                              <p className="text-sm font-semibold text-slate-800 mb-1">Submit Your Proof</p>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Complete the form below and upload your payment proof</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your registered email"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Amount Paid *
                      </label>
                      <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        className={inputClassName}
                        placeholder="Enter amount paid (numbers only)"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Proof of Payment *
                      </label>
                      <div className="rounded-[24px] border border-dashed border-stone-300 bg-[#faf6f6] p-4">
                        <input
                          key={fileInputKey}
                          type="file"
                          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                          onChange={handleFileChange}
                          required
                          className="w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-[#9f0712] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-[#7f000a]"
                        />
                        <p className="mt-3 text-xs text-slate-500">
                          Upload images (JPG, PNG, etc.), PDF, or document files (Word, Excel, PowerPoint).
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-semibold text-white transition-all ${
                        isFormValid
                          ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25'
                          : 'bg-gray-300 cursor-not-allowed opacity-60'
                      } ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      {isSubmitting ? "Submitting receipt..." : "Submit Payment Proof"}
                    </button>
                  </form>
                </div>
              </div>
                          </div>
          </div>
        </div>
      </div>
      {submissionState ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/45"
            onClick={() => setSubmissionState(null)}
          />
          <div
            aria-live="polite"
            className={`relative w-full max-w-md rounded-3xl border p-6 text-center shadow-2xl sm:p-7 ${
              submissionState.type === "success"
                ? "border-emerald-200 bg-white text-emerald-900"
                : "border-rose-200 bg-white text-rose-800"
            }`}
          >
            <p className="text-base font-semibold leading-7">{submissionState.message}</p>
            <button
              type="button"
              onClick={() => setSubmissionState(null)}
              className="mt-5 inline-flex rounded-xl bg-[#9f0712] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7f000a]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      {/* Toast Notification for Copied Account Number */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[130] transition-all duration-300 ease-out ${
          showToast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl shadow-emerald-600/30">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Account number copied!</span>
        </div>
      </div>
    </div>
  );
}
