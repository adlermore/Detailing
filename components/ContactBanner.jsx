import supportBg from "@/public/images/supportBg.png";
import Link from "next/link";

function ContactBanner({BannerData}) {
  return (
    <div className="my-50 laptop:my-[30px]">
      <div className="custom_container">
        <div className="w-full px-[48px] min-h-[160px] flex items-center mobile:bg-blueDark1 mobile:!bg-none py-[34px] laptop:p-20 mobile:p-16 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${supportBg.src})` }}>
          <div className="flex w-full items-center gap-20 justify-between tablet:flex-col mobile:items-start">
            <div className="relative flex-1">
              <div className="text-white text-[40px] font-bold laptopHorizontal:text-[32px] tablet:text-xl ">{BannerData?.title}</div>
              <div className="mt-[16px] text-sm text-white">{BannerData?.short_description}</div>
            </div>
            <div className="flex gap-16 items-center">
              <Link href="/contacts" className="px-16 tablet:px-[10px] mobile:text-sm mobile:whitespace-nowrap py-8 bg-siteBlue text-center text-base text-white">Contact Us</Link>
              <Link href="/faq" className="px-16 tablet:px-[10px] mobile:text-sm mobile:whitespace-nowrap py-8 bg-white text-center text-base hover:opacity-100 hover:bg-blueDark2 hover:text-white">Read FAQ Section</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactBanner;
