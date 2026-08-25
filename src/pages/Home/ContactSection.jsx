import { useState } from 'react'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzjV_ZE1OFp0mfgEfD9YTfpwZYrUVMHu-FTgBslvWUEiYnDEc_Ux9Dk8puGhCybGL7u/exec'

const RULES = {
  name:  v => !v.trim()                          ? 'Name is required'
             : v.trim().length < 2               ? 'Name must be at least 2 characters'
             : !/^[a-zA-Z\s'.,-]+$/.test(v.trim()) ? 'Enter a valid name'
             : '',
  email: v => !v.trim()                          ? 'Email is required'
             : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter a valid email address'
             : '',
  phone: v => {
    const digits = v.replace(/\D/g, '')
    if (!v.trim()) return 'Phone number is required'
    if (digits.length < 7)  return 'Enter a valid phone number'
    if (digits.length > 12) return 'Phone number cannot exceed 12 digits'
    return ''
  },
  cargo: v => !v ? 'Please select a cargo type' : '',
}

const INIT = { name: '', company: '', email: '', phone: '', cargo: '', volume: '', need: '' }

export default function ContactSection() {
  const [values,  setValues]  = useState(INIT)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitErr, setSubmitErr] = useState(false)
  const [submitErrMsg, setSubmitErrMsg] = useState('')

  const validate = (field, value) => RULES[field] ? RULES[field](value) : ''

  const handleChange = (field, value) => {
    setValues(v => ({ ...v, [field]: value }))
    if (touched[field]) setErrors(e => ({ ...e, [field]: validate(field, value) }))
  }

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(e => ({ ...e, [field]: validate(field, values[field]) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Touch all validated fields and run all rules
    const allTouched = { name: true, email: true, phone: true, cargo: true }
    const allErrors  = {
      name:  validate('name',  values.name),
      email: validate('email', values.email),
      phone: validate('phone', values.phone),
      cargo: validate('cargo', values.cargo),
    }
    setTouched(t => ({ ...t, ...allTouched }))
    setErrors(e => ({ ...e, ...allErrors }))

    if (Object.values(allErrors).some(Boolean)) return

    setLoading(true)
    setSubmitErr(false)
    setSubmitErrMsg('')

    try {
      const payload = {
        name: values.name,
        company: values.company,
        workEmail: values.email,
        contactNumber: values.phone,
        cargoType: values.cargo,
        volumePerMonth: values.volume,
        requirements: values.need,
      }

      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }

      setSent(true)
      setValues(INIT)
      setTouched({})
      setErrors({})
      setTimeout(() => setSent(false), 7000)
    } catch (err) {
      setSubmitErr(true)
      setSubmitErrMsg(err.message || 'Something went wrong — please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  const field = (id, label, required, children) => (
    <div className={`field${errors[id] && touched[id] ? ' field-err' : touched[id] && required && !errors[id] ? ' field-ok' : ''}`}>
      <label htmlFor={id}>
        {label}{required && <span style={{ color: '#ff6b6b' }}> *</span>}
      </label>
      {children}
      {errors[id] && touched[id] && (
        <span className="field-msg">{errors[id]}</span>
      )}
    </div>
  )

  return (
    <section className="sec dark-sec" id="contact" style={{ padding: '60px 0 0' }}>
      <div className="wrap">
        <div className="chill">
          <div className="chill-grid">
            <div>
              <h2>
                <span className="hline">Chill,</span>
                <span className="hline"><span className="accent">we got it.</span></span>
              </h2>
              <p className="lede" style={{ marginTop: 42 }}>
                Tell us what needs to stay cold, where it needs to go, and when. We&apos;ll come back with a tailored proposal within 24 hours.
              </p>
            </div>

            <form className="form-card glass" onSubmit={handleSubmit} noValidate>
              <h3>Request a quote</h3>
              <p style={{ margin: 0, color: 'var(--mute)', fontSize: 13.5 }}>A 24-hour response, guaranteed.</p>

              <div className="row">
                {field('name', 'NAME', true,
                  <input id="f-name" name="name" type="text" autoComplete="name"
                    value={values.name}
                    onChange={e => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Full name"
                  />
                )}
                {field('company', 'COMPANY', false,
                  <input id="f-company" name="company" type="text" autoComplete="organization"
                    value={values.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="Company name"
                  />
                )}
              </div>

              <div className="row">
                {field('email', 'WORK EMAIL', true,
                  <input id="f-email" name="email" type="email" autoComplete="email"
                    value={values.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@company.com"
                  />
                )}
                {field('phone', 'CONTACT NUMBER', true,
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel"
                    value={values.phone}
                    onChange={e => {
                      const digitsOnly = e.target.value.replace(/\D/g, '')
                      if (digitsOnly.length <= 12) {
                        handleChange('phone', digitsOnly)
                      }
                    }}
                    onBlur={() => handleBlur('phone')}
                    placeholder="9988118803"
                  />
                )}
              </div>

              <div className="row">
                {field('cargo', 'CARGO TYPE', true,
                  <select id="f-cargo" name="cargo"
                    value={values.cargo}
                    onChange={e => handleChange('cargo', e.target.value)}
                    onBlur={() => handleBlur('cargo')}
                  >
                    <option value="" disabled>Select cargo type</option>
                    <option>Food &amp; Beverages</option>
                    <option>Pharmaceuticals</option>
                    <option>Dairy</option>
                    <option>Frozen Foods</option>
                    <option>Meat &amp; Poultry</option>
                    <option>Seafood</option>
                    <option>QSR / Cloud Kitchen</option>
                    <option>Processed Food</option>
                    <option>Healthcare</option>
                    <option>FMCG</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                )}
                {field('volume', 'VOLUME / MONTH', false,
                  <input id="f-volume" name="volume" type="text"
                    value={values.volume}
                    onChange={e => handleChange('volume', e.target.value)}
                    placeholder="e.g. 200 pallets"
                  />
                )}
              </div>

              {field('need', 'YOUR REQUIREMENTS', false,
                <textarea id="f-need" name="need"
                  value={values.need}
                  onChange={e => handleChange('need', e.target.value)}
                  placeholder="Temperature range, product type, timeline..."
                />
              )}

              {submitErr && (
                <p style={{ color: '#ff6b6b', fontSize: 13, margin: '12px 0 0', lineHeight: 1.5 }}>
                  {submitErrMsg || 'Something went wrong — please try again or email us directly.'}
                </p>
              )}

              {sent && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(10,143,79,.12)', border: '1px solid rgba(10,143,79,.35)',
                  borderRadius: 12, padding: '12px 16px', marginTop: 14,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#0a8f4f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>
                    Thank you! Your request has been submitted successfully.
                  </span>
                </div>
              )}

              <button className="btn btn-p" type="submit" disabled={loading || sent}>
                {loading ? 'Sending...' : (
                  <>
                    Send request
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
