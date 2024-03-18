const people = [
  {
    name: "John Doe",
    carName: "Verna",
    cartype: "sedan",
    email: "john@devui.com",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "Jane Doe",
    carName: "Verna",
    cartype: "sedan",
    email: "john@devui.com",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const DealHistory = () => {
  return (
    <>
      <section className="w-full container py-4">
        <div>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-xl font-semibold">History</h2>
              <p className="mt-1 text-sm font-medium text-gray-700"></p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <div className=" flex-1 py-2 align-middle">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700"
                        >
                          No.
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700"
                        >
                          <span>User&apos;s Name</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-semibold text-gray-700"
                        >
                          Car Name
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700"
                        >
                          Price
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((val, index) => (
                        <tr key={val.name}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={val.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {val.name}
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  {val.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm font-medium text-gray-900 ">
                              {val.carName}
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              {val.cartype}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            5, 00, 000
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end pt-6">
          <a
            href="#"
            className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900"
          >
            <span className="hidden lg:block">&larr; Previous</span>
            <span className="block lg:hidden">&larr;</span>
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            1
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            2
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            3
          </a>
          <a
            href="#"
            className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            4
          </a>
          <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
            <span className="hidden lg:block">Next &rarr;</span>
            <span className="block lg:hidden">&rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default DealHistory;
