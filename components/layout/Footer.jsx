import Image from 'next/image'
import Link from 'next/link'
import IconCall from '@/public/icons/IconCall.jsx'
import IconMail from '@/public/icons/IcomMail.jsx'
import IconMarker from '@/public/icons/IconMarker.jsx'
import IconTime from '@/public/icons/IconTime.jsx'
import IconFb from '@/public/icons/IconFb.jsx'
import IconInsta from '@/public/icons/IconInsta.jsx'
import IconYoutube from '@/public/icons/IconYoutube.jsx'
import { PaymentIcons } from '@/utils/data/settingsData'

async function Footer({ settingsData }) {

  return (
    <div className='footer py-[32px] bg-white laptopHorizontal:py-[16px] relative'>
      <div className='custom_container'>
        <div className='flex items-center gap-20 justify-between laptopHorizontal:flex-wrap'>
          <Link href='/' className=' w-[63px] z-20'>
            {settingsData ?
              <Image
                src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + settingsData?.logo}
                alt="Ricardo portrait"
                width={63}
                height={27}
                quality="100"
                priority={true}
              />
              :
              <Image
                src={mainLogo}
                alt="Ricardo portrait"
                width={63}
                height={27}
                priority={true}
              />
            }
          </Link>
          <div className='relative flex justify-around gap-[24px] laptopHorizontal:order-1 w-full laptopHorizontal:justify-between laptopHorizontal:grid laptopHorizontal:grid-cols-3 laptopHorizontal:gap-x-0 laptop:flex laptop:flex-wrap laptop:gap-[20px] laptop:justify-center'>
            <div className='flex items-center gap-8 '>
              <IconCall />  <a href={`tel:${settingsData?.phone}`} className='text-sm text-blueDark1 mobile:whitespace-nowrap '>{settingsData ? settingsData?.phone : '(800) 217-7840'}</a>
            </div>
            <div className='flex items-center gap-8 laptopHorizontal:justify-center '>
              <IconMail />  <a href={`mailito:${settingsData?.email}`} className='text-sm text-blueDark1 mobile:whitespace-nowrap '>{settingsData ? settingsData?.email : 'testing@gmail.com'}</a>
            </div>
            <div className='flex items-center gap-8 laptopHorizontal:justify-end'>
              <IconMarker />  <a href="/" className='text-sm text-blueDark1 mobile:whitespace-nowrap lat '>{settingsData ? settingsData?.address : '123 Sample St, Sydney NSW 2000 AU'}</a>
            </div>
            <div className='flex items-center gap-8 '>
              <IconTime />  <span className='text-sm text-blueDark1 mobile:whitespace-nowrap '>{settingsData ? settingsData?.working_hours : 'Monday - Sunday: 8:00 am to 6:00 pm'}</span>
            </div>
          </div>
          <div className='flex gap-[12px] items-center'>
            <a href={settingsData?.facebook_link} target='_blank' aria-label="Facebook"> <IconFb /></a>
            <a href={settingsData?.instagram_link} target='_blank' aria-label="Instagram"> <IconInsta /></a>
            <a href={settingsData?.youtube_link} target='_blank' aria-label="Youtube"> <IconYoutube /></a>
          </div>
        </div>
        <div className='pt-[16px] mt-40 border-t border-solid border-t-blueDark1 relative laptopHorizontal:mt-[30px] laptop:mt-[60px]'>
          <div className='flex justify-between items-center gap-20 laptopHorizontal:flex-col'>
            <div className='text-sm text-blueDark1 mobile:text-center tablet:max-w-[450px] tablet:text-center mobile:h-[40px] mobile:pb-[15px]'>
              2023 Service Name. All right reserved. Designed and Developed by <a href={settingsData?.author_company_url} target="_blank" className='underline font-semibold mobile:whitespace-nowrap'>{settingsData?.author_company}</a>
            </div>
            <div className='flex items-center gap-[15px] laptopHorizontal:absolute laptopHorizontal:right-0 laptopHorizontal:top-[calc(-100%+20px)] laptop:left-1/2 laptop:-translate-x-1/2 laptop:justify-center tablet:top-[calc(-100%+45px)] laptop:top-[calc(-100%+30px)] mobile:w-full '>
              {PaymentIcons.map((icons, i) => (
                <div key={i} className='w-[42px] h-[32px] relative'>
                  <Image
                    src={icons.image}
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
            <div className='flex items-center gap-[24px] mobile:gap-[10px]'>
              <Link className=' underline text-sm text:blueDark1 font-semibold ' href="/faq">FAQ</Link>
              <Link className=' underline text-sm text:blueDark1 font-semibold ' href="/privacy-policy">Privacy Policy</Link>
              <Link className=' underline text-sm text:blueDark1 font-semibold ' href="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer