import type { GetServerSideProps, NextPage } from "next";
import { PrismaClient } from "@prisma/client";

const Url: NextPage = () => {
  return <div>404</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const prisma = new PrismaClient();

  if (typeof id === "string") {
    try {
      await prisma.$connect();
      const url = await prisma.url.findUnique({
        where: {
          id,
        },
      });
      if (url) {
        return {
          redirect: {
            destination: url.originalUrl,
            permanent: false,
          },
        };
      }
      return { props: {} };
    } catch {
      return { props: {} };
    }
  }
  return { props: {} };
};

export default Url;
