"use client";
import React, { useState } from "react";

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
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="space-y-6 rounded-[30px] border border-[#9f0712]/15 bg-white/85 p-6 text-slate-900 shadow-[0_20px_60px_rgba(159,7,18,0.08)] backdrop-blur sm:p-8">
              <div className="inline-flex items-center rounded-full border border-[#9f0712]/15 bg-[#9f0712] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Tech Trailblazer Academy
              </div>

              <div className="space-y-5">
                <div className="inline-flex bg-gradient-to-r from-[#9f0712] to-[#7f000a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-[#9f0712]/20">
                  Payment & Proof Submission
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-black uppercase tracking-tight text-[#9f0712] sm:text-5xl lg:text-6xl">
                    Payment <span className="text-slate-950">& Proof</span>
                  </h1>
                  <div className="inline-flex border-2 border-slate-900 bg-gradient-to-r from-white to-slate-50 px-5 py-2 text-lg font-black uppercase tracking-wide text-slate-950 shadow-sm">
                    Minimal Form
                  </div>
                </div>
                <div className="space-y-4 rounded-[20px] bg-gradient-to-r from-[#9f0712]/5 to-[#7f000a]/5 p-4 border border-[#9f0712]/10">
                  <div className="space-y-3 text-sm leading-6 text-slate-700">
                    <p className="font-semibold text-[#9f0712]">🎓 Scholarship Information:</p>
                    <p>Applicants will receive up to 95% tuition (N 447,000) scholarships off their tuition fees</p>
                    <p>Learn beginner-friendly tech and digital skills, go from zero to job-ready, get internships/jobs placement support and join a community that supports your growth</p>
                    <p className="font-bold text-[#9f0712]">Pay the sum of: N50,000 to enroll in your tech journey</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[#9f0712]/10">
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                      Select course you're securing its spot *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                      className={`${inputClassName} ${
                        courseValidationError
                          ? 'border-4 border-blue-600 ring-4 ring-blue-600/30'
                          : ''
                      } ${
                        courseBlinking
                          ? 'animate-pulse border-blue-600'
                          : ''
                      }`}
                    >
                      <option value="">Choose a course...</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Computer Networking">Computer Networking</option>
                      <option value="Ethical Hacking">Ethical Hacking</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Full Stack Development">Full Stack Development</option>
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend Development">Backend Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                    </select>
                  </div>
                </div>
              </div>

                          </div>

            <div className="rounded-[30px] border border-[#9f0712]/10 bg-white p-5 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#9f0712]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9f0712]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#9f0712]"></div>
                    Payment Upload
                  </div>
                                  </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="h-1 w-1 rounded-full bg-[#9f0712]"></div>
                  All fields are required
                </div>
              </div>

              <div className="mb-8 rounded-[24px] bg-gradient-to-r from-[#9f0712]/5 to-[#7f000a]/5 border border-[#9f0712]/15 p-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#9f0712]/10 px-4 py-2 text-sm font-medium text-[#9f0712]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Need to make payment first?
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Click here to pay</h3>
                  <a 
                    href="DGAHHGAHGDADGHAGDH2321GHHQEGQDEGHAGHDADGHA"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handlePaymentClick}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg ${
                      formData.course 
                        ? 'bg-green-500 hover:bg-green-600 hover:shadow-green-500/25' 
                        : 'bg-black hover:bg-gray-800 hover:shadow-black/25'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Tap to Pay
                  </a>
                  <p className="text-xs text-slate-500">After payment, submit your proof below</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <section className="space-y-6">
                  
                  <div className="grid gap-5">
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
                  </div>
                </section>

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
    </div>
  );
}
