import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AnimatedText.module.css';

/**
 * AnimatedText
 * props:
 *  - text: string (required)
 *  - as:   'h1' | 'h2' | 'p' | 'span' (default 'h2')
 *  - mode: 'chars' | 'words' | 'lines' (default 'chars')
 *  - effect: 'rise' | 'slide' | 'blur' | 'pop' (default 'rise')
 *  - delay: number (ms per item, default 35)
 *  - once: boolean – animate only when first visible (default true)
 */
export default function AnimatedText({
  text,
  as = 'h2',
  mode = 'chars',
  effect = 'rise',
  delay = 35,
  once = true,
  className = '',
  ...rest
}) {
  const Tag = as;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.2, rootMargin: '60px' }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const parts = useMemo(() => {
    if (mode === 'words') return text.split(/(\s+)/);
    if (mode === 'lines') {
      // A naive line splitter; for better accuracy, pass line breaks in text.
      return text.split(/\n/).flatMap((l, i, arr) => (i < arr.length - 1 ? [l, '\n'] : [l]));
    }
    // chars
    return Array.from(text);
  }, [text, mode]);

  return (
    <Tag
      ref={ref}
      className={`${styles.wrap} ${styles[effect]} ${inView ? styles.in : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {parts.map((p, i) => {
        const isSpace = p === ' ';
        const isBreak = p === '\n';
        if (isBreak) return <br key={`br-${i}`} />;
        return (
          <span
            key={i}
            className={isSpace ? styles.space : styles.item}
            style={{ '--i': i }}
            aria-hidden={false}
          >
            {p}
          </span>
        );
      })}
      {/* accessible full text for screen readers */}
      <span className={styles.srOnly}>{text}</span>
    </Tag>
  );
}
