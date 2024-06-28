'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JsonContext } from '@/context/jsonContext'
import { HeaderLinks } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { PaymentIcons } from '@/utils/data/settingsData'
import { Twirl as Hamburger } from "hamburger-react";
import IconCall from '@/public/icons/IconCall.jsx'
import IconRight from '@/public/icons/IconRight.jsx'
import IconFb from '@/public/icons/IconFb.jsx'
import IconInsta from '@/public/icons/IconInsta.jsx'
import IconYoutube from '@/public/icons/IconYoutube.jsx'
import IconMail from '@/public/icons/IcomMail.jsx'
import IconMarker from '@/public/icons/IconMarker.jsx'
import IconTime from '@/public/icons/IconTime.jsx'
import mainLogo from '@/public/images/logoImage.png'

function Header({ settingsData }) {

  const { setActivePopup } = useContext(JsonContext);

  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  //mobile Menu Trigger
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    if (document.body.classList.contains('menu_opened')) {
      setOpen(false)
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      document.body.style.overflowY = "scroll";
      document.body.classList.remove('menu_opened');
    }

  }, [isOpen, pathname]);

  //Quote Popup Opening
  const quotePopupOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActivePopup("quote");
    setTimeout(() => {
      document.body.classList.add("quote_opened");
      document.body.style.overflow = "hidden";
    }, 100);
  };

  return (
    <header className='absolute shadow-custom bg-white top-16 h-[72px] left-16 right-16 z-50 before:left-0 before:right-0 before:bg-white before:top-0 before:bottom-0 before:z-10 tablet:before:shadow-custom before:absolute mobile:top-[60px] mobile:h-[56px]  mobile:justify-between mobile:left-8 mobile:right-8 mobile:shadow-none'>
      <div className='custom_container h-full flex items-center gap-20  mobile:px-8 mobile:justify-between mobile:shadow-custom' >
        <Link href='/' className='z-20'>
          {settingsData ?
            <Image
              src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + settingsData?.logo}
              alt="Ricardo portrait"
              width={63}
              height={27}
              priority={true}
              quality="100"
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
        <div className={isOpen ? 'menu-open laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-full laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  laptop:right-0  duration-[0.7s] mobile:duration-[0.5s]  ' : ' mobile:duration-[0.5s] duration-[0.7s] laptop:right-0 laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-0 laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  '}>
          <div className='ml-auto laptop:w-full  w-full  laptop:flex laptop:justify-end laptop:z-[-1] tablet:w-[calc(100vw)] laptop:left-0 laptop:h-full z-20 laptop:bg-blueDark1 laptop:bg-opacity-35 laptop:top-0  tablet:bg-white mobile:bg-transparent laptop:pt-[96px] mobile:pt-[130px] '>
            <div className='mobile_container relative flex items-center gap-32 laptop:min-w-[350px] tablet:min-w-[calc(100%-32px)] laptop:overflow-y-auto mobile:w-[calc(100%-16px)]   laptop:bg-[#f4faff] laptopHorizontal:gap-20 laptop:flex-col laptop:pt-[30px] laptop:mr-[16px] mobile:mr-[8px] laptop:gap-[30px]'>
              {HeaderLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={pathname === link.href ? ' pointer-events-none text-siteBlue text-base font-semibold underline laptopHorizontal:text-sm laptop:font-bold laptop:w-[350px] tablet:w-[calc(100%-16px)] whitespace-nowrap laptop:text-center flex justify-center items-center gap-[20px] laptop:text-[16px] ' : ' tablet:w-[calc(100%-16px)]  laptop:text-[16px] flex justify-center items-center gap-[20px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptopHorizontal:text-sm text-blueDark1 text-base '}
                >
                  {link.title}
                  <div className='laptop:block hidden'>
                    <IconRight />
                  </div>
                </Link>
              ))}
              <div className='hidden laptop:flex flex-col pt-[30px] w-[300px] justify-center border-t border-solid border-blueDark1'>
                <div className='flex gap-[30px] items-center justify-center'>
                  <a href={settingsData?.facebook_link} target='_blank'> <IconFb /></a>
                  <a href={settingsData?.instagram_link} target='_blank'> <IconInsta /></a>
                  <a href={settingsData?.youtube_link} target='_blank'> <IconYoutube /></a>
                </div>

                <div className=' justify-center  flex items-center gap-8 laptopHorizontal:justify-center mt-[30px] '>
                  <IconMail />  <a href={`mailito:${settingsData?.email}`} className='text-sm text-center text-blueDark1 mobile:whitespace-nowrap '>{settingsData?.email}</a>
                </div>
                <div className=' justify-center  flex items-center gap-8 laptopHorizontal:justify-end mt-[30px]'>
                  <IconMarker />  <a href="/" className='text-sm text-blueDark1 text-center mobile:whitespace-nowrap lat '>{settingsData?.address}</a>
                </div>
                <div className=' justify-center  flex items-center gap-8  mt-[30px]'>
                  <IconTime />  <span className='text-sm text-blueDark1 text-center mobile:whitespace-nowrap '>{settingsData?.working_hours}</span>
                </div>
                <div className='flex items-center justify-center gap-20 mt-[30px] '>
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
                <div className='flex items-center justify-center mt-[30px] gap-[24px] mobile:gap-[10px] pb-[50px]'>
                  <Link className=' underline text-sm text:blueDark1 font-semibold ' href="/">Privacy Policy</Link>
                  <Link className=' underline text-sm text:blueDark1 font-semibold ' href="/">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={isOpen ? ' flex items-center gap-20 ml-auto relative z-20 mobile:bg-white  mobile:absolute mobile:p-8 mobile:justify-between mobile:top-[-100%] mobile:w-full mobile:left-0  mobile:z-[1] mobile:shadow-inner mobile:duration-[0.3s]  ' : ' mobile:duration-[0.3s]  mobile:z-[1] mobile:shadow-inner  flex items-center gap-20 ml-auto relative z-20 mobile:bg-white  mobile:absolute mobile:p-8 mobile:justify-between mobile:top-[-100%] mobile:w-full mobile:left-0 '}>
          <div className='flex items-center gap-8 '>
            <IconCall />  <a href={`tel:${settingsData?.phone}`} className='text-sm text-blueDark1 mobile:whitespace-nowrap '>{settingsData ? settingsData.phone : '(800) 217-7840'}</a>
          </div>
          <a href='/' className='text-base laptopHorizontal:text-sm mobile:whitespace-nowrap mobile:px-8  uppercase flex mobile:text-xs bg-siteBlue px-16 laptopHorizontal:px-10 items-center  text-white h-40  font-semibold ' onClick={(e) => quotePopupOpen(e)} >Get Free Quote</a>
        </div>
        <div className="hidden z-20 laptop:flex  items-center justify-center relative before:absolute before:w-40 before:bg-blueDark1 before:h-40 mobile:right-[-5px]">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={22}
            color="#fff"
          />
        </div>
      </div>
    </header>
  )
}

export default Header