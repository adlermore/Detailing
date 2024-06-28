import { BannerData } from '@/utils/data/servicesData'
import ContactBanner from '@/components/ContactBanner.jsx'
import MainBanner from '@/components/layout/MainBanner.jsx'
import Service from '@/components/Service'

// metadata Init
const initialMetadata = {
  title: "Services",
}

// dynamic metadata function 
export async function generateMetadata({ searchParams }) {
  if (!searchParams.id) {
    return initialMetadata;
  }

  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/services', { cache: 'no-cache' });
  const data = await res.json();
  const service = data?.data.find(el => el.id == searchParams.id);

  if (!searchParams.id) {
    return initialMetadata;
  }

  return {
    title: service.title,
    openGraph: {
      title: service.title,
      images: [process.env.NEXT_PUBLIC_DATA + '/uploads/' + service.image]
    },
  }
}

async function Services() {

  //services list fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/services', { cache: 'no-cache' })
  const { data: servicesList } = await res.json()

  //page settings data fetching 
  const mainRes = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/service-and-price', { cache: 'no-cache' })
  const { data: serviceData } = await mainRes.json()

  return (
    <main className="w-ful">
      <MainBanner
        isMainBanner={false}
        tagline={BannerData?.tagline}
        title={serviceData.services_header?.title}
        description={serviceData.services_header?.short_description}
        link={BannerData?.link}
        linkHref={BannerData?.linkHref}
        image={serviceData.services_header?.image}
      />
      <div className='w-full py-50 bg-bgGray mobile:py-[30px]'>
        <div className='custom_container'>
          <div className='text-[32px] font-bold text-center mobile:text-2xl '>{serviceData.services.title}</div>
          <div className='text-center max-w-[900px] mx-auto mt-8 text-sm'>
            {serviceData.services?.short_description}
          </div>
          <div className='w-full relative mt-[32px] laptop:gap-20 tablet:text-2xl'>
            {servicesList.map((service, i) => (
              <Service key={i} image={service.image} title={service.title} price={service.price} description={service.description} features={service.features} id={service.id} />
            ))}
          </div>
        </div>
      </div>
      <ContactBanner BannerData={serviceData?.footer} />
    </main>
  )
}

export default Services