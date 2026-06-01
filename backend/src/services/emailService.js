export async function sendInquiryEmail(inquiry, emailjs) {
  if (!emailjs.serviceId || !emailjs.templateId || !emailjs.publicKey) return

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: emailjs.templateId,
      user_id: emailjs.publicKey,
      accessToken: emailjs.privateKey || undefined,
      template_params: {
        name: inquiry.name,
        phone: inquiry.phone,
        message: inquiry.message,
        createdAt: inquiry.createdAt,
      },
    }),
  })

  if (!response.ok) throw new Error(`EmailJS failed with ${response.status}`)
}
