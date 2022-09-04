import Select from "react-select"
import useGetAllServices from "../../hooks/useGetAllServices"

export default function SearchBar() {
  const { data, isLoading } = useGetAllServices()
  const categoryOptions = data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  return (
    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
      <div className="w-full">
        <Select
          isClearable={true}
          isSearchable={true}
          isLoading={isLoading}
          options={categoryOptions}
          isMulti
          placeholder={<>Search Categories</>}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
