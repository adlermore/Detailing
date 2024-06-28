import Questions from "@/components/faq/Questions";
import IconRight from "@/public/icons/IconRight.jsx";
import Link from "next/link";

export default function FAQs() {
  return (
    <div className="mt-[130px] max-w-[768px] mx-auto flex justify-center flex-col tablet:px-6">
      <h1 className="text-center font-bold  text-[32px]">Need answers? Connect directly with the host for quick responses.</h1>
      <p className="text-center color- to-blueDark2 text-16 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      <Questions />
      <div className="text-center mt-12 flex flex-col gap-2 ">
        <h3 className="text-[24px] font-bold ">Still Have a Question?</h3>
        <p className="text-14 font-normal leading-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <Link className="text-16 font-semibold border-b-2 border-indigo-500 flex items-center justify-center self-center uppercase " href={'/contacts'}>Contact US <IconRight /></Link>
      </div>
    </div >
  )
}