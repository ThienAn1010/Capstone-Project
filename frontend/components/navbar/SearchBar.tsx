import Select from "react-select"
import useGetAllServices from "../../hooks/useGetAllServices"
import { useRouter } from "next/router"

export default function SearchBar() {
  const router = useRouter()
  const { data, isLoading } = useGetAllServices()
  const categoryOptions = data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const handleChange = (e: any) => {
    router.push(`/service?serviceId=${e.value}`)
  }

  const customStyles = {
    input: (base: any) => ({
      ...base,
      "input:focus": {
        boxShadow: "none",
      },
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    option: (styles: any) => ({
      ...styles,
      cursor: "pointer",
    }),
    control: (styles: any) => ({
      ...styles,
      cursor: "pointer",
    }),
  }

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className="w-full">
              <Select
                id="disable-searchbar-select"
                instanceId="disable-searchbar-select"
                isDisabled={true}
                isLoading={true}
                placeholder={<>Loading...</>}
                styles={customStyles}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className="w-full">
              <Select
                id="searchbar-select"
                instanceId="searchbar-select"
                isClearable={true}
                isSearchable={true}
                isLoading={isLoading}
                options={categoryOptions}
                onChange={handleChange}
                placeholder={<>Search Categories</>}
                menuPortalTarget={document.body}
                styles={customStyles}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
