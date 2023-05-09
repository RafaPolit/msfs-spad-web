import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { spadConfigState } from "../atoms/spadConfig";
import { Challenge } from "../spadAPI/challenge";
import { ChallengeAccept } from "../spadAPI/challengeAccept";
import { DataGet } from "../spadAPI/dataGet";

type SettingsProps = {
  module: string;
};

const Settings = ({ module }: SettingsProps) => {
  const setSpadConfig = useSetRecoilState(spadConfigState);
  const spadConfig = useRecoilValue(spadConfigState);
  const [challengeStatus, setChallengeStatus] = useState(0);
  const [aircraft, setAircraft] = useState("");
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

  const challenge = async () => {
    try {
      await Challenge({
        url: `http://${spadConfig.address}:${spadConfig.port}`,
      });
      setChallengeStatus(1);
      setError("");
    } catch (e: any) {
      setChallengeStatus(0);
      setError(e.message);
    }
  };

  const challengeAccept = async () => {
    try {
      const response = await ChallengeAccept({
        url: `http://${spadConfig.address}:${spadConfig.port}`,
        token: spadConfig.token,
      });
      setSpadConfig((oldValues) => ({
        ...oldValues,
        apiKey: response.Result.ApiKey,
      }));
      setError("");
    } catch (e: any) {
      setSpadConfig((oldValues) => ({
        ...oldValues,
        apiKey: "",
      }));
      setError(e.message);
    }
  };

  const testConnection = async () => {
    try {
      const currentAircraft = await DataGet({
        url: `http://${spadConfig.address}:${spadConfig.port}`,
        apikey: spadConfig.apiKey,
        name: "LOCAL:SPAD_AIRCRAFT",
      });
      setAircraft(currentAircraft.Result.Value);
      setError("");
    } catch (e: any) {
      setAircraft("");
      setError(e.message);
    }
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
                  onClick={async () => await challenge()}
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
                  onClick={async () => await challengeAccept()}
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
                onClick={async () => await testConnection()}
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
  );
};

export { Settings };
