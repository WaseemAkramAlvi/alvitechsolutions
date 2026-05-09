import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Upload, X } from 'lucide-react';

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
};

const serviceOptions = [
  'Website Design',
  'Logo Design',
  'Social Media Design',
  'Branding',
  'UI/UX Design',
  'SEO',
  'Other',
];



const OrderModal = ({ isOpen, onClose, defaultService }: OrderModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('No file selected');

  const serviceDefault = useMemo(() => {
    if (defaultService && serviceOptions.includes(defaultService)) {
      return defaultService;
    }
    return 'Website Design';
  }, [defaultService]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSelectedFileName('No file selected');
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const budget = String(data.budget ?? '').trim();
    const attachmentText = selectedFileName !== 'No file selected'
      ? `🖼️ *Attachment:* ${selectedFileName} (please send this file in WhatsApp chat after it opens)`
      : '🖼️ *Attachment:* Not provided';

    // Build WhatsApp message
    const message = `
🚀 *New Client Order Request*
 
👤 *Owner Name:* ${data.ownerName}
🏢 *Business Name:* ${data.businessName}
🏷️ *Business Category:* ${data.businessCategory}
🛠️ *Service Required:* ${data.serviceRequired}
💸 *Budget:* ${budget || 'Not specified'}
📅 *Deadline:* ${data.projectDeadline}
📍 *Location:* ${data.location}
📝 *Project Details:* ${data.description}
${attachmentText}
    `.trim();

    // Open WhatsApp directly with the formatted message
    const whatsappMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/923075579807?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success state
    setSubmitted(true);

    // Auto-close after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setSubmitted(false);
    setSelectedFileName('No file selected');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-[92vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl overflow-hidden rounded-[1.25rem] border border-white/20 bg-white/95 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl max-h-[90vh]"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.14),transparent_32%)]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 sm:p-8 lg:p-10 bg-slate-950 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  Premium Order Form
                </div>

                <h2 id="order-modal-title" className="mt-6 text-3xl sm:text-4xl font-display font-bold leading-tight">
                  Start your project with a polished order request.
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 max-w-md">
                  Share your project details and we’ll get back with a clear plan, timeline, and pricing. Built for fast mobile-friendly submissions.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  {[
                    'Glassmorphism UI',
                    'Responsive form layout',
                    'Quick project intake',
                    'Supports uploads',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative p-5 sm:p-8 lg:p-10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                  aria-label="Close order form"
                >
                  <X size={18} />
                </button>

                {submitted ? (
                  <div className="flex min-h-[420px] sm:min-h-[520px] flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Order sent to WhatsApp!</h3>
                    <p className="mt-3 max-w-md text-slate-600">
                      Your order details have been sent to our WhatsApp. We'll respond shortly with your project plan and pricing.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-8 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-bold text-white transition hover:shadow-lg"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4 sm:space-y-5 overflow-auto" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Owner Name" name="ownerName" placeholder="Your name" required />
                      <Field label="Business Name" name="businessName" placeholder="Your brand or company" required />
                    </div>

                    <Field label="Business Category" name="businessCategory" placeholder="Agency, e-commerce, SaaS..." required />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <SelectField label="Service Required" name="serviceRequired" options={serviceOptions} defaultValue={serviceDefault} required />
                      <Field
                        label="Budget"
                        name="budget"
                        placeholder="e.g., $5,000 or 500,000 PKR"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Project Deadline" name="projectDeadline" type="date" required />
                      <Field label="Country / City" name="location" placeholder="Pakistan / Karachi" required />
                    </div>

                    <Field label="Description / What You Want" name="description" as="textarea" rows={4} placeholder="Describe your project goals, style, and key requirements..." required />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Upload Reference File/Image</label>
                        <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4 text-sm text-slate-600 transition hover:border-primary hover:bg-primary/5">
                          <Upload size={18} className="shrink-0 text-primary" />
                          <span className="truncate">{selectedFileName}</span>
                          <input
                            type="file"
                            name="referenceFile"
                            accept="image/*,.pdf"
                            className="sr-only"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              setSelectedFileName(file ? file.name : 'No file selected');
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-4 font-bold text-white transition hover:shadow-xl hover:shadow-primary/20"
                      >
                        Submit Order
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
};

const fieldStyles = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

const Field = ({ label, name, placeholder, type = 'text', required, as = 'input', rows }: FieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1" htmlFor={name}>{label}</label>
    {as === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        rows={rows ?? 4}
        placeholder={placeholder}
        required={required}
        className={`${fieldStyles} resize-none`}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={fieldStyles}
      />
    )}
  </div>
);

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  required?: boolean;
};

const SelectField = ({ label, name, options, defaultValue, required }: SelectFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1" htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      defaultValue={defaultValue ?? ''}
      required={required}
      className={fieldStyles}
    >
      <option value="" disabled>Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default OrderModal;