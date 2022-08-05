import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import Head from "next/head"
import axiosInstance from "../util/axiosInstace"
import { Service } from "../types/Service"
import { OfferedService } from "../types/OfferedService"
import Map from "../components/ServiceView/MapView"
import SearchView from "../components/ServiceView/SearchView"
import { useState } from "react"

interface ServicePageProps {
  offeredServicesData: {
    offeredServices: OfferedService[]
    length: number
    numberOfRecords: number
  }
  services: Service[]
}

const ServicePage: NextPage<ServicePageProps> = ({
  offeredServicesData,
  services,
}) => {
  const [mapView, setMapView] = useState(false)
  return (
    <>
      <Head>
        <title>Service</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {mapView ? (
        <Map
          setMapView={() => setMapView(false)}
          offeredServicesData={offeredServicesData}
        />
      ) : (
        <SearchView
          offeredServicesData={offeredServicesData}
          services={services}
          setMapView={() => setMapView(true)}
        />
      )}
    </>
  )
}

export default ServicePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryString = context.resolvedUrl.includes("?")
    ? "offered-services" +
      context.resolvedUrl.slice(context.resolvedUrl.indexOf("?"))
    : "offered-services"
  const requestOfferedServices = axiosInstance.get(queryString)
  const requestServices = axiosInstance.get("/services")
  const response = await Promise.all([requestOfferedServices, requestServices])
  const offeredServices = response[0].data.offeredServices
  const services = response[1].data.services
  const offeredServicesData = {
    offeredServices,
    length: response[0].data.length,
    numberOfRecords: response[0].data.numberOfRecords,
  }
  return {
    props: { offeredServicesData, services },
  }
}
