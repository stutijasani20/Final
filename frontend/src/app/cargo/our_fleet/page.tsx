import React from "react";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <h1 className=" mx-10 mt-5 text-4xl text-purple-800">Our Fleet</h1>
      <div className="md:container mt-10 mb-5 md:mx-auto bg-slate-50 ">
        <div>
          <p className="mx-10 text-2xl pt-5 ">Our Fleet</p>
          <p className="text-slate-500 mx-10 mt-3">
            Elegance Air continues to invest in the latest aviation technology,
            and the recent record-breaking order of 470 new aircraft renews our
            commitment to provide an unforgettable inflight experience. At
            present, Elegance Air takes to the skies with 128 narrow-body and
            wide-body Airbus and Boeing aircraft that fly passengers and
            transport cargo worldwide. Comfortable, modern and efficient, our
            fleet ensures you reach your destination relaxed and ready to go!
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={`/plane1.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane2.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane3.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={`/plane3.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane1.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane2.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={`/plane1.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane3.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
          <Image
            src={`/plane2.jpg`}
            alt="plane"
            height={300}
            width={300}
            className="rounded mx-10 pt-10 pb-10"
          />
        </div>
      </div>
    </>
  );
}
