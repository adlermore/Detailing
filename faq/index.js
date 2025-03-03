import FAQwrapper from "@/components/home/FAQwrapper";
import { postsSlice } from "@/store/slices/posts";
import { store } from "@/store";
import Head from "next/head";

export default function FAQ({ data }) {

    const ldFaqWeb = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "IRP Registration FAQs | Common Questions About IRP Services",
        "description": "Discover responses to common inquiries regarding IRP registration, compliance, and services. See how IRPRegistrationServices.com streamlines your trucking requirements.",
        "url": "https://irpregistrationservices.com/faq/",
        "image": "https://irpregistrationservices.com/assets/images/logo.webp?w=384&q=100",
        "author": {
            "@type": "Person",
            "name": "IRP Registration"
        }
    }

    const ldFaqOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "IRP Registration FAQs",
        "url": "https://irpregistrationservices.com/faq/",
        "logo": "https://irpregistrationservices.com/assets/images/logo.webp?w=384&q=100",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-888-202-4927",
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
        },
        "sameAs": [
            "https://www.facebook.com/DOTOperatingAuthority/",
            "https://twitter.com/DOTOperations/",
            "https://www.pinterest.com/dotoperatingaut/"
        ]
    }

    const ldFaqBreadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://irpregistrationservices.com/faq/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQs",
                "item": "https://irpregistrationservices.com/faq/"
            }
        ]
    }

    const ldFaqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which Vehicles Qualify?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Any commercial vehicle that operates at a gross vehicle weight (GVW) or combined gross weight (CGW) of 26,001 pounds or heavier requires IRP registration. Without it, these commercial vehicles will have to obtain alternative commercial trip permits when operating in neighboring jurisdictions. Vehicles that weigh less than 26,000 pounds could be exempt from IRP credentials. To be completely sure about whether or not to file for IRP, reference this IRP directory of all the jurisdictions it covers."
                }
            },
            {
                "@type": "Question",
                "name": "What's the diffecence between an IRP-Apportioned Plate and a CaB Card?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The International Registration Plan (IRP) allows commercial vehicles the option to legally operate in jurisdictions different from the base jurisdiction, for a cost-effective price. Oftentimes, it will come in the form of a license plate with the word “apportioned” clear to read. Meanwhile, a Cab Card serves as evidence of registration, besides a plate, for an apportioned vehicle registered under the Plan. This registration is typically by the base jurisdiction and carried in/on the identified vehicle."
                }
            },
            {
                "@type": "Question",
                "name": "How are Fees Calculated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Apportioned Registration Fee for operating a commercial vehicle through state lines varies per jurisdiction. When it comes to the exact math, jurisdictions often get their results from multiplying the mileage percentage traveled by a fleet with the standard state or province registration fee. The weight of your truck also plays into the final amount due when acquiring IRP legitimacy. So be sure to consult us when beginning this process, as our team knows how to do the math that’ll get you and your crew on the interstate in no time!"
                }
            },
            {
                "@type": "Question",
                "name": "Why are the Fees for Registering so High?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The fees comes from the jurisdiction and have many factors that could increase your apportioned registration. Since every jurisdiction sets their own rates, they are also subject to change at any time. Rates could go up if a larger number of your fleet travels through jurisdictions with higher fees."
                }
            },
            {
                "@type": "Question",
                "name": "Who Must Register Under The IRP?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Any commercial vehicle that crosses into multiple jurisdictions must register under the IRP. Furthermore, they must either:\n\n- Have at least three axles.\n- Have two or more axles and a gross vehicle weight of more than 26,000 pounds.\n- Have a combined weight of the truck and trailer exceeding 26,000 pounds.\n\nThere are some exceptions for recreational vehicles, restricted vehicles, and government-owned vehicles. It is optional for vehicles with a combined weight of less than 26,000 pounds to register."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to register my trailer or semi-trailer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, the IRP does not require the apportionment of trailers at this time. The by-law Section 515 of the IRP plan includes the language, “A trailer, semi-trailer, or auxiliary axle that is properly registered in any jurisdiction shall be granted full and free reciprocity.”"
                }
            },
            {
                "@type": "Question",
                "name": "Can I get my credentials instantly?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Before you receive your credentials, you must submit all requirements. Additionally, some jurisdictions may delay the approval process."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to return my plate when we close the fleet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Some jurisdictions require this practice. These jurisdictions do this to create an added layer of protection against the misuse of unexpired plates. Check with your local jurisdiction to see if this is a requirement for your fleet."
                }
            }, {
                "@type": "Question",
                "name": "What is Base Jurisdiction?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The base jurisdiction is where the motor carrier establishes its headquarters of operation. This is where the business can receive correspondence and have a physical address. All jurisdictions require you to have proof of operations. This proof can be utility bills, state government provided documents of corporation, driver’s licenses, titles, tax returns, or health care cards."
                }
            }, {
                "@type": "Question",
                "name": "Can I have different IRP and IFTA base jurisdictions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Your base jurisdiction does not need to be the same for both registration permits."
                }
            }, {
                "@type": "Question",
                "name": "Can I still register my vehicle under the IRP if my vehicle is less than 26,000 pounds?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The IRP still allows vehicles to opt-in to register."
                }
            }, {
                "@type": "Question",
                "name": "What is the Average Per Vehicle Distance (APVD)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The APVD is the Average Per Vehicle Distance. This is used to calculate jurisdiction-specific fees. It measures the average distance traveled by all vehicles from your registered jurisdiction to all other IRP member jurisdictions."
                }
            }, {
                "@type": "Question",
                "name": "Why is the APVD different in each jurisdiction?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The APVD chart is an infographic representation of the average vehicle’s distance from your base jurisdiction to all other IRP member jurisdictions. Vehicles based in different jurisdictions will likely not travel the same distance and therefore have a different APVD."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to have every jurisdiction on my cab card even if I don’t travel in all of them?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Every possible jurisdiction will be on your cab card. This is done to help simplify the registration process and allow flexibility."
                }
            },
            {
                "@type": "Question",
                "name": "I have my own estimated distances. Can I use those?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unfortunately, no. The IRP will use the Average Per Vehicle Distance chart in the event that you do not have the actual reported miles from the previous year."
                }
            },
            {
                "@type": "Question",
                "name": "How do I handle a lapsed registration with and without distance?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "If you let your IRP plan lapse for more than 18 months, you will be required to use the Average Per Vehicle Distance Chart miles. If it has been less than 18 months, the application will be treated as a renewal."
                }
            },
            {
                "@type": "Question",
                "name": "What do I do if I have no actual distance in my base jurisdiction?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The IRP requires motor carriers to have some distance traveled in their base jurisdiction. If you do not, your jurisdiction may subject your application to an approval process. Each jurisdiction has its own requirements and approval strategies."
                }
            },
            {
                "@type": "Question",
                "name": "Do I really need to keep records?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Your records are used to support the distance reported on the IRP application and IFTA Tax returns."
                }
            },
            {
                "@type": "Question",
                "name": "What can cause an audit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There are numerous reasons you could receive an audit. It very well could just be random and you unluckily drew the short straw. Another reason could come from inconsistencies in reporting. Every motor carrier is subject to an audit at any time, and each base jurisdiction has its own guidelines."
                }
            },
            {
                "@type": "Question",
                "name": "Do different jurisdictions require different documents?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The IRP requires the same documents and information across the board for all jurisdictions. It has the same requirements in regards to record keeping and maintains these requirements for the US and Canada. However, base jurisdictions may require specific supporting documents such as local ad valorem or sales taxes."
                }
            },
            {
                "@type": "Question",
                "name": "How long do I need to save my records?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The IRP requires you to keep records and supporting documents for the current year and the past 3 years."
                }
            }
        ]
    }

    return (
        <>
            <Head>
                <title>IRP Registration FAQs | Common Questions About IRP Services</title>
                <meta name="description" content="Discover responses to common inquiries regarding IRP registration, compliance, and services. See how IRPRegistrationServices.com streamlines your trucking requirements." />
                <meta property="og:title" content="IRP Registration FAQs | Common Questions About IRP Services" />
                <meta property="og:description" content="Discover responses to common inquiries regarding IRP registration, compliance, and services. See how IRPRegistrationServices.com streamlines your trucking requirements." />
                <meta property="og:url" content="https://irpregistrationservices.com/faq/" />
                <meta name="twitter:title" content="IRP Registration: Easy Steps to Register Your Vehicle" />
                <meta name="twitter:description" content="Register for the IRP (International Registration Plan) and ensure compliance for your commercial vehicles. Start your IRP registration process now with us." />
                <link rel="canonical" href="https://irpregistrationservices.com/faq/" />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaqWeb) }}
                />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaqPage) }}
                />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaqBreadcrumbList) }}
                />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaqOrganization) }}
                />
            </Head>
            <FAQwrapper faq={data} squares={true} />
        </>
    )
}

export async function getServerSideProps() {

    // 👇 ( SSR ) Get selected article data
    const data = await store.dispatch(postsSlice.endpoints.getFaq.initiate());

    if (data.isError) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data: data?.data?.data || null
        }
    }
}