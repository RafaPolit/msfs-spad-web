import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { GiCommercialAirplane } from "react-icons/gi";

import { spadConfigAtom } from "../recoilAtoms/spadConfigAtom";
import { Layout } from "../components/PageLayout";
import { getSpadServerSideProps } from "../scripts/getSpadServerSideProps";

import {
  challenge,
  challengeAccept,
  testConnection,
  testConnectionOnLoad,
} from "../scripts/spadConfigUtils";

const homeClass = "inline-block text-4xl mx-2 px-4 pt-1";
const item = "flex relative text-center rounded-lg bg-gray-600 p-2";

const getServerSideProps = getSpadServerSideProps;

const SpadConfig = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [spadConfig, setSpadConfig] = useRecoilState(spadConfigAtom);
  const [challengeStatus, setChallengeStatus] = useState(0);
  const [aircraft, setAircraft] = useState("");
  const [goodRemoteConfig, setGoodRemoteConfig] = useState(false);
  const [stored, setStored] = useState(false);
  const [error, setError] = useState("");

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, address: e.target.value }));
  };

  const changePort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, port: e.target.value }));
  };

  const changeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, token: e.target.value }));
  };

  const clickChallenge = async () =>
    await challenge(spadConfig, setChallengeStatus, setError);

  const clickChallengeAccept = async () =>
    await challengeAccept(spadConfig, setSpadConfig, setError);

  const clickTestConnection = async () =>
    await testConnection(spadConfig, setAircraft, setStored, setError);

  useEffect(() => {
    if (data.remoteHost) {
      const remoteHost = data.remoteHost.slice(0, -1);
      const address = remoteHost.split(":").slice(0, -1).join(":");
      const port = remoteHost.split(":")[2];
      setSpadConfig((oldValues) => ({ ...oldValues, address, port }));
    }

    if (data.apiKey) {
      const apiKey = data.apiKey;
      setSpadConfig((oldValues) => ({ ...oldValues, apiKey }));
    }

    if (data.remoteHost && data.apiKey) {
      testConnectionOnLoad(data, setGoodRemoteConfig, setAircraft, setError);
    }
  }, [data, setSpadConfig, setGoodRemoteConfig, setAircraft, setError]);

  return (
    <Layout title="SPAD config">
      <div>
        <ul className="flex flex-wrap text-md font-medium text-center text-neutral-200 pt-1 px-2 mb-1 bg-black">
          <li>
            <Link href="/" className={homeClass}>
              <GiCommercialAirplane />
            </Link>
          </li>
        </ul>
      </div>
      <div className=" max-w-[800px] mx-auto">
        <div className="p-4">
          <h2 className="text-xl pb-4">SPAD.neXt Configuration</h2>
          <div className="flex flex-row">
            <div className="flex flex-1 flex-col">
              <label htmlFor="spadAddress-input" className="cursor-pointer">
                Address:
              </label>
              <input
                type="text"
                className="form-input px-4 py-3 m-2 mb-4 text-black rounded-full"
                id="spadAddress-input"
                name="spadAddress"
                defaultValue={spadConfig.address}
                onChange={changeAddress}
              ></input>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="spadToken-input" className="cursor-pointer">
                Port:
              </label>
              <input
                type="text"
                className="form-input px-4 py-3 m-2 mb-4 text-black rounded-full"
                id="spadToken-input"
                name="spadToken"
                defaultValue={spadConfig.port}
                onChange={changePort}
              ></input>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            {!spadConfig.apiKey && challengeStatus === 0 && (
              <>
                <label htmlFor="spadPort-input" className="cursor-pointer">
                  Challenge SPAD.neXt:
                </label>
                <div className="flex flex-row gap-2 m-2 mb-4">
                  <button
                    className="flex-1 bg-slate-500 px-5 py-3 rounded-full"
                    onClick={clickChallenge}
                  >
                    <b>Challenge</b>
                  </button>
                </div>
              </>
            )}
            {!spadConfig.apiKey && challengeStatus === 1 && (
              <>
                <label htmlFor="spadPort-input" className="cursor-pointer">
                  Challenge Code (should be displayed in SPAD.neXt main screen):
                </label>
                <div className="flex flex-row gap-2 m-2 mb-4">
                  <input
                    type="text"
                    className="flex-1 form-input px-4 py-3 text-black rounded-full"
                    id="spadPort-input"
                    name="spadPort"
                    defaultValue={spadConfig.token}
                    onChange={changeToken}
                  ></input>
                  <button
                    className="bg-slate-500 px-5 py-3 rounded-full"
                    onClick={clickChallengeAccept}
                  >
                    <b>Submit Token</b>
                  </button>
                </div>
              </>
            )}
            {spadConfig.apiKey && (
              <div className="flex flex-1 flex-col mx-2">
                <button
                  className="bg-slate-500 px-5 py-3 rounded-full"
                  onClick={clickTestConnection}
                >
                  <b>Test SPAD.neXt connection</b>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-row text-xl">
            <span>
              Aircraft: <b>{aircraft}</b>
            </span>
          </div>
          <div className="flex flex-row text-lg">
            <p>
              ApiKey: <span>{spadConfig.apiKey}</span>
              {stored ? <span> | Credentials stored in Database</span> : null}
              {goodRemoteConfig ? (
                <span> | Remote config appears to be Good!</span>
              ) : null}
            </p>
          </div>
          <div className="flex flex-row text-lg">
            <p>
              Error:{" "}
              {error ? (
                <span className="text-red-600">{error}</span>
              ) : (
                <span className="text-gray-500">none</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpadConfig;

export { getServerSideProps };
