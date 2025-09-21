import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <main className={styles.contactPage}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>Get in Touch</h1>
          <p>We’d love to hear from you. Whether you’re a parent, supporter, or just curious—reach out!</p>
        </div>
      </section>

      {/* MAP + CONTACT INFO */}
      <section className={styles.mapSection}>
        <div className={styles.mapWrapper}>
          <iframe
            title="Little Gems Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.240249103365!2d31.07120321467333!3d-29.7271819820025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7063b234e317f%3A0xa05850dfae0c2b3a!2sUmhlanga%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1695399038355"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className={styles.contactInfo}>
          <h2>📍 Visit Us</h2>
          <p>123 Crèche Lane, Umhlanga, KwaZulu-Natal, South Africa</p>
          <h3>📞 Call</h3>
          <p>(+27) 31 123 4567</p>
          <h3>📧 Email</h3>
          <p>hello@littlegemscreche.com</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className={styles.formSection}>
        <h2>Send Us a Message</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* EXTRA CONTACT OPTIONS */}
      <section className={styles.extraContact}>
        <h2>Prefer to Connect Another Way?</h2>
        <p>We’re always available on messaging platforms and happy to arrange a personal visit!</p>
        <div className={styles.buttonRow}>
          <a
            href="https://wa.me/27311234567"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outlineBtn}
          >
            💬 WhatsApp Us
          </a>
          <a href="/contact/visit" className={styles.outlineBtn}>
            📅 Schedule a Visit
          </a>
        </div>
      </section>
    </main>
  );
}
