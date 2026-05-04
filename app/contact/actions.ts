'use server'

import { Resend } from 'resend'

export type EnquiryState =
  | { success: true }
  | { success: false; error: string }
  | null

export async function sendEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const organisation = (formData.get('organisation') as string | null)?.trim() ?? ''
  const eventType = (formData.get('eventType') as string | null)?.trim() ?? ''
  const proposedDate = (formData.get('proposedDate') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in your name, email, and message.' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Piper Allen <noreply@piperallenmusic.com>',
      to: 'piperallen11@gmail.com',
      replyTo: email,
      subject: `Booking Enquiry — ${name}${eventType ? ` (${eventType})` : ''}`,
      text: [
        'New booking enquiry from piperallenmusic.com',
        '',
        `Name:               ${name}`,
        `Email:              ${email}`,
        `Organisation/Venue: ${organisation || '—'}`,
        `Event Type:         ${eventType || '—'}`,
        `Proposed Date:      ${proposedDate || '—'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#211D17">
          <h2 style="color:#2E3D1F;margin-bottom:24px">New Booking Enquiry</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:180px">Name</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#2E3D1F">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Organisation / Venue</td><td style="padding:8px 0">${organisation || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Event Type</td><td style="padding:8px 0">${eventType || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Proposed Date</td><td style="padding:8px 0">${proposedDate || '—'}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #8A9B6E40;margin:20px 0">
          <p style="color:#9E6240;font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Message</p>
          <p style="line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
