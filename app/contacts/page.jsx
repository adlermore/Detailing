'use client'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from "react-input-mask";
import { MapProvider } from "@/providers/Map-provider";
import { MapComponent } from "@/components/Map";
import { useEffect, useState } from "react";
import { contactSchema } from "@/validation/contactSchema";
import request from "@/utils/hooks/request";

export default function ContactUs() {
  const [contactInfo, setContactInfo] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    setValue,
    clearErrors,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
 formState;

  useEffect(() => {
    request(process.env.NEXT_PUBLIC_DATA_API + '/categories/get-by-slug/contact_us')
      .then((contact) => {
        setContactInfo(contact.data)
      })
      .catch((error) => {
        throw new Error(error)
      });
  }, [])

  const onSubmit = (data) => {
    setDisabledBtn(true);
    request(process.env.NEXT_PUBLIC_DATA_API + '/messages', "POST", data)
      .then((contactData) => {
        reset();
        setValue('phone', '');
        document.body.style.overflow = "hidden";
        document.body.classList.add("success_opened");
      })
      .finally(() => {
        setDisabledBtn(false);
      })
  };
  return (
    <div className="mt-[130px]">
      <div className="custom_container min-h-[55px]">
        <h1 className="font-bold text-32">{contactInfo?.title}</h1>
        <p>{contactInfo?.short_description}</p>
      </div>
      <div className=" max-w-[1220px] w-full mx-auto laptop:gap-[30px]  tablet:grid-cols-1  grid grid-cols-2 items-center gap-[80px] laptopHorizontal:px-6 tablet:flex-col tablet:gap-[20px] ">
        <div className=" w-full tablet:w-full">
          <form
            className="flex flex-col gap-[24px] mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              {errors.name
                ? <div className="error laptop:text-xs laptop:whitespace-nowrap">{errors.name.message}</div>
                : <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
              }
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
              {errors.email
                ? <div className="error laptop:text-xs laptop:whitespace-nowrap">{errors.email.message}</div>
                : <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
              }
            </div>
            <div className="input_container">
              <label className="flex items-center gap-1" htmlFor="phone">
                <p className="font-bold">Phone Number</p>
                <span className="text-sm">(required)</span>
              </label>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => {
                  return (
                    <InputMask
                      {...field}
                      {...{
                        ...register('phone'), onChange: (e) => {
                          setValue('phone', e.target.value);
                          clearErrors('phone');
                        }
                      }}
                      mask="(999)-999-9999"
                      type="text"
                      id="phone"
                      className="w-full border-2  px-2.5 py-3 text-sm  "
                      placeholder="Enter your phone number"
                    />
                  )
                }}
              />
              {errors.phone
                ? <div className="error laptop:text-xs laptop:whitespace-nowrap">{errors.phone.message}</div>
                : <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
              }
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
              {errors.message
                ? <div className="error laptop:text-xs laptop:whitespace-nowrap">{errors.message.message}</div>
                : <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
              }
            </div>
            <button
              type="submit"
              className={`relative w-[108px]  submit_btn h-[48px] self-start duration-300  justify-center flex items-center  ${disabledBtn
                ? " !opacity-50  pointer-events-none [&>svg]:opacity-100  px-6 py-3 border  hover:bg-blueDark2 hover:text-white text-base font-semibold  hover:opacity-70 "
                : " [&>svg]:opacity-0  px-6 py-3 border  hover:bg-blueDark2 hover:text-white border-blueDark2 text-base font-semibold text-blueDark2"}`
              }
            >
              {disabledBtn && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="absolute left-[calc(50% - 50px)] inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
              )}
              {disabledBtn ? "" : " Submit"}
            </button>
          </form>
        </div>
        <div className="grow h-[413px] tablet:mb-[35px] w-full shadow-custom tablet:h-[450px] mobile:h-[308px] tablet:w-full">
          <MapProvider>
            <MapComponent />
          </MapProvider>
        </div>
      </div>
    </div>
  )
}
