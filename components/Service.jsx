'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { JsonContext } from '@/context/jsonContext';
import IconRight from '@/public/icons/IconRight';
import IconShareFb from '@/public/icons/IconShareFb';
import IconShare from '@/public/icons/IconShare';
import IconFuture from '@/public/icons/IconFuture';
import { FacebookShareButton } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';

function Service({ image, title, price, description, features, id }) {

	const { setActivePopup, serActiveService } = useContext(JsonContext);
	const [copied, setCopied] = useState(null);


	useEffect(() => {
		// get Serching Service ID
		const searchParams = new URLSearchParams(window.location.search);
		const serviceId = parseInt(searchParams.get("id"));
		const serviceElement = document.getElementById(serviceId);

		//Scroll to Serching Service
		if (serviceElement) {
			serviceElement.scrollIntoView({ behavior: 'smooth', block: "center" });
		}
	}, [])


	useEffect(() => {

		//copied Mode Remove
		let timer = setTimeout(() => setCopied(null), 2000);
		return () => {
			clearTimeout(timer);
		};

	}, [copied])

	// dyncamic Quote popup Services Change
	const handleServiceBook = (e, serviceId) => {
		e.preventDefault();
		serActiveService(serviceId);
		setActivePopup('quote');
		setTimeout(() => {
			document.body.classList.add("quote_opened");
			document.body.style.overflow = "hidden";
		}, 100);
	}

	return (
		<div className='flex gap-[32px] mb-[32px] laptop:mb-[90px] tablet:mb-[110px] mobile:mb-[25px] laptop:gap-20 even:flex-row-reverse mobile:!flex-col' id={id}>
			<div className='flex-1 relative laptopHorizontal:flex-[0_0_45%] tablet:flex-[0_0_40%] mobile:flex-1 mobile:min-h-[240px] mobile:w-full'>
				<Image
					src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + image}
					alt='future_Image'
					fill
					sizes="50vw"
					className="h-full w-full object-cover"
				/>
			</div>
			<div className='flex-1 h-full py-[15px] tablet:py-0'>
				<div className='text-2xl font-bold tablet:text-xl'>{title}</div>
				<div className='flex items-end justify-between w-full mt-[16px] h-full'>
					<div className='w-fit'>
						<div className='text-base font-semibold'>Share</div>
						<div className='flex gap-8 mt-[16px]'>
							<CopyToClipboard text={typeof window !== 'undefined' ? window.location.host + `/services?id=${id}` : ''}
								onCopy={() => setCopied(id)}>
								<span className={`w-32 h-32 flex  cursor-pointer hover:opacity-70 items-center [&>svg_path]:duration-300 duration-300 justify-center  bg-[#F4F4F4]  ${copied == id && 'bg-siteGreen opacity-70 cursor-default bg-opacity-70 [&>svg_path]:fill-white'}  `}>
									<IconShare />
								</span>
							</CopyToClipboard>
							<FacebookShareButton
								url={typeof window !== 'undefined' ? window.location.host + `/services?id=${id}` : ''}
							>
								<span className='w-32 h-32 flex items-center justify-center bg-[#F4F4F4]'>
									<IconShareFb />
								</span>
							</FacebookShareButton>
						</div>
					</div>
					<div className='w-fit flex flex-col justify-between h-[72px]'>
						<div className='text-base font-semibold'>Estimated</div>
						<div className='font-bold text-[40px] mt-[0px] tablet:text-2xl mobile:text-lg mobile:text-center'>${price}</div>
					</div>
					<a
						href="/"
						className='flex gap-[4px] items-center text-base underline font-semibold uppercase mobile:text-xs'
						onClick={e => handleServiceBook(e, id)}
					>
						Book Now <IconRight />
					</a>
				</div>
				<div className='ellipsis3 mt-[16px] text-sm' dangerouslySetInnerHTML={{ __html: description }} />
				<div className='grid grid-cols-2 gap-x-[16px] gap-y-[8px] mt-[24px] laptop:absolute w-full left-0 laptop:grid-cols-3 laptop:pt-[20px] tablet:pt-0 mobile:grid-cols-1 mobile:relative'>
					{features.map((future, i) => (
						<div key={i} className='text-base flex items-center gap-[16px] tablet:text-sm font-semibold'>
							<IconFuture />
							{future.title}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Service