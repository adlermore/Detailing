export default async function PrivacyPolicy() {
  
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/categories/get-by-slug/privacy_policy', {cache: 'no-cache'});
  const {data: policyData} = await res.json();

  return (
    <div className="TermsofService custom_container ">
      <div className="mt-[130px] max-w-[768px] mx-auto flex justify-center flex-col gap-[32px] mb-28 laptop:mb-[32px] tablet:mb-[16px]">
        <div>
          <h1 className="text-center font-bold  text-[32px]">{policyData.title}</h1>
          <p className="text-center color- to-blueDark2 text-16">Effective date: April 3, 2023</p>
        </div>
        <div>
          <div key={policyData.id}>
            <div dangerouslySetInnerHTML={{ __html: policyData.description }} className="[&>p]:mb-[30px] [&>h2]:font-bold" />
          </div>
        </div>
      </div>
    </div>
  )
}