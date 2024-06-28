export default async function TermsofService() {
  
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/categories/get-by-slug/terms_of_service', {cache: 'no-cache'});
  const { data: termsData } = await res.json();

  return (
    <div className="TermsofService custom_container ">
      <div className="mt-[130px] max-w-[768px] mx-auto flex justify-center flex-col gap-[32px] mb-28 laptop:mb-[32px] tablet:mb-[16px]">
        <div>
          <h1 className="text-center font-bold  text-[32px]">{termsData.title}</h1>
          <p className="text-center color- to-blueDark2 text-16">Effective date: April 3, 2023</p>
        </div>
        <div>
          <div key={termsData.id}>
            <div dangerouslySetInnerHTML={{ __html: termsData.description }} className="[&>p]:mb-[30px] [&>h2]:font-bold" />
          </div>
        </div>
      </div>
    </div>
  )
}