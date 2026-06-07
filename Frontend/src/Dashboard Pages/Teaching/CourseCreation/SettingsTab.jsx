const SettingsTab = ({ lessonData, setLessonData }) => {

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Lesson Settings
      </h2>

      <div className="space-y-6">

        <div className="flex items-center justify-between border rounded-lg p-4">

          <div>
            <h3 className="font-medium">
              Free Preview
            </h3>

            <p className="text-sm text-neutral-500">
              Allow students to watch before purchase
            </p>
          </div>

          <input
            type="checkbox"
            
            onChange={(e) =>
              setLessonData({
                ...lessonData,
                isPreview: e.target.checked
              })
            }
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Duration (minutes)
          </label>

          <input
            type="number"
            
            onChange={(e) =>
              setLessonData({
                ...lessonData,
                duration: e.target.value
              })
            }
            className="border rounded-lg px-4 py-3 w-full"
          />

        </div>

      </div>

    </div>
  );
};

export default SettingsTab;