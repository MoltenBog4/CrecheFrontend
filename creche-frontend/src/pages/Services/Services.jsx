import React from 'react';
import styles from './Services.module.css';

export default function Services() {
  return (
    <main className={styles.servicesPage}>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Our Services</h1>
          <p>
            We provide enriching, nurturing, and inclusive early learning experiences tailored for every child.
          </p>
        </div>
        <div className={styles.heroImage}>
          <img src="/images/img1.png" alt="Children learning" />
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className={styles.offerings}>
        <h2>What We Offer</h2>
        <ul>
          <li>🧠 Early Literacy Pods</li>
          <li>🎨 Creative Arts</li>
          <li>🕓 After-Care</li>
          <li>🧩 Sensory & Play Therapy</li>
          <li>🍎 Healthy Meals & Snacks</li>
          <li>🌳 Outdoor Adventure Zones</li>
        </ul>
      </section>

      {/* SERVICE DETAIL LAYER */}
      <section className={styles.detailedServices}>
        <div className={styles.serviceBlock}>
          <img src="/images/img3.png" alt="Creative arts" />
          <div>
            <h3>Creative Arts & Expression</h3>
            <p>
              Daily opportunities to explore painting, music, dance, storytelling and crafts. We nurture creativity while
              building confidence and motor skills.
            </p>
          </div>
        </div>
        <div className={styles.serviceBlock}>
          <img src="/images/img4.png" alt="Therapy session" />
          <div>
            <h3>Therapy & Sensory Support</h3>
            <p>
              We offer access to physical, occupational, and speech therapy tailored to each child’s needs. Our sensory
              spaces are calming and development-focused.
            </p>
          </div>
        </div>
        <div className={styles.serviceBlock}>
          <img src="/images/img6.png" alt="Outdoor play" />
          <div>
            <h3>Safe Outdoor Adventures</h3>
            <p>
              Secure outdoor environments including gardens, bikes, climbing frames and water play areas—perfect for
              exploring safely and building social skills.
            </p>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL LAYER */}
      <section className={styles.educationalLayer}>
        <h2>🌱 Did You Know?</h2>
        <p>
          Research shows that children who engage in structured early learning programs develop stronger cognitive,
          social, and emotional skills. At Little Gems, our programs are designed based on evidence-based practices to
          stimulate brain development and support each child’s individual pace and interests.
        </p>
        <img src="/images/img8.png" alt="Educational Infographic" />
      </section>

      {/* BLOG SECTION */}
      <section className={styles.blogHighlight}>
        <div className={styles.blogContent}>
          <h2>🌈 Featured from Our Blog</h2>
          <p>
            Discover parenting tips, developmental milestones, and activity ideas to try at home. Empower your child’s
            journey with expert guidance.
          </p>
          <a className={styles.primaryBtn} href="/blog">Read Our Blog</a>
        </div>
        <div className={styles.blogImage}>
          <img src="/images/img5.png" alt="Parenting tips" />
        </div>
      </section>

      {/* CTA / EXTRA SECTION */}
      <section className={styles.ctaLayer}>
        <h2>🌟 Want to Learn More?</h2>
        <p>
          Schedule a tour or speak with a team member today. We're happy to answer any questions and guide you through
          our enrollment process.
        </p>
        <a className={styles.secondaryBtn} href="/contact">Contact Us</a>
      </section>

    </main>
  );
}
