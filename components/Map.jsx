'use client'

import request from "@/utils/hooks/request";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapComponent = () => {
	const [settingsData, setSettingsData] = useState(null)

	useEffect(() => {
		request(process.env.NEXT_PUBLIC_DATA_API + '/settings')
			.then((settings) => {
				setSettingsData(settings.data);
			})
	}, [])

	const defaultMapContainerStyle = {
		width: '100%',
		height: '100%',
	};

	const defaultMapOptions = {
		zoomControl: false,
		tilt: 0,
		gestureHandling: 'auto',
	};

	const defaultMapZoom = 18

	const defaultMapCenter = {
		lat: settingsData?.latitude,
		lng: settingsData?.longitude
	}

	return (

		<div className="w-full h-full shadow-custom">
			{settingsData &&
				<GoogleMap
					mapContainerStyle={defaultMapContainerStyle}
					center={defaultMapCenter}
					zoom={defaultMapZoom}
					options={defaultMapOptions}>
					<Marker
						position={defaultMapCenter}
						title="Default Marker"
					/>
				</GoogleMap>
			}
		</div>
	)
};

export { MapComponent };