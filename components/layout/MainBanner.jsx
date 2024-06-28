import Link from 'next/link'
import React from 'react'
import QuoteForm from '../quote/QuoteForm'
import defaultBanerImg from '@/public/images/homeBanner.png'

function MainBanner({ isMainBanner, tagline, title, description, image, link, linkHref }) {
  return (
    <div
      className={
        isMainBanner 
        ? 'w-full h-[720px] laptopHorizontal:h-full laptopHorizontal:pb-[30px] bg-blueDark1 text-white pt-[116px]  bg-no-repeat bg-cover tablet:bg-white tablet:mb-[40px] tablet:!bg-none tablet:text-blueDark1 tablet:pb-0 mobile:mb-20'
        : 'w-full h-[400px] bg-blueDark1 text-white pt-[116px] laptop:h-[330px] tablet:bg-white tablet:mb-[40px] bg-no-repeat bg-cover tablet:!bg-none tablet:text-blueDark1 '}
        style={{ backgroundImage: `url(${image ? image : defaultBanerImg})` }}
      >
      <div className='custom_container mobile:pt-[20px] '>
        <div className={isMainBanner ? 'grid grid-cols-2 gap-32 pt-20 laptopHorizontal:gap-15 tablet:flex-col tablet:grid-cols-1' : 'block gap-32 laptopHorizontal:gap-15 tablet:flex-col'}>
          <div className={isMainBanner ? 'relative max-w-[658px] w-full laptopHorizontal:max-w-[560px] laptop:max-w-[380px] tablet:max-w-[400px] tablet:mx-auto tablet:text-center' : 'relative w-full'}>
            <div className={isMainBanner ? 'relative' : 'flex w-full gap-32 justify-between items-center pt-[25px] tablet:block'}>
              <div className='relative'>
                <div className='text-base text-inherit font-semibold'>{tagline}</div>
                <div className='mt-8 text-[48px] laptopHorizontal:text-[40px] mobile:text-2xl laptopHorizontal:leading-[50px] laptop:text-[32px] font-bold text-inherit leading-[57px]'>{title}</div>
              </div>
              <div className='relative flex-1  tablet:pt-0 max-w-[450px]'>
                <div className='text-sm text-inherit font-regular mt-[30px] ellipsis3'>{description}</div>
                {link &&
                  <Link
                    className='mt-40 block py-8 px-16 text-base tablet:mt-20 tablet:mx-auto text-white w-fit bg-siteBlue'
                    href={linkHref}
                  >
                    {link}
                  </Link>
                }
              </div>
            </div>
          </div>
          {isMainBanner &&
            <div className='w-full bannerWrapper p-[20px] bg-blueDark2 bg-opacity-85 tablet:bg-white mobile:p-0 '>
              <QuoteForm />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MainBanner