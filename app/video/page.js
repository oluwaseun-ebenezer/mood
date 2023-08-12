"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPlayer from "react-player";
import "react-toastify/dist/ReactToastify.css";

export default function Video() {
  const [fileSelected, setFileSelected] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const notify = (text) => toast(text);

  const onFileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (fileSelected) {
      setLoading(true);

      const formData = new FormData();
      formData.append("video", fileSelected, fileSelected.name);

      await axios
        .post("http://localhost:8000/", formData)
        .then((res) => {
          setVideoUrl(res.data.data.result);

          setResult(res.data.data);
        })
        .catch((error) => {
          console.log(error.response?.data?.message);
          notify(error.response?.data?.message ?? "Error processing request");
          console.log(error);
        });

      setLoading(false);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <main className="grid grid-cols-12 min-h-screen">
      <div className="col-span-3 bg-primary"></div>
      <div className="col-span-9 overflow-y-auto py-14 px-20 px- space-y-14">
        <Title text="Upload the classroom video to generate an engagement report" />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 outline-dashed p-4 rounded-xl">
            <div className="flex items-center justify-center p-20">
              <input
                type="file"
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
            {videoUrl && (
              <ReactPlayer
                url={`http://localhost:8000/stream/${videoUrl}`}
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

        <div className="flex justify-center px-48 relative">
          {loading && (
            <div className="w-full h-full absolute flex justify-center items-center py-24 bg-gray-200 bg-opacity-60">
              <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-secondary opacity-75"></span>
            </div>
          )}

          {result && (
            <table className="text-xl table-auto w-full my-6">
              <tbody>
                <tr className="border border-black">
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
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <ToastContainer />
      </div>
    </main>
  );
}
