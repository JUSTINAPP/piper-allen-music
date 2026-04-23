'use client'

import { useActionState } from 'react'
import { sendEnquiry, type EnquiryState } from './actions'

const inputClass =
  'w-full border border-sage/40 bg-cream text-ink font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-forest transition-colors duration-150'

const labelClass =
  'block font-sans text-[10px] tracking-widest uppercase text-forest mb-1.5'

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<EnquiryState, FormData>(
    sendEnquiry,
    null,
  )

  if (state?.success) {
    return (
      <div className="py-16 flex flex-col items-start gap-4">
        <p className="font-serif italic text-forest text-2xl md:text-3xl">
          Thank you — your enquiry has been sent.
        </p>
        <p className="font-sans font-light text-ink/60 text-sm leading-relaxed">
          Piper will be in touch soon. In the meantime, feel free to follow along on{' '}
          <a
            href="https://www.instagram.com/piperallenmusic/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Name + Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-sienna">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-sienna">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      {/* Organisation + Event Type */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation / Venue
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select…</option>
            <option value="Festival">Festival</option>
            <option value="Venue">Venue</option>
            <option value="Private Event">Private Event</option>
            <option value="Corporate">Corporate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Proposed Date */}
      <div>
        <label htmlFor="proposedDate" className={labelClass}>
          Proposed Date
        </label>
        <input
          id="proposedDate"
          name="proposedDate"
          type="text"
          placeholder="e.g. mid-July 2027, or leave blank if flexible"
          className={`${inputClass} placeholder:text-ink/30`}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-sienna">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Error */}
      {state?.success === false && (
        <p className="font-sans text-sm text-sienna">{state.error}</p>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="font-sans text-[10px] tracking-widest uppercase text-ink/35">
          <span className="text-sienna">*</span> Required
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="border border-tangerine bg-tangerine text-cream px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-cream hover:text-tangerine active:bg-cream/85 active:text-tangerine disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending…' : 'Send Enquiry'}
        </button>
      </div>
    </form>
  )
}
