import Image from 'next/image'
import { BannerData } from '@/utils/data/aboutData'
import MainBanner from '@/components/layout/MainBanner.jsx'
import IconCheckWhite from '@/public/icons/IconCheckWhite.jsx'
import ContactBanner from '@/components/ContactBanner.jsx'

async function About() {

  // About Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/about-us', { cache: 'no-cache' })
  const { data } = await res.json()

  return (
    <main className="w-full">
      <MainBanner
        isMainBanner={false}
        tagline={BannerData?.tagline}
        title={data.about_us_header.title}
        description={data.about_us_header.short_description}
        link={BannerData?.link}
        linkHref={BannerData?.linkHref}
        image={process.env.NEXT_PUBLIC_DATA + '/uploads/' + data.about_us_header?.image}
      />
      <div className='w-full py-50'>
        <div className='custom_container flex gap-[32px] items-center tablet:flex-col-reverse'>
          <div className='w-[392px]  h-[320px] relative laptop:w-[340px] tablet:w-full'>
            <Image
              src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + data.about_us.image}
              alt='future_Image'
              fill
              sizes="50vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className='flex-1'>
            <div className='text-base font-semibold'>Tagline</div>
            <div className='mt-8 text-[32px] font-bold'>{data.about_us.title}</div>
            <div className='mt-8 text-sm dynamic_ul' dangerouslySetInnerHTML={{ __html: data.about_us.description }} />
          </div>
        </div>
      </div>
      <div className='w-full py-50 bg-bgGray'>
        <div className='custom_container'>
          <div className='text-[32px] font-bold text-center'>{data.partner_companies.title}</div>
          <div className='text-center mx-auto max-w-[760px] text-sm mt-8'>
            {data.partner_companies.short_description}
          </div>
          <div className='mt-16 flex justify-between gap-20 tablet:grid tablet:grid-cols-3 mobile:gap-[10px]'>
            {data.partner_companies.modules.map((product, i) => (
              <div key={i} className='w-[150px] h-[150px] flex relative items-center justify-center mobile:w-[100px] mobile:h-[100px]'>
                <Image
                  src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + product.image}
                  alt='future_Image'
                  fill
                  sizes="50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className='mt-[32px] flex gap-[32px] items-center laptop:items-start laptop:flex-col'>
            <div className='flex-1'>
              <div className='font-bold text-[32px]'>{data.why_choose_us.title}</div>
              <div className='mt-8 text-sm'>{data.why_choose_us.short_description}</div>
              <div className='grid grid-cols-3 gap-x-[16px] gap-y-[63px] mt-[60px] laptopHorizontal:gap-20 tablet:grid-cols-2 mobile:gap-[10px]'>
                {data.why_choose_us.modules.map((feature, i) => (
                  <div key={i} className='flex items-center gap-8 mobile:gap-[5px]'>
                    <div className='flex items-center justify-center bg-[#6FCF97] min-w-[32px] min-h-[32px] mobile:min-w-[25px]  mobile:min-h-[25px] mobile:[&>svg]:w-[20px] mobile:[&>svg]:h-[20px]'><IconCheckWhite /></div>
                    <div className=' font-semibold text-base laptopHorizontal:text-sm mobile:text-xs'>{feature.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-[392px] h-[300px] relative laptop:w-full'>
              <Image
                src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + data.why_choose_us.image}
                alt='future_Image'
                fill
                sizes="50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='py-50 laptop:py-[30px]'>
        <div className="custom_container">
          <div className="text-center  font-semibold text-base">Tagline</div>
          <div className="mt-[8px] text-[32px] font-bold text-center">
            {data.our_process.title}
          </div>
          <div className="grid grid-cols-4 gap-[32px] mt-[32px] laptopHorizontal:gap-20 tablet:grid-cols-2 mobile:grid-cols-1">
            {data.our_process.modules.map((module, i) => (
              <div key={i} className="relative w-full">
                <div className="mx-auto w-[56px] h-[56px] flex justify-center relative items-center">
                  <Image
                    src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + module.image}
                    alt='future_Image'
                    fill
                    sizes="50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-[16px] text-center text-2xl font-bold laptopHorizontal:text-xl">
                  {module.title}
                </div>
                <div className="mt-8 text-sm text-center mobile:max-w-[300px] mobile:mx-auto">
                  {module.short_description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactBanner BannerData={data.footer} />
    </main>
  )
}
export default About