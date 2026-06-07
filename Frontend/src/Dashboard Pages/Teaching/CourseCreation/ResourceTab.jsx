const ResourcesTab = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Resources
      </h2>

      <div className="border-2 border-dashed rounded-xl p-10 text-center">

        <h3 className="font-semibold">
          Upload PDFs & Resources
        </h3>

        <label className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
          Upload Resource
          <input type="file" className="hidden" />
        </label>

      </div>

      <div className="mt-6 space-y-3">

        <div className="border rounded-lg p-3 flex justify-between">
          <span>React Notes.pdf</span>

          <button className="text-red-500">
            Delete
          </button>
        </div>

      </div>

    </div>
  );
};

export default ResourcesTab;