"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import Success from "@/components/Success";
import Error from "@/components/Error";
import { useStatusProvider } from "@/providers/status";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

export default function Video() {
  const [status, setStatus] = useStatusProvider();

  const [fileSelected, setFileSelected] = useState(null);
  const [result, setResult] = useState({ status: "init", data: null });

  const onFileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (fileSelected) {
      setResult({ status: "init", data: null });
      setStatus(true);

      const formData = new FormData();
      formData.append("video", fileSelected, fileSelected.name);

      await axios
        .post("http://localhost:8000/", formData)
        .then((res) => {
          if (res.data.data.total_count) {
            const score =
              (res.data.data.drowsy_count / res.data.data.total_count) * 100;
            if (score < 50) {
              res.data.data.message =
                "The engagement level is low amongst the students";
            } else {
              if (score > 60) {
                res.data.data.message =
                  "The engagement level is high amongst the students";
              } else {
                res.data.data.message =
                  "The engagement level is medium amongst the students";
              }
            }
          } else {
            res.data.data.message =
              "The engagement level is low amongst the students";
          }

          setResult(res.data);
        })
        .catch((error) => {
          setResult({ status: "error" });
        });

      setStatus(false);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileUpload").click();
  };

  useEffect(() => {
    setStatus(false);

    return () => {
      setStatus(false);
    };
  }, []);

  return (
    <>
      <Title text="Upload the classroom video to generate an engagement report" />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 outline-dashed p-4 rounded-xl">
          <div className="flex items-center justify-center p-20">
            <input
              type="file"
              accept=".mp4"
              id="fileUpload"
              className="hidden"
              onChange={onFileChange}
            />

            <Button text="Browse Video" handler={handleFileUploadClick} />
          </div>

          <p className="text-center">{fileSelected?.name}</p>
        </div>

        <div className="col-span-2 m-auto">
          <Button text="Upload" handler={onFileUpload} bg="bg-secondary" />
        </div>

        <div className="col-span-5 outline-double h-72">
          {result.status == "success" && (
            <ReactPlayer
              url={`http://localhost:8000/stream/${result.data.result}`}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              muted={true}
            />
          )}
        </div>
      </div>

      <hr className="border border-black" />

      <div className="flex justify-center relative">
        {status && (
          <div className="w-full h-full absolute flex justify-center items-center py-24 bg-gray-200 bg-opacity-60">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-secondary opacity-75"></span>
          </div>
        )}

        {result.status === "success" && (
          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="flex items-center justify-center">
              <Success text={result.data.message} />
            </div>

            <table className="col-span-2 text-xl table-auto w-full">
              <tbody>
                {/* <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Engagement</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.engaged_percent} of {result.sum_inference}
                  </td>
                </tr>

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Boredom</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.boredom_percent} of {result.sum_inference}
                  </td>
                </tr>

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Confusion</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.confusion_percent} of {result.sum_inference}
                  </td>
                </tr>

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Frustration</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.frustration_percent} of {result.sum_inference}
                  </td>
                </tr>

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Distraction</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.distracted_percent} of {result.sum_inference}
                  </td>
                </tr> */}

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Attentive Eyes</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.data.attentive_count} of {result.data.total_count}
                  </td>
                </tr>

                <tr className="border border-black">
                  <th className="w-1/2 text-left px-8">Drowsy Eyes</th>
                  <td className="w-1/2 font-medium text-right py-2 px-8">
                    {result.data.drowsy_count} of {result.data.total_count}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {result.status === "error" && <Error text="Error processing request" />}
      </div>
    </>
  );
}
