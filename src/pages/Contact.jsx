import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useReveal } from '../hooks/useReveal';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import SubpageHeroBg from '../components/layout/SubpageHeroBg';
import '../styles/contact-page.css';

// Active Web3Forms Access Key for info@aureuscreatives.com
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '43788bb8-103a-4b2f-9d30-0df04ccc9492';

export default function Contact() {
  useReveal();
  const location = useLocation();
  const [role, setRole] = useState('brand');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_or_brand: '',
    channel_or_portfolio: '',
    message: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'creator') {
      setRole('creator');
    } else {
      setRole('brand');
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New ${role === 'brand' ? 'Brand Campaign Brief' : 'Creator Application'} from ${formData.name || 'Website Visitor'}`,
        from_name: 'Aureus Creatives Website',
        inquiry_type: role === 'brand' ? 'Brand Campaign' : 'Creator Application',
        name: formData.name,
        email: formData.email,
        ...(role === 'brand'
          ? { company_or_brand: formData.company_or_brand }
          : { channel_or_portfolio: formData.channel_or_portfolio }
        ),
        message: formData.message
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again or email us directly at info@aureuscreatives.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      company_or_brand: '',
      channel_or_portfolio: '',
      message: ''
    });
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact Us | Aureus Creatives</title>
        <meta name="description" content="Get in touch with Aureus Creatives to start your next influencer campaign or join our creator network." />
      </Helmet>

      <Section variant="dark" className="contact-section subpage-hero" padded background={<SubpageHeroBg />}>

        <div className="contact-hero-header">
          <div className="section-label reveal" data-d="1">
            <span className="num">01</span>
            <span className="text">Start A Project</span>
            <span className="line" />
          </div>
          <h1 className="contact-hero-title serif reveal" data-d="2">Let's <em>talk</em>.</h1>
          
          <div className="role-toggle reveal" data-d="3" role="group" aria-label="Select role">
            <button 
              type="button"
              className={`role-btn role-btn--brand ${role === 'brand' ? 'active' : ''}`}
              onClick={() => { setRole('brand'); resetForm(); }}
            >
              I'm a Brand
            </button>
            <button 
              type="button"
              className={`role-btn role-btn--creator ${role === 'creator' ? 'active' : ''}`}
              onClick={() => { setRole('creator'); resetForm(); }}
            >
              I'm a Creator
            </button>
          </div>
        </div>

        <div className="contact-grid">
          
          <div className="contact-info reveal" data-d="1">
            {role === 'brand' ? (
              <>
                <h2 className="serif">Ready to launch your <em>next campaign</em>?</h2>
                <p>
                  Tell us about your product, your target audience, and the commercial goals you want to achieve.
                  We will assemble a curated roster, a tailored strategy, and transparent pricing.
                </p>
                <ul className="contact-list">
                  <li>Custom creator strategy &amp; vetting</li>
                  <li>End-to-end production management</li>
                  <li>Full commercial usage rights</li>
                  <li>Granular post-campaign ROI analytics</li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="serif">Ready to grow your <em>creator business</em>?</h2>
                <p>
                  Join our curated creator roster to partner with India's most ambitious brands.
                  We advocate for fair rates, protect your creative freedom, and ensure on-time payment.
                </p>
                <ul className="contact-list">
                  <li>Partnerships with tier-1 brands</li>
                  <li>Transparent contract &amp; rate negotiation</li>
                  <li>Creative autonomy &amp; briefing support</li>
                  <li>Guaranteed payment on time, every time</li>
                </ul>
              </>
            )}

            <div className="direct-contact">
              <h3>Direct Inquiries</h3>
              <a href="mailto:info@aureuscreatives.com">info@aureuscreatives.com</a>
            </div>
          </div>

          <div className="contact-form-wrapper reveal" data-d="2">
            <div className="contact-form-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--gold)' }}>✓</div>
                  <h3 className="serif" style={{ fontSize: '28px', color: '#FFF', marginBottom: '12px' }}>
                    Message Received
                  </h3>
                  <p style={{ color: '#C8C5BD', lineHeight: '1.6', fontSize: '15px', marginBottom: '24px' }}>
                    Thank you for reaching out to Aureus Creatives. Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    onClick={resetForm}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'var(--gold)',
                      padding: '8px 18px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div style={{
                      padding: '12px 16px',
                      marginBottom: '16px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#FCA5A5',
                      fontSize: '13.5px'
                    }}>
                      {errorMessage}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {role === 'brand' ? (
                    <div className="form-group">
                      <label htmlFor="company">Company / Brand Name</label>
                      <input 
                        id="company" 
                        name="company_or_brand" 
                        type="text" 
                        placeholder="Acme Corp" 
                        required 
                        value={formData.company_or_brand}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label htmlFor="platform">Primary Channel / Portfolio Link</label>
                      <input 
                        id="platform" 
                        name="channel_or_portfolio" 
                        type="url" 
                        placeholder="https://instagram.com/yourhandle" 
                        required 
                        value={formData.channel_or_portfolio}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="message">Brief Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      placeholder={role === 'brand' ? "Tell us about your brand, timeline, and campaign goals..." : "Tell us about your content vertical and audience..."} 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button 
                    as="button" 
                    type="submit" 
                    variant="primary" 
                    className="btn-primary--blue" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (role === 'brand' ? 'Send Campaign Brief' : 'Submit Creator Application')}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </Section>
    </main>
  );
}
