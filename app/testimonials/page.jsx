"use client";
import { useContext, useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewPopup from '@/components/review/ReviewPopup';
import { JsonContext } from '@/context/jsonContext';
import IconStar from '@/public/icons/IconStar.jsx';
import request from '@/utils/hooks/request';

export default function Testimonials() {
  const { setActivePopup } = useContext(JsonContext);

  const [reviewData, setReviewData] = useState(null);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(undefined);

  const perPage = 6;

  useEffect(() => {

    request(`${process.env.NEXT_PUBLIC_DATA_API}/reviews?per_page=${perPage}&page=1`)
      .then((res) => {
        setReviewInfo(res.data.content);
        setReviewData(res.data.reviews.data);
        setRating(res.data.rating);
        setCurrentPage(res.data.reviews.current_page + 1);
        setLastPage(res.data.reviews.last_page);
      })
      .catch((error) => {
        throw new Error(error)
      });
  }, []);


  const fetchMoreResults = async () => {
    if (loading || currentPage > lastPage) return;
    setLoading(true);
    request(`${process.env.NEXT_PUBLIC_DATA_API}/reviews?per_page=${perPage}&page=${currentPage}`)
      .then((res) => {
        setReviewData((prevData) => [...prevData, ...res.data.reviews.data]);
        setCurrentPage(res.data.reviews.current_page + 1);
      })
      .finally(() => {
        setLoading(false);
      })
  };


  const handleScroll = (e) => {
    if (currentPage === lastPage) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchMoreResults();
    }
  };

  const reviewPopupOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActivePopup("review");
    setTimeout(() => {
      document.body.classList.add("review_opened");
      document.body.style.overflow = "hidden";
    }, 100);
  };

  const midpoint = Math.ceil(reviewData?.length / 2);
  const columns = [reviewData?.slice(0, midpoint), reviewData?.slice(midpoint)];

  if (!reviewData) {
    return <PageLoader />
  }
  return (
    <div className="Testimonials custom_container">
      <div className='my-[130px] flex flex-col gap-[16px]'>
        <div>
          <h1 className='font-bold text-[32px] gap-[5px] leading-[48px] text-center flex items-center mobile:text-[18px] flex-nowrap'>
            {reviewInfo?.title} ( <IconStar /> {rating} )
          </h1>
          <div className='flex justify-between items-start mt-[10px] mobile:flex-col mobile:gap-[20px] mobile:mt-[8px]'>
            <p className='w-[60%] mobile:w-full mobile:text-[14px]'>
              {reviewInfo?.short_description}
            </p>
            <button onClick={reviewPopupOpen} className="px-6 py-3 whitespace-nowrap tablet:text-sm border self-start duration-300 hover:bg-blueDark2 hover:text-white">
              Give Us Your Feedback
            </button>
          </div>
        </div>
        <div onScroll={handleScroll} className='reviews  max-h-[600px] pb-[45px]  relative overflow-y-auto'>
          <div className=' review_list flex items-start gap-[20px] pr-[25px] mobile:flex-col mobile:pr-[10px]'>
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className='flex flex-col w-full gap-[20px]'>
                {column.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ))}
          </div>
          {loading &&
            <div className='bottom-0 flex pt-[30px] justify-center items-center'>
              <span className="loader"></span>
            </div>
          }
        </div>
      </div>
      <ReviewPopup />
    </div>
  );
}