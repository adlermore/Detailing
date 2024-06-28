import Image from "next/image";
import { MapProvider } from "@/providers/Map-provider";
import { MapComponent } from "@/components/Map";
import { gridImages, homeData } from "@/utils/data/homeData";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import MainSlider from "@/components/MainSlider.jsx";
import MainBanner from "@/components/layout/MainBanner.jsx";
import beforeWash from '@/public/images/beforeWash.jpg';
import afterWash from '@/public/images/afterWash.jpg';
import ReviewHome from "@/components/review/ReviewHome";

export default async function Home() {
  
  // HomePage Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/home' , {cache: 'no-cache'})
  const { data } = await res.json()

  return (
    <main className="w-full">
      <MainBanner
        isMainBanner
        tagline={'Tagline'}
        title={data.home_header?.title}
        description={data.home_header.short_description}
        link={homeData?.link}
        linkHref={homeData?.linkHref}
        image={process.env.NEXT_PUBLIC_DATA + '/uploads/' + data.home_header.image}
      />
      <div className=" bg-bgGray py-[50px] laptop:hidden">
        <div className="custom_container">
          <div className="text-center  font-semibold text-base">Tagline</div>
          <div className="mt-[8px] text-[32px] font-bold text-center">
            {data.key_features.title}
          </div>
          <div className="text-sm text-center max-w-[768px] mx-auto mt-8">
            {data.key_features.short_description}
          </div>
          <div className="grid grid-cols-4 gap-[32px] mt-[32px] laptopHorizontal:gap-20">
            {data.key_features.modules.map((future, i) => (
              <div key={i} className="relative w-full">
                <div className="mx-auto w-[56px] relative h-[56px] flex justify-center  items-center">
                  <Image
                    src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + future?.image}
                    alt='future_Image'
                    fill
                    sizes="56px"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-[16px] text-center text-2xl font-bold laptopHorizontal:text-xl">
                  {future.title}
                </div>
                <div className="mt-8 text-sm text-center">
                  {future.short_description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-[50px] overflow-x-hidden mobile:py-[30px]">
        <div className="custom_container">
          <div className="font-bold text-[32px] mobile:text-2xl">
            {data.home_services.title}
          </div>
          <div className="mt-[16px] text-sm text-blueDark2">
          {data.home_services.short_description}
          </div>
          <MainSlider sliderData={data.services} />
        </div>
      </div>
      <ReviewHome />
      <div className="py-50 tablet:py-[30px]">
        <div className="custom_container">
          <div className="grid gap-32 grid-cols-2 laptop:gap-20 tablet:grid-cols-1">
            <div className="relative py-50 laptop:py-[0px]">
              <div className=" font-semibold text-base">Tagline</div>
              <div className="mt-8 text-[32px] font-bold">{data.before_and_after_cleaning.title}</div>
              <div className="mt-8 text-sm">
                {data.before_and_after_cleaning.short_description}
              </div>
              <div className="mt-[24px] flex gap-[24px] laptop:gap-20 mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center">
                {data.before_and_after_cleaning.modules.map((module, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-center relative items-center h-[56px] w-[56px] mobile:mx-auto">
                      <Image
                        src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + module.image}
                        alt='future_Image'
                        fill
                        sizes="56px"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="mt-8 text-xl font-bold">{module.title}</div>
                    <div className="mt-8 text-sm">{module.short_description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-full">
              <ReactCompareSlider
                className="w-full h-full"
                position={64}
                itemOne={<ReactCompareSliderImage src={beforeWash.src} className="scale-105" alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={afterWash.src} className=" bg-no-repeat" alt="Image two" />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-bgGray py-[50px] mobile:py-[30px]">
        <div className="custom_container">
          <div className="text-[32px] font-bold  laptop:text-[26px] mobile:text-2xl">{data.home_footer.title}</div>
          <div className="mt-8 text-sm">{data.home_footer.short_description}</div>
          <div className="grid grid-cols-2 gap-[32px] mt-32 laptop:gap-20 tablet:grid-cols-1">
            <div className="w-full grid gap-[32px] grid-cols-2 laptop:gap-20 mobile:gap-[10px]">
              {gridImages.map((item, i) => (
                <div key={i} className="relative w-full first:col-start-1 first:col-end-3" >
                  <Image
                    src={item.image}
                    alt="Ricardo portrait"
                    width="auto"
                    height="auto"
                    quality="100"
                    priority={true}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
            <div className="h-full w-full shadow-custom tablet:h-[450px] mobile:h-[370px]">
              <MapProvider>
                <MapComponent />
              </MapProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
