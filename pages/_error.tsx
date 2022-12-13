import { GetServerSideProps } from "next";

interface Props {
  generatedAt: string;
}

export default function Error({ generatedAt }: Props) {
  return (
    <>
      <h2>Internal Server Error</h2>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
