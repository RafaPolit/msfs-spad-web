import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/future/image";
import { Layout } from "../components/PageLayout";

const item = "flex relative text-center rounded-lg bg-gray-600 p-2";

const Home: NextPage = () => {
  return (
    <Layout title="MSFS SPAD Web">
      <div className="grid grid-cols-2 lg:grid-cols-4 p-3 gap-4">
        <Link href="/atr" className={item}>
          <Image
            src="/modules/atr-cover.jpg"
            alt="ATR 42-600 / 72-600"
            width="1280"
            height="720"
            priority
          />
          <div className="absolute bottom-4 right-4 font-bold">ATR 42 / 72</div>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
