import { GetServerSidePropsContext } from "next";

type CacheControl = {
  key: string;
  value: string;
};

interface Props {
  generatedAt: string;
  cacheControl: CacheControl;
}

export default function StaleIfError({ cacheControl, generatedAt }: Props) {
  return (
    <>
      <ul>
        <li>
          {cacheControl.key} : {cacheControl.value}
        </li>
        <li>Generated at : {generatedAt}</li>
      </ul>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if(context.query['forced-error']) {
    throw new Error('Error occured!')
    return
  }

  const date = new Date().toString();
  const cacheControl = {
    key: "Cache-Control",
    value: "max-age=0, stale-if-error=60",
  };

  context.res.setHeader(cacheControl.key, cacheControl.value);

  return {
    props: {
      generatedAt: date,
      cacheControl: cacheControl,
    }, // will be passed to the page component as props
  };
}
