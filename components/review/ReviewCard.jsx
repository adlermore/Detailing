import IconStar from '@/public/icons/IconStar.jsx'
import React from 'react'

function formatDate(created_at) {
  const date = new Date(created_at);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const userAvatar = (review) => {
  const letter = review.name.slice(0, 1).toUpperCase();
  return letter;
}

export default function ReviewCard({ review }) {
  return (
    <div className='p-[32px] tablet:p-[15px] review_block  shadow-review border border-blueDark1 '>
      <div className="flex gap-[16px] justify-center flex-col">
        <div className='flex'>
          {Array.from({ length: review.rating }, (_, index) => (
            <IconStar key={index} filled />
          ))}
          {Array.from({ length: 5 - review.rating }, (_, index) => (
            <IconStar strokemode={true} key={index + review.rating} filled={false} />
          ))}
        </div>
        <p dangerouslySetInnerHTML={{ __html: review.message }}></p>
        <div className='flex gap-[20px] items-center'>
          <div className='px-[20px] py-[10px] bg-siteBlue'>
            <h1 className='text-white font-black  '>{userAvatar(review)}</h1>
          </div>
          <div>
            <h4 className='font-semibold'>{review.name}</h4>
            <p className='text-sm '>{formatDate(review.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}