import React, { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.message.trim()) e.message = 'Please enter a message.'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus('sending')
    // simulate send
    try {
      await new Promise((r) => setTimeout(r, 900))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-card">
        <h2>Get in touch</h2>
        <p className="muted">Have a question or want to collaborate? Send a message — we usually reply within a day.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className={errors.name ? 'error' : ''}>
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <small id="name-error">{errors.name}</small>}
          </label>

          <label className={errors.email ? 'error' : ''}>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <small id="email-error">{errors.email}</small>}
          </label>

          <label className={errors.message ? 'error' : ''}>
            <span>Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <small id="message-error">{errors.message}</small>}
          </label>

          <div className="actions">
            <button
              type="submit"
              className={`btn primary ${status === 'sending' ? 'loading' : ''} ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`}
            >
              {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent ✓' : status === 'error' ? 'Try again' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
