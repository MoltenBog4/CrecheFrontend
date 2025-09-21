import React from 'react';
import styles from './Home.module.css';
import useReveal from '../../../hooks/useReveal.js';
import Newsletter from '../../components/Newsletter/SubscribeForm.jsx';


function AnimatedText({ as: Tag = 'h1', text, className = '', delay = 28 }) {
  const chars = Array.from(text);
  return (
    <Tag className={`${className} ${styles.animatedWrap}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={styles.animatedChar}
          style={{ animationDelay: `${i * delay}ms`, whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  );
}

// ✅ Use local images from /public/images/
const heroImg       = '/images/img.png';
const svc1Img       = '/images/img1.png';
const svc2Img       = '/images/img2.png';
const svc3Img       = '/images/img3.png';
const svc4Img       = '/images/img4.png';
const svc5Img       = '/images/img5.png';
const svc6Img       = '/images/img6.png';
const whyArtImg     = '/images/img2.png';
const facility1Img  = '/images/img3.png';
const facility2Img  = '/images/img4.png';
const facility3Img  = '/images/img5.png';
const facility4Img  = '/images/img6.png';
const whatWeDoImg   = '/images/img2.png';

export default function Home({ onOpenSubscribe }) {
  useReveal();

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero} data-reveal data-effect="fade-up" data-replay>
        <div className={styles.heroText}>
          <div className={styles.kicker}>
            <span role="img" aria-label="smile">👶</span> Welcome to Little Einsteins Crèche
          </div>
          <AnimatedText
            as="h1"
            className={styles.title}
            text={`Early childhood education and care, reimagined with love 💜`}
            delay={22}
          />
          <div className={styles.ctaRow} data-reveal data-effect="scale" data-replay>
            <button className={styles.primary} onClick={onOpenSubscribe}>Subscribe</button>
            <a className={styles.ghost} href="/contact">Contact us</a>
          </div>
        </div>
        <div className={styles.heroArt} data-reveal data-effect="fade-left" data-replay>
          <div className={styles.blobBack} />
          <div className={styles.photo} style={{ backgroundImage: `url('${heroImg}')` }} />
          <div className={styles.blobFront} />
        </div>
      </section>

      {/* STATS */}
      <section className={styles.stats} data-reveal data-effect="fade-up" data-stagger="120" data-replay>
        <div className={styles.stat}><span>27</span> Years Experience</div>
        <div className={styles.stat}><span>6</span> Educators</div>
        <div className={styles.stat}><span>450</span> Children Helped</div>
        <div className={styles.stat}><span>7600</span> Smiles</div>
      </section>

      {/* SERVICES */}
      <section className={styles.services} data-reveal data-effect="fade-up" data-replay>
        <h2 className={styles.h2}>Our Services</h2>
        <p className={styles.sub}>We Offer The Best Possible Early Learning & Care Services</p>

        <div className={styles.cards} data-reveal data-stagger="100" data-replay>
          {[svc1Img, svc2Img, svc3Img, svc4Img, svc5Img, svc6Img].map((img, index) => {
            const titles = [
              "Learning Center", "Day Care Program", "After-Care",
              "Creative Arts", "Outdoor Play", "Healthy Meals"
            ];
            const descriptions = [
              "Small groups, play-based literacy and multi-sensory lessons that build knowledge and confidence.",
              "Stimulating, supportive setting with individual plans—helping each child reach their full potential.",
              "Safe afternoons with snacks, outdoor play and quiet time for reading or crafts.",
              "Daily music, movement, drawing and crafts to spark imagination and strengthen fine-motor skills.",
              "Secure play spaces with bikes, sand, water tables and group games that build coordination and teamwork.",
              "Nutritious, kid-approved menus with fresh fruit and veggies; we support allergies and special diets."
            ];
            return (
              <article className={styles.card} key={index}>
                <div className={styles.cardImg} style={{ backgroundImage: `url('${img}')` }} />
                <h3>{titles[index]}</h3>
                <p>{descriptions[index]}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.servicesCta} data-reveal data-effect="fade-up" data-replay>
          <a className={styles.secondary} href="/services">Explore all services</a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.layerPurple} data-reveal data-effect="fade-up" data-replay>
        <div className={styles.layerInner}>
          <div className={styles.layerArt} style={{ backgroundImage: `url('${whyArtImg}')` }} />
          <div className={styles.layerCopy}>
            <h2 className={styles.h2Alt}>Why Choose Us</h2>
            <p className={styles.leadAlt}>
              A warm, safe space where children grow confidence, curiosity and a love for learning.
            </p>
            <ul className={styles.bullets}>
              <li>Play-based literacy with measurable growth</li>
              <li>Small groups and attentive educators</li>
              <li>Daily creativity, movement and outdoor time</li>
            </ul>
            <a className={styles.secondary} href="/about">Learn more</a>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className={styles.facilities} data-reveal data-effect="rotate" data-replay>
        <div className={styles.facilitiesCopy}>
          <h2 className={styles.h2}>Our Facilities</h2>
          <p className={styles.lead}>
            Sunlit classrooms, safe outdoor areas and sensory corners designed for joyful learning.
          </p>
        </div>
        <div className={styles.collage} data-reveal data-stagger="120" data-replay>
          <div className={styles.tile} style={{ backgroundImage: `url('${facility1Img}')` }} />
          <div className={styles.tile} style={{ backgroundImage: `url('${facility2Img}')` }} />
          <div className={styles.tileTall} style={{ backgroundImage: `url('${facility3Img}')` }} />
          <div className={styles.tileWide} style={{ backgroundImage: `url('${facility4Img}')` }} />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className={styles.split} data-reveal data-effect="fade-right" data-replay>
        <div className={styles.splitArt}>
          <div className={styles.pill} />
          <div className={styles.photo2} style={{ backgroundImage: `url('${whatWeDoImg}')` }} />
        </div>
        <div className={styles.splitText}>
          <h2 className={styles.h2}>What We Do</h2>
          <p className={styles.lead}>
            Your child’s health and well-being are our top priority. Each learner follows a tailored plan with playful
            literacy, creativity and movement.
          </p>
          <p>
            Our comprehensive program combines education, care and exploration. Children grow independence, self-esteem
            and a love for learning in a joyful environment.
          </p>
          <a className={styles.primary} href="/contact">Email us now</a>
        </div>
      </section>



    </main>
  );
}
