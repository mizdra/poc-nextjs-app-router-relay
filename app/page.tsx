import Image from 'next/image';

export default async function Home() {
  const helloData = await fetch(`${process.env.API_ENDPOINT}/api/hello`);
  const imageData = await fetch(`${process.env.API_ENDPOINT}/api/image`);
  return (
    <main>
      <div>{await helloData.text()}</div>
      <div>
        <Image src={await imageData.json()} alt="JavaScript Logo" />
      </div>
    </main>
  );
}
