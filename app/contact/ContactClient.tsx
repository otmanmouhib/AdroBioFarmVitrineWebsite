'use client';

import { useState } from 'react';
import type { EnterpriseInfo } from '../../data/enterprise';

type ContactClientProps = {
  enterpriseInfo: EnterpriseInfo;
};

export default function ContactClient({ enterpriseInfo }: ContactClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body?.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setStatus('success');
    } catch {
      setError('Impossible d’envoyer le message pour le moment.');
      setStatus('error');
    }
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="sectionIntro">
            <p className="eyebrow">Contact</p>
            <h1>Contactez {enterpriseInfo.companyName}</h1>
            <p className="intro">
              Pour commander, réserver un séjour, organiser une formation ou en savoir plus sur nos activités, envoyez-nous un message.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contactGrid">
          <div className="contactCard contactDetails">
            <div className="contactDetailHeader">
              <p className="eyebrow">Nous sommes à votre écoute</p>
              <h2>Échangez avec une équipe réactive et engagée</h2>
              <p className="sectionLead">
                Nos réponses sont claires, simples et orientées vers votre projet : production, formation, accueil ou événement.
              </p>
            </div>

            <div className="contactMetaGrid">
              <div className="contactMetaItem">
                <span>📧</span>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${enterpriseInfo.email}`}>{enterpriseInfo.email}</a></p>
                </div>
              </div>

              <div className="contactMetaItem">
                <span>📞</span>
                <div>
                  <strong>Téléphone</strong>
                  <p><a href={`tel:${enterpriseInfo.phone}`}>{enterpriseInfo.phone}</a></p>
                </div>
              </div>

              <div className="contactMetaItem">
                <span>📍</span>
                <div>
                  <strong>Adresse</strong>
                  <p>{enterpriseInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="contactHelp">
              <h3>Pourquoi nous écrire ?</h3>
              <ul>
                <li>Réserver des produits fermiers et des paniers</li>
                <li>Demander un devis ou un accompagnement agricole</li>
                <li>Organiser une formation, un atelier ou un séjour</li>
                <li>Proposer un projet collaboratif ou une résidence</li>
              </ul>
            </div>
          </div>

          <form className="contactCard contactForm" onSubmit={handleSubmit}>
            <div className="contactFormHeader">
              <p className="eyebrow">Formulaire de contact</p>
              <h2>Écrivez-nous, nous vous accompagnons</h2>
              <p className="formHint">Toutes les demandes sont traitées avec soin et discrétion.</p>
            </div>

            <label>
              Nom complet
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Votre nom"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="votre@email.com"
              />
            </label>

            <label>
              Sujet
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Objet du message"
              />
            </label>

            <label>
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                placeholder="Votre message"
                rows={6}
              />
            </label>

            {status === 'success' && (
              <p className="formNotice success">Merci ! Votre message a bien été envoyé.</p>
            )}
            {status === 'error' && <p className="formNotice error">{error}</p>}

            <button type="submit" className="button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
            </button>

            <p className="contactFormNote">Nous répondons sous 48 heures ouvrées et traitons vos demandes avec priorité.</p>
          </form>
        </div>
      </section>

      <section className="section highlight">
        <div className="container">
          <h2>Disponible pour votre projet</h2>
          <p>Nous serons heureux de vous accompagner dans votre démarche durable et pédagogique.</p>
          <p className="intro">Contact direct : <a href={`mailto:${enterpriseInfo.email}`}>{enterpriseInfo.email}</a></p>
        </div>
      </section>
    </main>
  );
}
