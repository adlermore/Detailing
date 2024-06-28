import servicesBanner from '@/public/images/servicesBanner.png';
import service1 from '@/public/images/mainSlider1.png'
import service2 from '@/public/images/mainSlider2.png'
import service3 from '@/public/images/mainSlider3.png'

export const BannerData = {
	tagline: 'Tagline',
	title: `Short heading here`,
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
	image: servicesBanner.src
}

export const ServicesList = [
	{
		title: 'Exterior Vehicle Detailing',
		price: '$14.99',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`,
		futures: ['Feature text goes here', 'Feature 1', 'Feature 2'],
		image: service1
	},
	{
		title: 'Interior Vehicle Detailing',
		price: '$20.99',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`,
		futures: ['Feature text goes here', 'Feature 1', 'Feature 2', 'Feature 3'],
		image: service2
	},
	{
		title: 'Protective Paint Film',
		price: '$22.99',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`,
		futures: ['Feature text goes here', 'Feature 1', 'Feature 2', 'Feature 3'],
		image: service3
	},
	{
		title: 'Protective Paint Film',
		price: '$14.99',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`,
		futures: ['Feature text goes here', 'Feature 1', 'Feature 2', 'Feature 3'],
		image: service1
	}
]