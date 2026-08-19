import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

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
    setModalOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSent(true)
  }

  const faqs = [
    {
      question: 'Do I need advanced video or design skills?',
      answer: 'No. The masterclass is built around clear, repeatable workflows. You will work from a single product image and be guided through the prompts, storyboards and animation steps live.'
    },
    {
      question: 'What tools will we use?',
      answer: 'We will use ChatGPT for scripts and concepts, Promptor for storyboard creation, Google Flow for animation production, and AI Auto Fill for creative ideation.'
    },
    {
      question: 'Who is this training for?',
      answer: 'Content creators, marketers, agencies, designers, freelancers, entrepreneurs, ecommerce owners, students and creative professionals who want to produce more compelling product content.'
    },
    {
      question: 'How do I secure the early bird price?',
      answer: 'Use the registration button to submit your details, then complete payment through the Paystack checkout. The early bird offer is ₦6,000; the regular price is ₦16,000.'
    }
  ]

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <div className="announcement-track">
          <span>EARLY BIRD ₦6,000</span><i>✦</i><span>2 LIVE SESSIONS</span><i>✦</i><span>ONE PRODUCT PHOTO</span><i>✦</i><span>EARLY BIRD ₦6,000</span><i>✦</i><span>AI POWERED ADS</span><i>✦</i><span>EARLY BIRD ₦6,000</span><i>✦</i>
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
            <h1>One photo.<br /><span className="lime-text">Infinite</span><br />possibilities<span className="period">.</span></h1>
            <p className="hero-lede">Turn any product image into a polished, animated commercial built for social, ecommerce, paid ads and the brands you want to impress.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={openRegistration}>Join the masterclass <ArrowUpRight size={18} /></button>
              <button className="text-button" onClick={() => scrollToId('workflow')}>See how it works <ArrowRight size={17} /></button>
            </div>
            <div className="hero-note"><span>Learn the creative loop that takes you<br className="desktop-only" /> from source image to ad ready reveal.</span></div>
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
                  <button className="play-button" onClick={() => setVideoOpen(true)} aria-label="Play the product reveal clip">
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
          <div className="signal-intro"><span className="mini-kicker">AT A GLANCE</span><span className="signal-intro-arrow">↘</span></div>
          <div className="signal-item"><strong>01</strong><span>source<br />image</span></div>
          <div className="signal-item"><strong>04</strong><span>AI tools<br />in the loop</span></div>
          <div className="signal-item"><strong>02</strong><span>focused<br />sessions</span></div>
          <div className="signal-item signal-item--accent"><strong>∞</strong><span>creative<br />directions</span></div>
        </section>

        <section className="brief-section section-pad" id="brief">
          <div className="section-label"><span>01</span><span>THE BRIEF</span></div>
          <div className="brief-grid">
            <h2>Make the<br /><span>ordinary</span><br />look <em>expensive.</em></h2>
            <div className="brief-copy">
              <p className="lead-copy">A product photo should not be the end of the process. In this masterclass, you will learn how to turn one still image into a professional product reveal that feels considered, cinematic and ready to move.</p>
              <p>We connect the right AI tools in the right order from concept and script, through storyboard and animation, to a finished asset you can use for social media, ecommerce, paid advertising, client projects and brand campaigns.</p>
              <button className="underlined-link" onClick={() => scrollToId('masterclass')}>Explore the two session system <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="brief-footnote"><span>THE OUTCOME</span><span>From a single input to a cinematic product story.</span></div>
        </section>

        <section className="masterclass-section section-pad" id="masterclass">
          <div className="section-heading-row">
            <div>
              <div className="section-label"><span>02</span><span>THE MASTERCLASS</span></div>
              <h2>Two sessions.<br /><span>One repeatable</span> loop.</h2>
            </div>
            <p className="heading-aside">No endless tabs. No guessing what to type next. Just a practical system for producing sharper product content, faster.</p>
          </div>
          <div className="session-grid">
            <article className="session-card session-card-dark">
              <div className="card-top"><span className="card-number">01</span><span className="card-tag">THINK / WRITE</span></div>
              <div className="session-icon session-icon--orange"><Spark size={18} /></div>
              <h3>Build the<br /><span>creative direction.</span></h3>
              <p>Start with strategy, then turn the idea into a script and storyboard that gives the animation somewhere meaningful to go.</p>
              <ul className="session-list">
                <li><span>01</span>AI product advertising strategy</li>
                <li><span>02</span>Promptor storyboarding</li>
                <li><span>03</span>Scripts and creative concepts</li>
              </ul>
              <div className="card-bottom"><span>CHATGPT + PROMPTOR</span><ArrowUpRight size={16} /></div>
            </article>
            <article className="session-card session-card-lime">
              <div className="card-top"><span className="card-number">02</span><span className="card-tag">MAKE / MOVE</span></div>
              <div className="session-icon session-icon--blue"><span className="session-play-triangle"></span></div>
              <h3>Bring the<br /><span>product to life.</span></h3>
              <p>Move from storyboard to animation, product reveal and export with a workflow that can flex for your next client brief.</p>
              <ul className="session-list">
                <li><span>01</span>Google Flow animation</li>
                <li><span>02</span>Product reveal production</li>
                <li><span>03</span>Exports and client workflows</li>
              </ul>
              <div className="card-bottom"><span>GOOGLE FLOW + AUTO FILL</span><ArrowUpRight size={16} /></div>
            </article>
          </div>
          <div className="tool-line"><span>THE TOOLKIT</span><span className="tool-chip">CHATGPT</span><span className="tool-chip">PROMPTOR</span><span className="tool-chip">GOOGLE FLOW</span><span className="tool-chip">AI AUTO FILL</span></div>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="section-label"><span>03</span><span>THE WORKFLOW</span></div>
          <div className="workflow-grid">
            <div className="workflow-copy">
              <h2>A tighter loop from <span>idea</span> to edit.</h2>
              <p>Great product ads are not a single prompt. They are a sequence of small, smart decisions. Learn the sequence once and you can adapt it to almost any product.</p>
              <div className="code-note"><span className="code-dot code-dot--red"></span><span className="code-dot code-dot--yellow"></span><span className="code-dot code-dot--green"></span><code>/product-reveal /v01</code></div>
            </div>
            <div className="workflow-steps">
              <div className="workflow-step"><span className="step-index">01</span><div><h3>Frame the brief</h3><p>Define the product promise, audience and visual direction before the prompt.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">02</span><div><h3>Write the moment</h3><p>Use ChatGPT to turn a product benefit into a script with a point of view.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">03</span><div><h3>Storyboard the motion</h3><p>Use Promptor to see the sequence, composition and transitions before you animate.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="workflow-step"><span className="step-index">04</span><div><h3>Make, refine, ship</h3><p>Animate in Google Flow, refine the creative, then export for the job at hand.</p></div><span className="step-arrow"><ArrowUpRight size={17} /></span></div>
            </div>
          </div>
        </section>

        <section className="audience-section section-pad" id="audience">
          <div className="audience-intro">
            <div className="section-label section-label-dark"><span>04</span><span>WHO IT'S FOR</span></div>
            <h2>Made for the<br /><em>next</em> kind of<br />creative.</h2>
          </div>
          <div className="audience-content">
            <p className="audience-lede">If you make, market or sell something online, this is a faster way to show people why it matters.</p>
            <div className="audience-pills"><span>Content creators</span><span>Marketers</span><span>Agencies</span><span>Designers</span><span>Freelancers</span><span>Entrepreneurs</span><span>Ecommerce owners</span><span>Creative students</span></div>
            <div className="quote-card"><div className="quote-mark">“</div><blockquote>More confidence. More output. More ways to turn creative skill into immediate business value.</blockquote><div className="quote-byline"><span>WHAT PARTICIPANTS TAKE AWAY</span></div></div>
          </div>
        </section>

        <section className="testimonials-section section-pad" id="testimonials">
          <div className="testimonials-heading-row">
            <div>
              <div className="section-label testimonials-label"><span>05</span><span>IN THEIR WORDS</span></div>
              <h2>Good work<br /><span>travels.</span></h2>
            </div>
            <div className="testimonials-intro"><span className="testimonials-mark">“</span><p>Participants leave with more confidence, more creative range and a workflow they can put to work immediately.</p><span className="testimonials-note">PARTICIPANT FEEDBACK / NIGERIA + EUROPE</span></div>
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
          <div className="benefit-copy"><div className="section-label"><span>06</span><span>THE PAYOFF</span></div><h2>Spend less time producing.<br /><span>Make more room for ideas.</span></h2></div>
          <div className="benefit-list">
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Reduce production costs</strong><p>Build professional product assets without a full production crew every time.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Create content faster</strong><p>Move from a still image to a campaign-ready direction in a focused workflow.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Expand your service offering</strong><p>Add AI powered product advertising to what you can confidently deliver.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon"><Check /></span><div><strong>Build future ready skills</strong><p>Understand the creative decisions behind the tools, not just the tools themselves.</p></div></div>
          </div>
        </section>

        <section className="offer-section section-pad" id="register">
          <div className="offer-card">
            <div className="offer-visual"><div className="offer-orb"></div><div className="offer-visual-text">TURN THE<br /><span>STILL</span><br />INTO A<br /><span>STORY.</span></div><div className="offer-visual-code">AI / PRM / 001</div></div>
            <div className="offer-details">
              <div className="section-label"><span>07</span><span>THE OFFER</span></div>
              <h2>Make your next<br /><span>product ad</span> move.</h2>
              <p>Two focused sessions. A practical creative system. The confidence to turn a product image into something people stop scrolling for.</p>
              <div className="price-row"><div><span className="price-label">EARLY BIRD</span><strong>₦6,000</strong></div><div className="regular-price"><span>REGULAR PRICE</span><del>₦16,000</del></div></div>
              <button className="button button-primary button-wide" onClick={openRegistration}>Register via Paystack <ArrowUpRight size={18} /></button>
              <span className="checkout-note">Secure your place through the checkout link. Your next brief starts here.</span>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faqs">
          <div className="faq-heading"><div className="section-label"><span>08</span><span>GOOD TO KNOW</span></div><h2>Questions,<br /><span>answered.</span></h2></div>
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
        <div className="footer-bottom"><span>AI PRODUCT REVEAL ADS MASTERCLASS</span><span>© 2026 / BUILT FOR THE CURIOUS</span><a href="https://paystack.shop/pay/productreview" target="_blank" rel="noreferrer">paystack.shop/pay/productreview <ArrowUpRight size={14} /></a></div>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
          <div className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close registration"><span></span><span></span></button>
            {!formSent ? (
              <>
                <div className="modal-kicker">RESERVE YOUR PLACE / 001</div>
                <h2 id="registration-title">Ready to make<br /><span>something move?</span></h2>
                <p>Leave your details and continue to the secure Paystack checkout. Early bird access is ₦6,000.</p>
                <form onSubmit={handleSubmit}>
                  <label>Full name<input name="name" type="text" placeholder="Your name" required /></label>
                  <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
                  <label>What best describes you?<select name="role" defaultValue="" required><option value="" disabled>Select one</option><option>Content creator</option><option>Marketer</option><option>Agency or freelancer</option><option>Ecommerce owner</option><option>Student</option><option>Other</option></select></label>
                  <button type="submit" className="button button-primary button-wide">Continue to payment <ArrowUpRight size={18} /></button>
                </form>
              </>
            ) : (
              <div className="success-state"><div className="success-mark"><Check size={29} /></div><div className="modal-kicker">YOU'RE ON THE LIST</div><h2>One step<br /><span>closer.</span></h2><p>Your details are saved. Complete your registration through the secure Paystack checkout to lock in the early bird price.</p><a className="button button-primary button-wide" href="https://paystack.shop/pay/productreview" target="_blank" rel="noreferrer">Open Paystack checkout <ArrowUpRight size={18} /></a><button className="modal-text-button" onClick={() => setModalOpen(false)}>I'll do this later</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
