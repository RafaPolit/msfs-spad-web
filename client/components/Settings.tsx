import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { spadConfigState } from "../atoms/spadConfig";

type SettingsProps = {
  module: string;
};

const Settings = ({ module }: SettingsProps) => {
  const setSpadConfig = useSetRecoilState(spadConfigState);
  const spadConfig = useRecoilValue(spadConfigState);
  const [challengeStatus, setChallengeStatus] = useState(0);
  const [aircraft, setAircraft] = useState("");

  const connect = async () => {
    try {
      // Do some test HTTP request
    } catch (e) {
      console.log(e);
      // Alert of failure
    }
  };

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, address: e.target.value }));
  };

  const changePort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, port: e.target.value }));
  };

  const changeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpadConfig((oldValues) => ({ ...oldValues, token: e.target.value }));
  };

  const fetchChallenge = async () => {
    const response = await fetch(
      `http://${spadConfig.address}:${spadConfig.port}/api/Challenge`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status !== 204) {
      throw new Error("Failed to fetch data");
    }

    return 1;
  };

  const challengeSpad = async () => {
    const fetchedData = await fetchChallenge();
    setChallengeStatus(fetchedData);
  };

  const fetchApiKey = async () => {
    const response = await fetch(
      `http://${spadConfig.address}:${spadConfig.port}/api/ChallengeAccept`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: spadConfig.token }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  };

  const getApiKey = async () => {
    const fetchedData = await fetchApiKey();
    console.log(fetchedData);

    if (!fetchedData.Success) {
      setChallengeStatus(0);
      return;
    }

    setChallengeStatus(fetchedData.Result.ApiKey);
  };

  const fetchAircraft = async () => {
    const response = await fetch(
      `http://${spadConfig.address}:${spadConfig.port}/api/DataGet`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: spadConfig.token }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  };

  const testConnection = async () => {
    const fetchedData = await fetchAircraft();
    setAircraft(fetchedData.result.value);
  };

  return (
    <div>
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
            <label htmlFor="spadPort-input" className="cursor-pointer">
              Port:
            </label>
            <input
              type="text"
              className="form-input px-4 py-3 m-2 mb-4 text-black rounded-full"
              id="spadPort-input"
              name="spadPort"
              defaultValue={spadConfig.port}
              onChange={changePort}
            ></input>
          </div>
        </div>
        <div className="mb-4">
          <p>
            <span className="text-gray-400">Config:&nbsp;</span>
            {spadConfig.address}:{spadConfig.port}
          </p>
        </div>
        <div className="flex flex-row mb-4">
          {challengeStatus === 0 && (
            <div className="flex flex-1 flex-col">
              <button
                className="bg-slate-500 px-5 py-3 rounded-full"
                onClick={async () => await challengeSpad()}
              >
                <b>Challenge SPAD.neXt</b>
              </button>
            </div>
          )}
          {challengeStatus === 1 && (
            <div className="flex flex-1 flex-col">
              <label htmlFor="spadToken-input" className="cursor-pointer">
                Challenge Token:
              </label>
              <div className="flex flex-1 flex-row m-2 mb-4">
                <input
                  type="text"
                  className="flex-1 form-input px-4 py-3 text-black rounded-full"
                  id="spadToken-input"
                  name="spadToken"
                  defaultValue={spadConfig.token}
                  onChange={changeToken}
                ></input>
                <button
                  className="bg-slate-500 px-5 ml-3 rounded-full"
                  onClick={async () => getApiKey()}
                >
                  Authenticate
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row">
          <p>CS: {challengeStatus}</p>
          <button
            className="bg-slate-500 px-5 py-3 rounded-full"
            onClick={async () => await testConnection()}
          >
            <b>Test</b>
          </button>
          <span>Aircraft: {aircraft}</span>
        </div>
      </div>
    </div>
  );
};

export { Settings };
