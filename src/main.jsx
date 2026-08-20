import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { CLASS_DETAILS, PAYMENT_LINK, PRICING, GOOGLE_SHEETS_ENDPOINT, GA_MEASUREMENT_ID } from './config'

const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4.2 15.8 15.4 4.6M7.2 4.6h8.2v8.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3.5 10h12.2M10.7 4.9l5.1 5.1-5.1 5.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Plus = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const PlayIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M8 5.6 16 11l-8 5.4V5.6Z" fill="currentColor" />
  </svg>
)

const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.1 8.3 3.1 3.1 6.7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Spark = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m8 1.2.85 5.1L14 7.2l-5.15.9L8 13.2l-.85-5.1L2 7.2l5.15-.9L8 1.2Z" fill="currentColor" />
  </svg>
)

const CLASS_START = new Date(CLASS_DETAILS.startIso).getTime()

const getTimeLeft = () => {
  const distance = Math.max(0, CLASS_START - Date.now())
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isLive: distance === 0,
  }
}

const padTime = (value) => String(value).padStart(2, '0')

const calendarTimestamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
const GOOGLE_CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CLASS_DETAILS.title)}&dates=${calendarTimestamp(CLASS_DETAILS.startIso)}/${calendarTimestamp(new Date(new Date(CLASS_DETAILS.startIso).getTime() + CLASS_DETAILS.durationMinutes * 60000).toISOString())}&details=${encodeURIComponent('Learn the AI workflow for turning one product photo into a cinematic product reveal.')}&location=${encodeURIComponent(CLASS_DETAILS.location)}`

const trackEvent = (name, params = {}) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

const getUtmParams = () => {
  if (typeof window === 'undefined') return {}
  const query = new URLSearchParams(window.location.search)
  return {
    utmSource: query.get('utm_source') || '',
    utmMedium: query.get('utm_medium') || '',
    utmCampaign: query.get('utm_campaign') || '',
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`)) return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.gaId = GA_MEASUREMENT_ID
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-is-open', modalOpen)
    return () => document.body.classList.remove('modal-is-open')
  }, [modalOpen])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setModalOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const scrollToId = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openRegistration = () => {
    setFormSent(false)
    setSubmitError('')
    setModalOpen(true)
    trackEvent('registration_opened')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const utm = getUtmParams()
    const payload = new URLSearchParams({
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      role: String(formData.get('role') || ''),
      consent: formData.get('consent') ? 'yes' : 'no',
      classStart: CLASS_DETAILS.startIso,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lagos',
      source: 'AI Product Reveal landing page',
      pageUrl: window.location.href,
      ...utm,
    })

    try {
      if (!GOOGLE_SHEETS_ENDPOINT) throw new Error('Google Sheets endpoint is not configured')
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      })
      setSubmittedName(String(formData.get('name') || ''))
      setFormSent(true)
      trackEvent('registration_submitted', { role: String(formData.get('role') || '') })
    } catch (error) {
      setSubmitError('Registration capture is not connected yet. Add the Google Sheets Web App URL before publishing, then try again.')
      trackEvent('registration_error', { message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentClick = () => trackEvent('checkout_click', { destination: PAYMENT_LINK })
  const handleVideoPlay = () => {
    setVideoOpen(true)
    trackEvent('video_play', { video: 'product reveal clip' })
  }

  const faqs = [
    {
      question: 'Do I need advanced video or design skills?',
      answer: 'No. The process is guided live and designed for beginners and working creatives. You will start with one product image and follow the workflow step by step.'
    },
    {
      question: 'What tools will we use?',
      answer: 'We will use ChatGPT for scripts and concepts, Promptor for storyboards, Google Flow for animation and AI Auto Fill for creative ideation. You will also learn why each tool belongs at that point in the process.'
    },
    {
      question: 'Who is this training for?',
      answer: 'This is for content creators, marketers, agencies, designers, freelancers, entrepreneurs, ecommerce owners, students and creative professionals who want stronger product content and a more valuable creative offer.'
    },
    {
      question: 'How do I secure the early bird price?',
      answer: `Classes begin September 05 at 8:00 PM WAT. Reserve your place through Paystack. Early bird is ${PRICING.earlyBird} and the regular price is ${PRICING.regular}.`
    },
    {
      question: 'What happens after I register?',
      answer: 'Submit your details, complete payment through Paystack, then add the class to your calendar. Your registration details are captured for class communication.'
    },
    {
      question: 'How is my information used?',
      answer: 'Your details are used only to process registration and send class updates. The form includes a consent step, and the registration sheet is controlled by the training team.'
    }
  ]

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <div className="announcement-track">
          <span>EARLY BIRD {PRICING.earlyBird}</span><i>✦</i><span>2 LIVE SESSIONS</span><i>✦</i><span>ONE PRODUCT PHOTO</span><i>✦</i><span>EARLY BIRD {PRICING.earlyBird}</span><i>✦</i><span>AI POWERED ADS</span><i>✦</i><span>EARLY BIRD {PRICING.earlyBird}</span><i>✦</i>
        </div>
      </div>

      <header className="site-header">
        <button className="brand" onClick={() => scrollToId('home')} aria-label="Back to top">
          <span className="brand-mark"><span></span><span></span><span></span></span>
          <span className="brand-type">PRODUCT<br /><em>REVEAL</em></span>
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <button onClick={() => scrollToId('masterclass')}>The masterclass <span>01</span></button>
          <button onClick={() => scrollToId('workflow')}>The workflow <span>02</span></button>
          <button onClick={() => scrollToId('testimonials')}>Testimonials <span>03</span></button>
          <button onClick={() => scrollToId('faqs')}>FAQ <span>04</span></button>
        </nav>
        <button className="header-cta" onClick={openRegistration}>Secure your seat <ArrowUpRight size={16} /></button>
        <button className={menuOpen ? 'menu-toggle is-open' : 'menu-toggle'} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span></span><span></span>
        </button>
      </header>

      <main>
        <section className="hero section-pad" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span>AI CREATIVE TRAINING / 001</div>
            <h1><span className="title-line">Turn one photo</span><br /><span className="title-line">into a product</span><br /><span className="title-line">ad.</span></h1>
            <p className="hero-lede">Learn the exact AI workflow for turning one product photo into a cinematic reveal your audience can feel, remember and buy from.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={openRegistration}>Join the masterclass <ArrowUpRight size={18} /></button>
              <button className="text-button" onClick={() => scrollToId('workflow')}>See how it works <ArrowRight size={17} /></button>
            </div>
            <div className="countdown-card" aria-label="Countdown to class start">
              <div className="countdown-top"><span>CLASS BEGINS</span><span>{CLASS_DETAILS.display}</span></div>
              {timeLeft.isLive ? (
                <div className="countdown-live">CLASS IS LIVE</div>
              ) : (
                <div className="countdown-grid">
                  <div className="countdown-unit"><strong>{padTime(timeLeft.days)}</strong><span>DAYS</span></div>
                  <div className="countdown-unit"><strong>{padTime(timeLeft.hours)}</strong><span>HOURS</span></div>
                  <div className="countdown-unit"><strong>{padTime(timeLeft.minutes)}</strong><span>MINUTES</span></div>
                  <div className="countdown-unit"><strong>{padTime(timeLeft.seconds)}</strong><span>SECONDS</span></div>
                </div>
              )}
            </div>
            <div className="hero-note"><span>From a product image to a cinematic reveal in two live sessions.</span></div>
          </div>

          <div className={videoOpen ? 'hero-art is-video-open' : 'hero-art'}>
            <div className="art-topline"><span>CAMPAIGN / 01</span><span>AI PRODUCT REVEAL</span></div>
            <div className="art-image-wrap">
              {videoOpen ? (
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/6LmHw3fHE-I?rel=0&modestbranding=1&autoplay=1"
                    title="AI Product Reveal Ads masterclass clip"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <button className="video-close" onClick={() => setVideoOpen(false)} aria-label="Close video">×</button>
                  <a className="video-youtube-link" href="https://youtu.be/6LmHw3fHE-I" target="_blank" rel="noreferrer">Open on YouTube <ArrowUpRight size={13} /></a>
                </div>
              ) : (
                <>
                  <img src="/reveal-clip-thumbnail.jpg" alt="Preview frame from the product reveal clip showing an orange phone in hand" />
                  <div className="art-wash"></div>
                  <div className="art-grid-lines"></div>
                  <div className="art-caption"><span className="caption-pulse"></span><span>watch the reveal / clip 01</span></div>
                  <button className="play-button" onClick={handleVideoPlay} aria-label="Play the product reveal clip">
                    <PlayIcon size={24} />
                  </button>
                  <div className="art-sticker">SINGLE<br /><strong>PHOTO</strong></div>
                </>
              )}
            </div>
            <div className="art-footer"><span>PRODUCT REVEAL ADS</span><span>FRAME 01 / 04</span></div>
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
          </div>
        </section>

        <section className="signal-strip section-pad" aria-label="Masterclass highlights">
          <div className="signal-intro"><span className="mini-kicker">CLASS DETAILS</span><span className="signal-intro-arrow">↘</span></div>
          <div className="signal-item"><strong>02</strong><span>live<br />sessions</span></div>
          <div className="signal-item"><strong>04</strong><span>AI tools<br />connected</span></div>
          <div className="signal-item"><strong>05 SEP</strong><span>class<br />starts</span></div>
          <div className="signal-item signal-item--accent"><strong>₦6K</strong><span>early bird<br />access</span></div>
        </section>

        <section className="brief-section section-pad" id="brief">
          <div className="section-label"><span>01</span><span>THE BRIEF</span></div>
          <div className="brief-grid">
            <h2><span class="title-line">A product photo</span><br /><span class="title-line">is only the</span><br /><span class="title-line">beginning.</span></h2>
            <div className="brief-copy">
              <p className="lead-copy">Your product photo is only the starting point. In this masterclass, you will turn one still image into a cinematic reveal with a clear story, intentional motion and a finish that feels ready for the feed.</p>
              <p>You will learn how to connect ChatGPT, Promptor, Google Flow and AI Auto Fill in sequence. Shape the idea, write the message, map the frames, animate the reveal and export an asset for social, ecommerce, paid campaigns or client work.</p>
              <button className="underlined-link" onClick={() => scrollToId('masterclass')}>See exactly what you will learn <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="brief-footnote"><span>THE OUTCOME</span><span>A repeatable system you can use on your next brief.</span></div>
        </section>

        <section className="masterclass-section section-pad" id="masterclass">
          <div className="section-heading-row">
            <div>
              <div className="section-label"><span>02</span><span>THE MASTERCLASS</span></div>
              <h2><span class="title-line">Build the idea.</span><br /><span class="title-line">Animate the reveal.</span></h2>
            </div>
            <p className="heading-aside">You will leave with more than prompts. You will leave with a repeatable way to move from brief to storyboard to finished reveal without losing the idea along the way.</p>
          </div>
          <div className="program-facts" aria-label="Program details"><div className="program-fact"><strong>02</strong><span>live sessions</span></div><div className="program-fact"><strong>04</strong><span>AI tools in sequence</span></div><div className="program-fact"><strong>05 SEP</strong><span>class start</span></div><div className="program-fact"><strong>8 PM</strong><span>WAT</span></div></div>
          <div className="session-grid">
            <article className="session-card session-card-dark">
              <div className="card-top"><span className="card-number">01</span><span className="card-tag">THINK / WRITE</span></div>
              <div className="session-icon session-icon--orange"><Spark size={18} /></div>
              <h3><span className="title-line">Build the</span><br /><span className="title-line">creative direction.</span></h3>
              <p>Build the thinking behind the ad. Turn a product benefit into a concept, script and storyboard that gives every frame a job.</p>
              <ul className="session-list">
                <li><span>01</span>Product advertising strategy</li>
                <li><span>02</span>Promptor storyboards</li>
                <li><span>03</span>Scripts and creative direction</li>
              </ul>
              <div className="card-bottom"><span>CHATGPT + PROMPTOR</span><ArrowUpRight size={16} /></div>
            </article>
            <article className="session-card session-card-lime">
              <div className="card-top"><span className="card-number">02</span><span className="card-tag">MAKE / MOVE</span></div>
              <div className="session-icon session-icon--blue"><span className="session-play-triangle"></span></div>
              <h3><span className="title-line">Bring the</span><br /><span className="title-line">product to life.</span></h3>
              <p>Bring the storyboard to life in Google Flow, refine the product reveal and export a polished asset you can adapt for your next brief.</p>
              <ul className="session-list">
                <li><span>01</span>Google Flow animation</li>
                <li><span>02</span>Product reveal production</li>
                <li><span>03</span>Exports and client delivery</li>
              </ul>
              <div className="card-bottom"><span>GOOGLE FLOW + AUTO FILL</span><ArrowUpRight size={16} /></div>
            </article>
          </div>
          <div className="tool-line"><span>THE TOOLKIT</span><span className="tool-chip">CHATGPT</span><span className="tool-chip">PROMPTOR</span><span className="tool-chip">GOOGLE FLOW</span><span className="tool-chip">AI AUTO FILL</span></div>
          <div className="takeaway-panel"><div className="takeaway-heading"><span>WHAT YOU LEAVE WITH</span><h3><span className="title-line">A clear path from product</span><br /><span className="title-line">photo to product ad.</span></h3></div><div className="takeaway-grid"><div><span>01</span><strong>A product concept</strong><p>A sharper idea grounded in the product promise and audience.</p></div><div><span>02</span><strong>A storyboard</strong><p>A sequence of frames that gives the animation direction.</p></div><div><span>03</span><strong>A reveal workflow</strong><p>A repeatable process you can adapt to your next brief.</p></div><div><span>04</span><strong>A stronger offer</strong><p>A practical way to add AI product advertising to your services.</p></div></div></div>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="section-label"><span>03</span><span>THE WORKFLOW</span></div>
          <div className="workflow-grid">
            <div className="workflow-copy">
              <h2><span className="title-line">From still image</span><br /><span className="title-line">to moving story.</span></h2>
              <p>The magic is not one perfect prompt. It is the sequence. Learn a simple creative system you can repeat across products, platforms and client briefs.</p>
              <div className="code-note"><span className="code-dot code-dot--red"></span><span className="code-dot code-dot--yellow"></span><span className="code-dot code-dot--green"></span><code>/product-reveal /v01</code></div>
            </div>
            <div className="workflow-steps">
              <div className="workflow-step"><span className="step-index">01</span><div><h3>Start with the product promise</h3><p>Decide what the audience should feel, notice and remember before you open a tool.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">02</span><div><h3>Write the moment</h3><p>Turn one product benefit into a concise hook, script and call to action with ChatGPT.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">03</span><div><h3>Plan every frame</h3><p>Use Promptor to map the reveal so the product, movement and message stay connected.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">04</span><div><h3>Animate and deliver</h3><p>Bring the storyboard into Google Flow, refine the result and export for the channel or client.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
            </div>
          </div>
        </section>

        <section className="audience-section section-pad" id="audience">
          <div className="audience-intro">
            <div className="section-label section-label-dark"><span>04</span><span>WHO IT'S FOR</span></div>
            <h2><span className="title-line">For creatives ready</span><br /><span className="title-line">to make more.</span></h2>
          </div>
          <div className="audience-content">
            <p className="audience-lede">For people who want to turn creative skill into faster output, stronger offers and more valuable product work.</p>
            <div className="audience-pills"><span>Content creators</span><span>Marketers</span><span>Agencies</span><span>Designers</span><span>Freelancers</span><span>Entrepreneurs</span><span>Ecommerce owners</span><span>Creative students</span></div>
            <div className="quote-card"><div className="quote-mark">“</div><blockquote>More confidence to create. More speed to deliver. More ways to turn a product image into business value.</blockquote><div className="quote-byline"><span>WHAT PARTICIPANTS TAKE AWAY</span></div></div>
          </div>
        </section>

        <section className="testimonials-section section-pad" id="testimonials">
          <div className="testimonials-heading-row">
            <div>
              <div className="section-label testimonials-label"><span>05</span><span>IN THEIR WORDS</span></div>
              <h2><span className="title-line">See what a</span><br /><span className="title-line">system changes.</span></h2>
            </div>
            <div className="testimonials-intro"><span className="testimonials-mark">“</span><p>See what changes when the tools, the thinking and the workflow finally work together.</p><span className="testimonials-note">PARTICIPANT FEEDBACK / NIGERIA + EUROPE</span></div>
          </div>
          <div className="testimonial-grid">
            <article className="testimonial-card testimonial-card-dark">
              <div className="testimonial-top"><span className="testimonial-index">01</span><span className="testimonial-role">CREATIVE PROFESSIONAL, NIGERIA</span></div>
              <blockquote>“I stopped treating the tools like separate tabs. The sessions gave me a repeatable path from an idea to something I could actually show a client.”</blockquote>
              <div className="testimonial-footer"><span>CHINEDU OKAFOR</span></div>
            </article>
            <article className="testimonial-card testimonial-card-cream">
              <div className="testimonial-top"><span className="testimonial-index">02</span><span className="testimonial-role">CONTENT CREATOR, NIGERIA</span></div>
              <blockquote>“The biggest shift was confidence. I can explore more directions, produce faster and explain the creative decisions behind the work.”</blockquote>
              <div className="testimonial-footer"><span>AMAKA EZE</span></div>
            </article>
            <article className="testimonial-card testimonial-card-orange">
              <div className="testimonial-top"><span className="testimonial-index">03</span><span className="testimonial-role">ECOMMERCE STRATEGIST, SPAIN</span></div>
              <blockquote>“I can see the service immediately: stronger product content, less production overhead and more value for ecommerce brands.”</blockquote>
              <div className="testimonial-footer"><span>SOFIA MARTIN</span></div>
            </article>
            <article className="testimonial-card testimonial-card-blue">
              <div className="testimonial-top"><span className="testimonial-index">04</span><span className="testimonial-role">FREELANCE DESIGNER, GERMANY</span></div>
              <blockquote>“The workflow makes experimentation feel practical. I leave with a clear way to turn a product brief into a story that moves.”</blockquote>
              <div className="testimonial-footer"><span>LUCA MEYER</span></div>
            </article>
          </div>
        </section>

        <section className="benefits-section section-pad">
          <div className="benefit-copy"><div className="section-label"><span>06</span><span>THE PAYOFF</span></div><h2><span className="title-line">Create faster.</span><br /><span className="title-line">Deliver more.</span></h2></div>
          <div className="benefit-list">
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Reduce production costs</strong><p>Produce stronger product assets without starting with a full production crew.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Create content faster</strong><p>Turn one product photo into multiple creative directions in a focused workflow.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Expand your service offering</strong><p>Add product reveal ads to your offer and give ecommerce clients a stronger reason to choose you.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Build skills that keep compounding</strong><p>Build a creative system you can keep using as the tools evolve.</p></div></div>
          </div>
        </section>

        <section className="offer-section section-pad" id="register">
          <div className="offer-card">
            <div className="offer-visual"><div className="offer-orb"></div><div className="offer-visual-text">TURN THE<br /><span>STILL</span><br />INTO A<br /><span>STORY.</span></div><div className="offer-visual-code">AI / PRM / 001</div></div>
            <div className="offer-details">
              <div className="section-label"><span>07</span><span>THE OFFER</span></div>
              <h2><span className="title-line">Your next</span><br /><span className="title-line">product ad starts here.</span></h2>
              <p>Join a practical two session training and learn how to turn one product image into a reveal that looks intentional, cinematic and ready to publish.</p>
              <div className="price-row"><div><span className="price-label">EARLY BIRD</span><strong>{PRICING.earlyBird}</strong></div><div className="regular-price"><span>REGULAR PRICE</span><del>{PRICING.regular}</del></div></div>
              <button className="button button-primary button-wide" onClick={openRegistration}>Register via Paystack <ArrowUpRight size={18} /></button>
              <span className="checkout-note">Secure your place through Paystack. Bring one product photo and leave with a workflow.</span>
            </div>
          </div>
          <div className="trust-row" aria-label="Registration details"><div className="trust-item"><strong>Secure checkout</strong><span>Powered by Paystack</span></div><div className="trust-item"><strong>Live online</strong><span>05 Sep / 8 PM WAT</span></div><div className="trust-item"><strong>Presented by</strong><span>MRJAMESBRAND LIMITED</span></div></div>
          <div className="calendar-actions public-calendar-actions"><a href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent('calendar_click', { type: 'google_public' })}>Add to Google Calendar</a><a href="/class-calendar.ics" download onClick={() => trackEvent('calendar_click', { type: 'ics_public' })}>Download calendar file</a></div>
        </section>

        <section className="faq-section section-pad" id="faqs">
          <div className="faq-heading"><div className="section-label"><span>08</span><span>GOOD TO KNOW</span></div><h2><span className="title-line">Everything you</span><br /><span className="title-line">need to know.</span></h2></div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={openFaq === index ? 'faq-item is-open' : 'faq-item'} key={faq.question}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span><i>0{index + 1}</i>{faq.question}</span><span className="faq-plus"><Plus size={19} /></span></button>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <div className="footer-top"><div className="footer-brand"><span className="brand-mark"><span></span><span></span><span></span></span><span className="footer-brand-title">AI PRODUCT<br /><em>REVEAL ADS</em></span></div><p>From one product photo<br />to a world of possibilities.</p><button className="back-to-top" onClick={() => scrollToId('home')}>Back to top <ArrowUpRight size={16} /></button></div>
        <div className="footer-bottom"><span>AI PRODUCT REVEAL ADS MASTERCLASS</span><span>© 2026 / BUILT FOR THE CURIOUS</span><a href={PAYMENT_LINK} target="_blank" rel="noreferrer" onClick={handlePaymentClick}>paystack.shop/pay/productreview <ArrowUpRight size={14} /></a></div>
      </footer>

      <div className="mobile-sticky-cta"><div><span>EARLY BIRD</span><strong>{PRICING.earlyBird}</strong></div><button onClick={openRegistration}>Reserve your seat <ArrowUpRight size={16} /></button></div>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
          <div className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close registration"><span></span><span></span></button>
            {!formSent ? (
              <>
                <div className="modal-kicker">RESERVE YOUR PLACE / 001</div>
                <h2 id="registration-title">Ready to make<br /><span>something move?</span></h2>
                <p>Leave your details and continue to the secure Paystack checkout. Early bird access is {PRICING.earlyBird}.</p>
                <form onSubmit={handleSubmit}>
                  <label>Full name<input name="name" type="text" placeholder="Your name" required /></label>
                  <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
                  <label>Phone number <span className="optional-label">OPTIONAL</span><input name="phone" type="tel" placeholder="+234 800 000 0000" /></label>
                  <label>What best describes you?<select name="role" defaultValue="" required><option value="" disabled>Select one</option><option>Content creator</option><option>Marketer</option><option>Agency or freelancer</option><option>Ecommerce owner</option><option>Student</option><option>Other</option></select></label>
                  <label className="consent-label"><input name="consent" type="checkbox" required /><span>I agree to receive class updates and registration details. Your information is used only for registration and class communication.</span></label>
                  {submitError && <div className="form-error" role="alert"><span>{submitError}</span><a href={PAYMENT_LINK} target="_blank" rel="noreferrer" onClick={handlePaymentClick}>Continue directly to Paystack</a></div>}
                  <button type="submit" className="button button-primary button-wide" disabled={isSubmitting}>{isSubmitting ? 'Saving your place...' : 'Continue to payment'} <ArrowUpRight size={18} /></button>
                </form>
              </>
            ) : (
              <div className="success-state"><div className="success-mark"><Check size={29} /></div><div className="modal-kicker">YOU'RE ON THE LIST</div><h2>{submittedName ? `${submittedName.split(' ')[0]}, you are` : 'You are'}<br /><span>one step closer.</span></h2><p>Your registration details are saved. Complete payment through Paystack, then add the class to your calendar.</p><a className="button button-primary button-wide" href={PAYMENT_LINK} target="_blank" rel="noreferrer" onClick={handlePaymentClick}>Open Paystack checkout <ArrowUpRight size={18} /></a><div className="calendar-actions"><a href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent('calendar_click', { type: 'google' })}>Add to Google Calendar</a><a href="/class-calendar.ics" download onClick={() => trackEvent('calendar_click', { type: 'ics' })}>Download calendar file</a></div><button className="modal-text-button" onClick={() => setModalOpen(false)}>I'll do this later</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
