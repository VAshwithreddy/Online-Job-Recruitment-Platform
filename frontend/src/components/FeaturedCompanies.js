function FeaturedCompanies() {

  const companies = [
    { name: "Google", logo: "https://img.logo.dev/google.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" },
    { name: "Amazon", logo: "https://img.logo.dev/amazon.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" },
    { name: "Microsoft", logo: "https://img.logo.dev/microsoft.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" },
    { name: "Netflix", logo: "https://img.logo.dev/netflix.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" },
    { name: "Meta", logo: "https://img.logo.dev/meta.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" },
    { name: "Apple", logo: "https://img.logo.dev/apple.com?token=pk_NmfvyjbbSlS1Wu1r23-phA&size=166&format=png&theme=light&retina=true" }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-16">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Top Companies Hiring Now
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover opportunities from leading companies
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition flex items-center justify-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl hover:scale-105 transition duration-300 flex items-center justify-center"
              />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default FeaturedCompanies;