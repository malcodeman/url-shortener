import type { GetServerSideProps, NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import { inc } from "ramda";

import NotFound from "../components/NotFound";

const Url: NextPage = () => {
  return <NotFound />;
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
        await prisma.url.update({
          where: {
            id,
          },
          data: {
            clicks: inc(url.clicks),
          },
        });
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
