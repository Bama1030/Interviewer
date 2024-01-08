import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

export async function POST(request) {
  const body = await request.json();
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'echo',
    input: body.text,
});

  // response.stream_to_file("output.mp3")
  const buffer = Buffer.from(await mp3.arrayBuffer());

  return new Response(buffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
}
