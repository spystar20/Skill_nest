import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { RxCross1 } from 'react-icons/rx'
import Loader from '@/utils/Loader'
import { useCreateCourse } from '@/hooks/CoursesHooks/courseMutation'

const AddCourse = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: '',
    priceType: '',
    price: '',
    difficulty: ''
  })

  const [thumbnail, setThumbnail] = useState('')
  const [preview, setPreview] = useState('')

  const { mutate: createCourse, isPending } = useCreateCourse()

  const handleSubmit = () => {

    const form = new FormData()

    form.append("title", formData.title)
    form.append("desc", formData.desc)
    form.append("category", formData.category)
    form.append("priceType", formData.priceType)
    form.append("price", formData.price)
    form.append("difficulty", formData.difficulty)
    form.append("thumbnail", thumbnail)

    createCourse(form, {
      onSuccess: (data) => {

        toast.success("course uploaded succesfully")

        setTimeout(() => {
          navigate(`/dashboard/teacher/courses/${data?.newCourse._id}/edit`)
        }, 1000)

      }
    })
  }

  const handlePreview = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ]

    if (!allowedTypes.includes(file.type)) {
      return toast.error("invalid file type")
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("limit exceeds")
    }

    setThumbnail(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const Level = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ]

  const Price = [
    { value: 'Free', label: 'Free' },
    { value: 'Paid', label: 'Paid' },
  ]

  const ExpertiseOpt = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' }
  ]

  return (

    <div className="min-h-screen w-full bg-white/90 px-4 py-6 sm:px-6 md:px-10 lg:px-12 md:py-12 box-border flex justify-center items-center">

      <div className="w-full max-w-5xl flex flex-col bg-white/85 rounded-lg">

        {isPending && <Loader />}

        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 p-4 sm:p-6 md:p-8 lg:p-10">

          {/* Header */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold">
              Create Your Course
            </h2>

            <p className="mt-2 font-body text-sm sm:text-base text-neutral-700 max-w-2xl">
              Set up the basic information for your course. This will be visible to students.
            </p>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-5 sm:gap-6">

            {/* Title + Description + Thumbnail */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

              {/* Left */}
              <div className="flex flex-col gap-5">

                {/* Course Title */}
                <div className="flex flex-col gap-2">

                  <label className="text-base sm:text-lg font-medium text-neutral-900">
                    Course Title
                  </label>

                  <input
                    value={formData.title}
                    placeholder="e.g. Complete React Development Bootcamp"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value
                      })
                    }
                    type="text"
                    className="w-full border placeholder:text-neutral-400 border-black/20 disabled:bg-neutral-100 placeholder:text-sm focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2.5"
                  />

                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">

                  <label className="text-base sm:text-lg font-medium text-neutral-900">
                    Short Description
                  </label>

                  <textarea
                    value={formData.desc}
                    placeholder="Write a short summary of your course (1–2 lines)"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        desc: e.target.value
                      })
                    }
                    className="w-full min-h-28 resize-none border placeholder:text-neutral-400 border-black/20 disabled:bg-neutral-100 placeholder:text-sm focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2.5"
                  />

                </div>

              </div>

              {/* Thumbnail */}
              <div className="border-2 border-black/60 border-dashed rounded-lg p-4 sm:p-5 min-h-64 sm:min-h-72 flex flex-col items-center justify-center">

                {!preview ? (

                  <>

                    <img
                      src="https://i.pinimg.com/1200x/ae/3f/c0/ae3fc0a9ed8e7f4edb630e7492ee22bd.jpg"
                      className="w-12  sm:w-32 sm:h-32 object-cover opacity-90 rounded-lg"
                      alt=""
                    />

                    <h2 className="font-medium text-neutral-700 text-sm sm:text-lg text-center mt-3">
                      Drop your image here or{" "}
                      <span className="text-blue-500">
                        Browse
                      </span>
                    </h2>

                    <label className="bg-black px-4 py-2 text-sm sm:text-base text-white mt-3 rounded-sm cursor-pointer hover:bg-neutral-800">

                      Choose Image

                      <input
                        type="file"
                        className="hidden"
                        onChange={handlePreview}
                      />

                    </label>

                  </>

                ) : (

                  <div className="w-full flex flex-col gap-3">

                    <img
                      src={preview}
                      className="w-full h-48 sm:h-60 rounded-lg object-cover"
                      alt=""
                    />

                    <div className="border rounded-lg w-full p-3 gap-3 flex items-center justify-between">

                      <span className="flex flex-col min-w-0">

                        <span className="text-sm truncate capitalize">
                          {thumbnail.name}
                        </span>

                        <span className="text-xs text-neutral-500">
                          {(thumbnail.size / 1024 / 1024).toFixed(2)}MB
                        </span>

                      </span>

                      <RxCross1
                        className="shrink-0 cursor-pointer hover:text-red-500"
                        onClick={() => {
                          setPreview('')
                          setThumbnail(null)
                        }}
                      />

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* Category / Difficulty / Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

              {/* Category */}
              <div className="flex flex-col gap-2">

                <label className="text-base sm:text-lg font-medium text-neutral-900">
                  Category
                </label>

                <CreatableSelect
                  className="w-full"
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      category: selected?.value || ''
                    })
                  }
                  isClearable
                  options={ExpertiseOpt}
                />

              </div>

              {/* Difficulty */}
              <div className="flex flex-col gap-2">

                <label className="text-base sm:text-lg font-medium text-neutral-900">
                  Difficulty Level
                </label>

                <Select
                  className="w-full"
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      difficulty: selected?.value || ''
                    })
                  }
                  isClearable
                  options={Level}
                />

              </div>

              {/* Pricing */}
              <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">

                <label className="text-base sm:text-lg font-medium text-neutral-900">
                  Pricing Type
                </label>

                <Select
                  className="w-full"
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      priceType: selected?.value || ''
                    })
                  }
                  isClearable
                  options={Price}
                />

              </div>

            </div>
 {(formData.priceType=== 'Paid') && (
          
            <div className="flex flex-col gap-2">

              <label className="text-base sm:text-lg font-medium text-neutral-900">
                Course Price
              </label>

              <input
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value
                  })
                }
                type="number"
                placeholder="e.g. 999"
                className="w-full border border-black/20 rounded-lg px-3 py-2.5 outline-none focus:ring-1 focus:ring-neutral-800"
              />

            </div>
)}
          </form>

          {/* Submit */}
          <div className="flex justify-end">

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-neutral-700 px-6 py-2 rounded-full text-white/90 flex gap-2 items-center justify-center text-base sm:text-lg hover:scale-95 transition-all duration-200 ease-out cursor-pointer shadow-2xl"
            >
              Submit
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AddCourse