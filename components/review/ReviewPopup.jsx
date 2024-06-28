'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useRef, useState } from "react";
import IconStar from "@/public/icons/IconStar.jsx";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { JsonContext } from "@/context/jsonContext";
import IconClose from "@/public/icons/IconClose.jsx";
import { testimonialSchema } from "@/validation/testimonialSchema";
import request from "@/utils/hooks/request";

export default function ReviewPopup() {

  const { setActivePopup, activePopup } = useContext(JsonContext);

  const [rating, setRating] = useState('');
  const [hover, setHover] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(testimonialSchema),
  });

  const ref = useRef();

  const onSubmit = (data) => {
    setDisabledBtn(true);
    request(process.env.NEXT_PUBLIC_DATA_API + '/reviews', "POST", data)
      .then((reviewData) => {
        reviewData
        reset();
        setRating(null);
        document.body.classList.remove("review_opened");
        document.body.style.overflow = "visible";
        setActivePopup(null);
        document.body.style.overflow = "hidden";
        document.body.classList.add("success_opened");
      })
      .finally(() => {
        setDisabledBtn(false);
      })
  };


  useOnClickOutside(ref, () => {
    if (document.body.classList.contains("review_opened")) {
      document.body.classList.remove("review_opened");
      document.body.style.overflow = "visible";
      setTimeout(() => {
        setActivePopup(null);
      }, 500);
    }
  });

  return (
    <>
      {activePopup === 'review' &&
        <div className="review_popup fixed left-0 right-0 bottom-0 flex items-center justify-center pl-[17px] duration-500 transition-[top] top-[-100%] w-full h-full z-[999] overflow-x-hidden overflow-y-auto bg-blueDark2 bg-opacity-50 tablet:!p-20 tablet:h-[100dvh]">
          <div className="popup_container  bg-white relative p-20 w-full max-w-[640px] z-30 mx-auto" ref={ref}>
            <div className="title_line flex items-center w-full gap-10">
              <div className="popup_title flex-1 text-center font-bold text-2xl ">Submit a Review</div>
              <a
                href="/#"
                className="popup_close w-[40px] h-[40px] flex items-center justify-center border-2 border-blueDark1 gropu hover:bg-blueDark1 hover:opacity-100 hover:[&>svg&>path]:fill-white "
                onClick={(e) => {
                  e.preventDefault();
                  document.body.classList.remove("review_opened");
                  document.body.style.overflow = "visible"
                  setTimeout(() => {
                    setActivePopup(null);
                  }, 500);
                }}
              >
                <IconClose />
              </a>
            </div>
            <div className="review_form">
              <form
                className="flex flex-col gap-[24px] mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="input_container">
                  <div className="border-2 flex flex-col justify-center items-center p-4 gap-[20px]">
                    <h2 className="capitalize font-semibold leading-6 text-base ">hows everything going for you so far</h2>
                    <div className="stars flex gap-[25px]">
                      {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                          <label key={index} className=" cursor-pointer">
                            <input
                              {...register("rating")}
                              type="radio"
                              id={`rating-${currentRating}`}
                              value={currentRating}
                              onChange={() => {
                                setRating(currentRating)
                                setValue('rating', currentRating, {
                                  shouldValidate: true,
                                })
                              }}
                              className="hidden"
                            />
                            <IconStar
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(null)}
                              filled={(currentRating <= (hover || rating))}
                              strokemode={!(currentRating <= (hover || rating))}
                              scale={1.7}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  {errors.rating && (
                    <div className="error">{errors.rating.message}</div>
                  )}
                </div>
                <div className="input_container">
                  <label className="flex items-center gap-1" htmlFor="name">
                    <p className="font-bold">Full Name</p>
                    <span className="text-sm">(required)</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    placeholder="First Name"
                    className="w-full border-2 px-2.5 py-3 text-sm"
                  />
                  {errors.name && (
                    <div className="error">{errors.name.message}</div>
                  )}
                </div>
                <div className="input_container">
                  <label className="flex items-center gap-1" htmlFor="email">
                    <p className="font-bold">Email Address</p>
                    <span className="text-sm font-normal">(required)</span>
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="w-full border-2  px-2.5 py-3 text-sm"
                  />
                  {errors.email && (
                    <div className="error">{errors.email.message}</div>
                  )}
                </div>
                <div className="input_container">
                  <label className="flex items-center gap-1" htmlFor="message">
                    <p className="font-bold">Message</p>
                    <span className="text-sm">(required)</span>
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    placeholder="Message"
                    className="w-full border-2  px-2.5 py-3 text-sm resize-none "
                  ></textarea>
                  {errors.message && (
                    <div className="error">{errors.message.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className={
                    disabledBtn
                      ? " !opacity-50 pointer-events-none [&>svg]:opacity-100 relative submit_btn h-[40px] w-full  bg-blueDark2 text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
                      : " relative [&>svg]:opacity-0 submit_btn h-[40px] w-full  bg-blueDark2 text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
                  }
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="absolute left-[calc(50%-60px)] inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    ></path>
                  </svg>
                  {disabledBtn ? "Submit ..." : " Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}