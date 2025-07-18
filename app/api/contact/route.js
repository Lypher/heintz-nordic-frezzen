import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Usa la API key proporcionada por el usuario
const resend = new Resend('29f1d4fa-e16e-4f85-b683-c39c18a88159');

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, lastname, email, phone, country, residence, language, mode } = formData;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Navn og email er påkrævet.' }, { status: 400 });
    }

    const html = `
      <h1>Ny kontaktbesked</h1>
      <p><strong>Navn:</strong> ${name}</p>
      <p><strong>Efternavn:</strong> ${lastname || ''}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || ''}</p>
      <p><strong>Land (oprindelse):</strong> ${country || ''}</p>
      <p><strong>Land (bopæl):</strong> ${residence || ''}</p>
      <p><strong>Sprog:</strong> ${language || ''}</p>
      <p><strong>Kontaktform:</strong> ${mode || ''}</p>
    `;

    const data = await resend.emails.send({
      from: 'kontakt@heintz-nordic-frezzen.dk',
      to: ['tih@buxmind.com'],
      subject: 'Ny kontaktbesked fra hjemmesiden',
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const err = error instanceof Error ? error : { message: String(error) };
    return NextResponse.json({ success: false, error: 'Noget gik galt. Prøv igen senere.', details: err.message }, { status: 500 });
  }
} 