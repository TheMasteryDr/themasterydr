'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, TrendingUp, DollarSign, Users, Compass, Cpu, ArrowRight, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

interface Dimension {
  id: string;
  roman: string;
  title: string;
  tagline: string;
  leadIcon: React.ReactNode;
  accentColor: string;
  accentGlow: string;
  overview: string;
  coreQuestion: string;
  keyLevers: string[];
  associatedProgram: string;
  associatedLink: string;
}

export default function SixDimensions() {
  const dimensions: Dimension[] = [
    {
      id: 'purpose',
      roman: 'I',
      title: 'Purpose',
      tagline: 'Knowing what you are built to carry.',
      leadIcon: <Target size={22} />,
      accentColor: 'var(--accent-amber)',
      accentGlow: 'var(--accent-amber-glow)',
      overview: 'Purpose is not an abstract mystical concept; it is the strategic recognition of your divine design and earthly stewardship. When a man knows what he is built to carry, trivial distractions lose their gravitational pull.',
      coreQuestion: 'What mandate has God encoded into your design that ignores the noise of ordinary survival?',
      keyLevers: ['Divine Calling Audit', 'Clarity Over Confusion', 'Assignment Identification', 'Long-term Stewardship'],
      associatedProgram: 'Foundations of Personal Mastery',
      associatedLink: '/courses/foundations-of-personal-mastery',
    },
    {
      id: 'personal-growth',
      roman: 'II',
      title: 'Personal Growth',
      tagline: 'Mindset, habits, and daily discipline.',
      leadIcon: <TrendingUp size={22} />,
      accentColor: 'var(--accent-indigo)',
      accentGlow: 'var(--accent-indigo-glow)',
      overview: 'Growth is not an event; it is a discipline. Gain Mastery means consistent growth. We dismantle emotional fluctuation and replace it with repeatable daily architecture that builds capacity before opportunity knocks.',
      coreQuestion: 'Do your current daily habits justify the magnitude of your professed ambition?',
      keyLevers: ['Compounding 1% Daily Systems', 'Identity-Based Habits', 'Cognitive Rigor', 'Emotional Stability'],
      associatedProgram: 'The Bereans Reading Community',
      associatedLink: '/bereans',
    },
    {
      id: 'financial-growth',
      roman: 'III',
      title: 'Financial Growth',
      tagline: 'Real intelligence about capital and markets.',
      leadIcon: <DollarSign size={22} />,
      accentColor: 'var(--accent-emerald)',
      accentGlow: 'var(--accent-emerald-glow)',
      overview: 'Ignorance in the financial sphere guarantees economic vulnerability. We teach practical, rigorous intelligence regarding cash flow allocation, capital preservation, market dynamics, and sustainable wealth architecture.',
      coreQuestion: 'Are you building cash flow systems that outlive physical labor, or simply trading time for currency?',
      keyLevers: ['Capital Allocation Matrix', 'Market Literacy', 'Cash Flow Architecture', 'Generational Preservation'],
      associatedProgram: 'Financial Intelligence Masterclass',
      associatedLink: '/courses/financial-intelligence-market-mastery',
    },
    {
      id: 'leadership',
      roman: 'IV',
      title: 'Leadership',
      tagline: 'Influence, and building things that outlast you.',
      leadIcon: <Users size={22} />,
      accentColor: 'var(--accent-amber)',
      accentGlow: 'var(--accent-amber-glow)',
      overview: 'True leadership is never about authoritarian control; it is the moral authority and systemic competence to mobilize others toward worthy objectives. A leader creates an ecosystem of competence and character.',
      coreQuestion: 'If you stepped away for six months, would the people and systems you lead advance or collapse?',
      keyLevers: ['Moral Authority', 'Institutional Architecture', 'Succession Engineering', 'Vision Transmission'],
      associatedProgram: 'Speaking & Executive Engagements',
      associatedLink: '/speaking',
    },
    {
      id: 'spiritual-growth',
      roman: 'V',
      title: 'Spiritual Growth',
      tagline: 'A disciplined relationship with God.',
      leadIcon: <Compass size={22} />,
      accentColor: 'var(--accent-rose)',
      accentGlow: 'rgba(244, 63, 94, 0.2)',
      overview: 'Spiritual grounding is the anchor that prevents high-achieving builders from shipwrecking on the reefs of pride. Grounded in a sincere Christian worldview, spiritual growth aligns human labor with eternal significance.',
      coreQuestion: 'Is your inner devotional life strong enough to sustain the weight of your public visibility?',
      keyLevers: ['Contemplative Solitude', 'Biblical Coordinates', 'Character Tested in Secret', 'Spiritual Discernment'],
      associatedProgram: 'Mighty Men of Mastery',
      associatedLink: '/initiatives/mighty-men-of-mastery',
    },
    {
      id: 'strategy',
      roman: 'VI',
      title: 'Strategy',
      tagline: 'Clear thinking, systems, and sharper decisions.',
      leadIcon: <Cpu size={22} />,
      accentColor: 'var(--accent-cyan)',
      accentGlow: 'rgba(6, 182, 212, 0.2)',
      overview: 'Without strategy, energy is dissipated without impact. We provide rigorous frameworks for high-leverage decision models, organizational alignment, tactical execution, and strategic pivots under pressure.',
      coreQuestion: 'Are you working on the right leverage points, or merely executing low-value tasks with intense energy?',
      keyLevers: ['Decision Models', 'Execution Velocity', 'System Redundancy', 'Adaptive Strategy'],
      associatedProgram: 'Six Dimensions Strategic Executive',
      associatedLink: '/courses/six-dimensions-strategic-growth',
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('purpose');
  const active = dimensions.find(d => d.id === activeTab) || dimensions[0];

  return (
    <section id="framework" className="site-section framework-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header">
          <span className="pill-badge amber">
            <Sparkles size={12} /> Proprietary Intellectual Framework
          </span>
          <h2>The Six Dimensions of Mastery</h2>
          <p>
            An interconnected architectural blueprint engineered to move individuals from ignorance and stagnation toward multidimensional competence and sovereign impact.
          </p>
        </div>

        {/* Interactive Tabs Header */}
        <div className="dimension-tabs-nav">
          {dimensions.map(dim => {
            const isSelected = dim.id === active.id;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveTab(dim.id)}
                className={`tab-btn ${isSelected ? 'active' : ''}`}
                style={{
                  '--dim-accent': dim.accentColor,
                  '--dim-glow': dim.accentGlow,
                } as React.CSSProperties}
              >
                <div className="tab-icon-wrap">
                  {dim.leadIcon}
                </div>
                <div className="tab-meta">
                  <span className="tab-roman">Dimension {dim.roman}</span>
                  <span className="tab-title">{dim.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Bento Stage */}
        <div className="bento-stage">
          {/* Main Left Stage Card */}
          <div className="stage-main-card">
            <div className="stage-top-meta">
              <span className="stage-pill" style={{ color: active.accentColor, borderColor: active.accentColor }}>
                Dimension {active.roman} &bull; {active.title}
              </span>
              <div className="stage-icon-badge" style={{ color: active.accentColor }}>
                {active.leadIcon}
              </div>
            </div>

            <h3 className="stage-headline">{active.tagline}</h3>
            <p className="stage-overview">{active.overview}</p>

            {/* Core Strategic Question Callout */}
            <div className="core-question-callout">
              <div className="cq-header">
                <HelpCircle size={15} style={{ color: active.accentColor }} />
                <span>Core Strategic Question</span>
              </div>
              <p className="cq-quote">&ldquo;{active.coreQuestion}&rdquo;</p>
            </div>
          </div>

          {/* Right Bento Column */}
          <div className="stage-side-col">
            {/* Key Levers Card */}
            <div className="side-bento-card">
              <span className="card-subhead">Key Execution Levers</span>
              <div className="levers-chips-grid">
                {active.keyLevers.map((lever, i) => (
                  <div key={i} className="lever-chip">
                    <CheckCircle2 size={13} style={{ color: active.accentColor }} />
                    <span>{lever}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Track Link Card */}
            <div className="side-bento-card track-card">
              <div className="track-info">
                <span className="card-subhead">Implementation Track</span>
                <h4 className="track-title">{active.associatedProgram}</h4>
                <p className="track-desc">
                  Accelerate this dimension through structured curriculum and mentorship inside Gain Mastery Institute.
                </p>
              </div>
              <Link href={active.associatedLink} className="btn btn-primary btn-sm btn-pill" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
                Explore Curriculum <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* 6-Card Overview Grid Below */}
        <div className="all-dimensions-grid">
          {dimensions.map(dim => (
            <div 
              key={dim.id} 
              className={`dim-grid-card ${dim.id === active.id ? 'highlighted' : ''}`}
              onClick={() => setActiveTab(dim.id)}
            >
              <div className="dgc-top">
                <span className="dgc-roman">{dim.roman}</span>
                <div className="dgc-icon">{dim.leadIcon}</div>
              </div>
              <h4 className="dgc-title">{dim.title}</h4>
              <p className="dgc-tagline">{dim.tagline}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .framework-section {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        /* Dimension Tabs Navigation */
        .dimension-tabs-nav {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          margin-bottom: 32px;
        }
        .tab-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }
        .tab-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-glass-hover);
          transform: translateY(-2px);
        }
        .tab-btn.active {
          background: var(--bg-card-hover);
          border-color: var(--dim-accent);
          box-shadow: 0 0 20px var(--dim-glow);
        }
        .tab-icon-wrap {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .tab-btn.active .tab-icon-wrap {
          color: var(--dim-accent);
        }
        .tab-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tab-roman {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .tab-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Bento Stage */
        .bento-stage {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
          margin-bottom: 36px;
        }
        .stage-main-card {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .stage-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .stage-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border: 1px solid currentColor;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.03);
        }
        .stage-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stage-headline {
          font-size: clamp(26px, 3.2vw, 38px);
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 18px;
        }
        .stage-overview {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .core-question-callout {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-left: 3px solid var(--accent-amber);
          border-radius: var(--radius-md);
          padding: 20px 24px;
        }
        .cq-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .cq-quote {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.6;
        }

        /* Right Bento Column */
        .stage-side-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .side-bento-card {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-subhead {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 16px;
          display: block;
        }
        .levers-chips-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lever-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          color: var(--text-primary);
        }
        .track-card {
          border-color: var(--border-accent);
          background: linear-gradient(145deg, var(--bg-card) 0%, rgba(245, 158, 11, 0.04) 100%);
        }
        .track-title {
          font-size: 19px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .track-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* 6-Card Overview Grid */
        .all-dimensions-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }
        .dim-grid-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px 16px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dim-grid-card:hover {
          border-color: var(--border-glass-hover);
          transform: translateY(-2px);
        }
        .dim-grid-card.highlighted {
          border-color: var(--accent-amber);
          background: rgba(245, 158, 11, 0.05);
        }
        .dgc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .dgc-roman {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }
        .dgc-icon {
          color: var(--accent-amber);
        }
        .dgc-title {
          font-size: 15px;
          margin-bottom: 6px;
        }
        .dgc-tagline {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .dimension-tabs-nav {
            grid-template-columns: repeat(3, 1fr);
          }
          .bento-stage {
            grid-template-columns: 1fr;
          }
          .all-dimensions-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .dimension-tabs-nav {
            grid-template-columns: repeat(2, 1fr);
          }
          .stage-main-card {
            padding: 28px 20px;
          }
          .all-dimensions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
