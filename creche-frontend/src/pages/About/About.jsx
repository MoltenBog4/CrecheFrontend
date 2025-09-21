import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <main className={styles.aboutPage}>

      {/* INTRO SECTION */}
      <section className={styles.splitSection}>
        <div className={styles.textBlock}>
          <h1>About Little Gems</h1>
          <h4>Special Needs Care Facility</h4>
          <p>
            We are special, unique and (we think) amazing! All our children are valued and are supported yet challenged to develop their knowledge.
            Skills in our residential programme. We offer weekly, full time and respite care with a focus on stimulation, decision making skills and valuing each individual.
          </p>
          <p>
            We aim to help our children grow in confidence as they acquire skills that support their independence, health and self-esteem.
            We aim to build their self-confidence, self-care and independence.
          </p>
          <a href="https://wa.me/" className={styles.greenBtn}>WhatsApp Us</a>
        </div>
        <div className={styles.imageShape}>
          <img src="/images/img1.png" alt="about child" />
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className={styles.splitSection}>
        <div className={styles.imageShape}>
          <img src="/images/img2.png" alt="child smiling" />
        </div>
        <div className={styles.textBlock}>
          <h2>What We Do</h2>
          <h4>Our Aim Is To</h4>
          <p>
            Create an environment that ensures and promotes the well-being of each individual in a safe and secure setting
            in which they can live, work and develop their potential.
          </p>
          <p>
            Little Gems is passionate about offering the latest up-to-date staff training to be able to offer the highest quality of care.
          </p>
          <p>
            We have partnered with Erudite Projects in ensuring that families who cannot afford the fees have an opportunity to get funding.
          </p>
          <a href="tel:+1234567890" className={styles.greenBtn}>Call Us Now</a>
        </div>
      </section>

      {/* APPROACH - FACILITIES - PARTNERSHIPS */}
      <section className={styles.threeCol}>
        <div className={styles.colCard}>
          <img src="/images/img3.png" alt="approach" />
          <h3>Our Approach</h3>
          <p>
            Our approach is holistic and multidisciplinary. We conduct assessments to understand each child's strengths and needs,
            leading to personalized education and care plans by our experienced team.
          </p>
        </div>
        <div className={styles.colCard}>
          <img src="/images/img4.png" alt="facilities" />
          <h3>Facilities</h3>
          <p>
            We offer a sensory room, outdoor play areas, therapy spaces and a garden.
            Our therapies support development across physical, speech, and behavioral domains.
          </p>
        </div>
        <div className={styles.colCard}>
          <img src="/images/img5.png" alt="partnerships" />
          <h3>Partnerships</h3>
          <p>
            We ensure access to care through funding partners.
            Families in need can receive essential services and support through our programs and donations.
          </p>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className={styles.teamSection}>
        <h2 className={styles.teamHeading}>Meet Our Team</h2>
        <p className={styles.teamSub}>The Passionate People That Care For Our Children</p>

        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <img src="/images/team1.png" alt="Nick Fernandes" />
            <h3>Nick Fernandes</h3>
            <p>Director</p>
            <p>
              Nick has a background in Psychology and education. He directs the running of the centre and ensures that legislative and Care Goals are reached.
            </p>
            <a href="mailto:nick@example.com" className={styles.greenBtn}>Email Nick</a>
          </div>

          <div className={styles.teamCard}>
            <img src="/images/team2.png" alt="Cannelle De Ruig" />
            <h3>Cannelle De Ruig</h3>
            <p>Manager</p>
            <p>
              Cannelle manages the internal workings of the center daily, solving staffing issues and ensuring the children receive the best care possible.
            </p>
            <a href="mailto:cannelle@example.com" className={styles.greenBtn}>Email Cannelle</a>
          </div>

          <div className={styles.teamCard}>
            <img src="/images/team3.png" alt="Innocent Chakandinakira" />
            <h3>Innocent Chakandinakira</h3>
            <p>Nursing Manager</p>
            <p>
              Innocent ensures medical needs and day-to-day care are handled expertly. He is a vital part of the sleep-in team.
            </p>
            <a href="mailto:innocent@example.com" className={styles.greenBtn}>Email Innocent</a>
          </div>
        </div>
      </section>
    </main>
  );
}
