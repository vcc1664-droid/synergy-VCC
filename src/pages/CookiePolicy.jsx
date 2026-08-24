import { Helmet } from 'react-helmet-async'

const SECTIONS = [
  {
    title: 'What Are Cookies?',
    body: [
      'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to website owners.',
      'Cookies cannot run programs or deliver viruses to your device. They are uniquely assigned to your browser and can only be read by the server that issued them.',
    ],
  },
  {
    title: 'How We Use Cookies',
    body: [
      'The Versailles Cold Chain website uses cookies to enhance your browsing experience, understand how visitors interact with our site, and improve our content and services.',
      'We do not use cookies to collect personally identifiable information without your knowledge or to serve targeted advertising.',
    ],
  },
  {
    title: 'Types of Cookies We Use',
    body: [
      'Essential Cookies: These are necessary for the website to function properly. They enable core functionality such as page navigation and access to secure areas. The website cannot function properly without these cookies.',
      'Analytics Cookies: We use analytics tools (such as web traffic analysis) to understand how visitors use our website — which pages are most visited, how long visitors stay, and where they arrive from. This data is aggregated and anonymised.',
      'Preference Cookies: These cookies remember your preferences and settings to provide a more personalised experience on return visits.',
      'Performance Cookies: These help us understand and improve the performance of our website by collecting information about how pages load and whether errors occur.',
    ],
  },
  {
    title: 'Third-Party Cookies',
    body: [
      'Some cookies on our site are placed by third-party services we use, such as analytics providers. These third parties have their own privacy policies and cookie practices.',
      'We do not control the placement of third-party cookies and recommend reviewing the privacy policies of any third-party services you interact with.',
    ],
  },
  {
    title: 'Managing Cookies',
    body: [
      'Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain types, or notify you when a cookie is set.',
      'Please note that restricting cookies may impact the functionality of the Versailles Cold Chain website. Some features may not work as intended if cookies are disabled.',
      'To manage cookies, visit your browser\'s help section or settings. Common browsers include Chrome, Safari, Firefox, Edge, and Opera — each provides cookie management options in their privacy or settings menus.',
    ],
  },
  {
    title: 'Cookie Retention',
    body: [
      'Session cookies are temporary and expire when you close your browser.',
      'Persistent cookies remain on your device for a set period or until you delete them. The retention period for each type of cookie varies and is defined by the cookie\'s purpose.',
    ],
  },
  {
    title: 'Updates to This Policy',
    body: [
      'We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our practices. We encourage you to review this page periodically.',
      'Continued use of the website following any changes constitutes your acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have any questions about how we use cookies, please contact us:',
      'Email: info@versaillescoldchain.com',
      'Phone: +91 99881 18803',
      'Address: Hadbast No. 206, Village Toffanpur, Tehsil Dera Bassi, Distt. SAS Nagar, Punjab, India – 140506',
    ],
  },
]

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — Versailles Cold Chain</title>
        <meta name="description" content="Cookie Policy for the Versailles Cold Chain website. Learn how we use cookies and how to manage them." />
      </Helmet>

      <section className="page-hero about-ph" style={{ paddingBottom: 60 }}>
        <div className="wrap" style={{ paddingTop: 'clamp(80px,12vw,140px)', textAlign: 'center' }}>
          <span style={{ display:'inline-flex',alignItems:'center',gap:10,padding:'7px 14px',borderRadius:999,background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.2)',fontFamily:'var(--body)',fontSize:11,letterSpacing:'.16em',color:'rgba(255,255,255,.8)',textTransform:'uppercase',marginBottom:24 }}>
            Legal
          </span>
          <h1 style={{ fontFamily:"'Satoshi',system-ui,sans-serif",fontWeight:700,fontSize:'clamp(36px,6vw,72px)',lineHeight:1.05,letterSpacing:'-.03em',margin:'0 0 20px',color:'#fff' }}>
            Cookie Policy
          </h1>
          <p style={{ color:'rgba(255,255,255,.6)',fontSize:'clamp(15px,1.8vw,18px)',maxWidth:600,margin:'0 auto',lineHeight:1.65 }}>
            Effective date: June 2026. This policy explains how we use cookies on the Versailles Cold Chain website.
          </p>
        </div>
      </section>

      <section style={{ padding:'80px 0 120px' }}>
        <div className="wrap" style={{ maxWidth:820 }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ marginBottom:48 }}>
              <h2 style={{ fontFamily:"'Satoshi',system-ui,sans-serif",fontWeight:700,fontSize:'clamp(20px,2.4vw,28px)',letterSpacing:'-.02em',color:'var(--navy)',marginBottom:16 }}>
                {s.title}
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
