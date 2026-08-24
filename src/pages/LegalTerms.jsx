import { Helmet } from 'react-helmet-async'

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using the Versailles Cold Chain website (versaillescoldchain.com) or engaging our services, you agree to be bound by these Legal Terms and Conditions. If you do not agree, please do not use our website or services.',
      'These terms apply to all visitors, prospective clients, and existing clients of Versailles Cold Chain',
    ],
  },
  {
    title: 'Company Information',
    body: [
      'Versailles Cold Chain is a company incorporated under the laws of India, engaged in temperature-controlled logistics, cold storage, and related supply chain services.',
      'Registered Address: Hadbast No. 206, Village Toffanpur, Tehsil Dera Bassi, Distt. SAS Nagar, Punjab, India – 140506.',
    ],
  },
  {
    title: 'Website Use',
    body: [
      'The content on this website is provided for general informational purposes only. Nothing on this website constitutes a legally binding offer, contract, or guarantee of service availability.',
      'You agree not to misuse this website, introduce malicious code, attempt unauthorised access, or use the site for any unlawful or fraudulent purpose.',
      'We reserve the right to modify, suspend, or discontinue any part of the website at any time without prior notice.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All content on this website — including but not limited to text, graphics, logos, icons, images, and software — is the property of Versailles Cold Chain or its content suppliers and is protected under applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.',
      'The "Versailles Cold Chain" name, logo, and all associated marks are proprietary to Versailles Cold Chain',
    ],
  },
  {
    title: 'Service Terms',
    body: [
      'All logistics and cold storage services provided by Versailles Cold Chain are governed by a separate service agreement executed between VCC and the client. These website terms do not constitute or replace any such agreement.',
      'Service availability, pricing, temperature ranges, coverage areas, and SLAs are subject to commercial negotiations and the executed service contract.',
      'VCC operates in accordance with applicable Indian regulations including FSSAI, GDP guidelines, ISO 22000, and relevant state laws governing cold chain operations.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Versailles Cold Chain shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any information contained herein.',
      'We make no warranties, express or implied, regarding the accuracy, completeness, or suitability of the information on this website.',
      'Our total liability arising from or related to these terms shall not exceed INR 10,000 (Indian Rupees Ten Thousand) in any circumstance.',
    ],
  },
  {
    title: 'Third-Party Links',
    body: [
      'Our website may contain links to third-party websites, including our parent company The Synergy Group. These links are provided for convenience only.',
      'We have no control over the content or privacy practices of third-party sites and accept no responsibility for them. Visiting third-party sites is at your own risk.',
    ],
  },
  {
    title: 'Governing Law & Jurisdiction',
    body: [
      'These terms are governed by and construed in accordance with the laws of India.',
      'Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts at Chandigarh / SAS Nagar (Mohali), Punjab, India.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We reserve the right to update these Legal Terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For any legal enquiries, please contact us at:',
      'Email: info@versaillescoldchain.com',
      'Phone: +91 99881 18803',
      'Address: Hadbast No. 206, Village Toffanpur, Tehsil Dera Bassi, Distt. SAS Nagar, Punjab, India – 140506',
    ],
  },
]

export default function LegalTerms() {
  return (
    <>
      <Helmet>
        <title>Legal Terms — Versailles Cold Chain</title>
        <meta name="description" content="Terms and conditions governing the use of the Versailles Cold Chain website and services."/>
      </Helmet>

      <section className="page-hero svc-hero" style={{ textAlign: 'center' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1000, margin: '0 auto', paddingTop: 'clamp(70px,10vw,100px)', paddingBottom: 'clamp(40px,6vw,80px)'}}>
        
          <h1 style={{ maxWidth: 'none' }}>
            <span className="hline">Clear terms,</span>
            <span className="hline"><span className="accent">honest operations.</span></span>
          </h1>
          <p className="lede" style={{ textAlign: 'center', fontSize: 'clamp(15px,1.8vw,18px)', maxWidth: 560 }}>
            Effective June 2026. These terms govern your use of the Versailles Cold Chain website and our services.
          </p>
        </div>
      </section>

      <section style={{ padding:'80px 0 120px' }}>
        <div className="wrap" style={{ maxWidth:820 }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ marginBottom:48 }}>
              <h2 style={{ fontFamily:"'Satoshi',system-ui,sans-serif",fontWeight:700,fontSize:'clamp(20px,2.4vw,28px)',letterSpacing:'-.02em',color:'var(--navy)',marginBottom:16}}>
                {s.title}y
              </h2>
              {s.body.map((p, i) => (
                <p key={i} style={{ color:'rgba(7,15,48,.65)',fontSize:16,lineHeight:1.75,marginBottom:12,fontFamily:'var(--body)' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
