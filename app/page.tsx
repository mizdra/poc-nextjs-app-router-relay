export default async function Home() {
  const data = await fetch(`${process.env.API_ENDPOINT}/api/hello`);
  return <main>{await data.text()}</main>;
}
