import IconStar from "@/public/icons/IconStar.jsx";
import Link from "next/link";

async function ReviewHome() {

  //HomePage Review Data fetching
  const Reviewres = await fetch( process.env.NEXT_PUBLIC_DATA_API + "/reviews?per_page=3", {cache: 'no-cache'});
  const { data } = await Reviewres.json();

  return (
    <div className="py-50 bg-bgGray mt-40 laptop:hidden">
      <div className="custom_container">
        <div className="text-center justify-center flex items-center gap-8 font-bold text-[32px] [&>svg]:scale-110 ">
          Customer Testimonials {"("}
          <IconStar />
          {data.rating}{")"}
        </div>
        <div className="text-sm text-blueDark2 text-center max-w-[768px] mx-auto mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="grid grid-cols-3 gap-40 mt-32">
          {data.reviews.data.map((review, i) => (
            <div key={i}>
              <div className="flex gap-[4px] justify-center">
                {Array.from({ length: review.rating }, (_, index) => (
                  <IconStar key={index} filled />
                ))}
                {Array.from({ length: 5 - review.rating }, (_, index) => (
                  <IconStar
                    strokemode={true}
                    key={index + review.rating}
                    filled={false}
                  />
                ))}
              </div>
              <div className="text-sm text-center mt-[24px] ellipsis3 min-h-[63px]">
                {review.message.replace(/(<([^>]+)>)/gi, "")}
              </div>
              <div className="relative mx-auto mt-[24px] w-[56px] text-xl font-semiBold h-[56px] bg-siteBlue flex justify-center items-center text-white">
                {review.name[0]}
              </div>
              <div className="text-center text-base mt-16 font-semibold ">
                {review.name}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/testimonials"
          className="px-16 py-8 border border-blueDark1 w-fit mx-auto mt-[40px] flex hover:bg-blueDark2 hover:text-white hover:opacity-100"
        >
          Read More Reviews
        </Link>
      </div>
    </div>
  );
}

export default ReviewHome;
