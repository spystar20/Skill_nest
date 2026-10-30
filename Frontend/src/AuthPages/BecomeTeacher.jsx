
import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { usecreateTeacherProfile } from '@/hooks/authHooks'

const BecomeTeacher = () => {
  const { setUser } = useAuth()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { mutate: createProfile } = usecreateTeacherProfile()

  const [formData, setFormData] = useState({
    title: '',
    experience: '',
    specialization: '',
    organization: '',
    website: '',
    linkdin: '',
    bio: ''
  })

  const ExperienceOpt = [
    { value: '0-1 Years', label: '0-1 Years' },
    { value: '1-3 Years', label: '1-3 Years' },
    { value: '3-5 Years', label: '3-5 Years' },
    { value: '5-10 Years', label: '5-10 Years' },
    { value: '10+ Years', label: '10+ Years' }
  ]

  const ExpertiseOpt = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' }
  ]

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '44px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#7C8FD6' : '#E5E7EB',
      boxShadow: state.isFocused ? '0 0 0 1px #7C8FD6' : 'none',
      '&:hover': { borderColor: '#7C8FD6' }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#0A1931'
        : state.isFocused
          ? '#EEF2FF'
          : 'white',
      color: state.isSelected ? 'white' : '#111827',
      cursor: 'pointer'
    }),
    menu: base => ({
      ...base,
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: 20
    })
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNew = () => {
    createProfile(formData, {
      onSuccess: (data) => {
        setUser({ ...data?.existingUser, ...data?.newTeacher })
        toast.success('Role updated')
        setTimeout(() => navigate('/profile'), 1000)
      }
    })
  }

  const inputClass = 'w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-text-light'

  const steps = ['Background', 'Expertise', 'Social']

  return (
    <div className="min-h-screen w-full bg-page px-4 py-10 pt-28 md:py-32 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl overflow-visible rounded-2xl border border-border bg-card shadow-sm">

        {/* Progress */}
        <div className="px-5 pt-8 sm:px-8">
          <div className="flex items-center justify-center">
            {steps.map((label, index) => {
              const item = index + 1
              return (
                <React.Fragment key={label}>
                  <div className="flex min-w-0 flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 sm:h-10 sm:w-10 ${
                      step >= item
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-text-light'
                    }`}>
                      {item}
                    </div>
                    <span className={`mt-2 text-xs sm:text-sm ${
                      step >= item ? 'font-medium text-primary' : 'text-text-light'
                    }`}>
                      {label}
                    </span>
                  </div>

                  {index < 2 && (
                    <div className={`mx-2 mb-5 h-1 flex-1 rounded-full sm:mx-4 ${
                      step > item ? 'bg-accent' : 'bg-gray-100'
                    }`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 sm:p-8">

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                  Professional Background
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-light sm:text-base">
                  Tell students about your professional experience and current role. This helps build trust and showcase your expertise.
                </p>
              </div>

              <form className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Professional Title</label>
                  <input
                    value={formData.title}
                    onChange={e => updateField('title', e.target.value)}
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Experience</label>
                  <Select
                    value={ExperienceOpt.find(option => option.value === formData.experience) || null}
                    onChange={selected => updateField('experience', selected?.value || '')}
                    isClearable
                    options={ExperienceOpt}
                    styles={selectStyles}
                    placeholder="Select your experience"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Organization</label>
                  <input
                    value={formData.organization}
                    onChange={e => updateField('organization', e.target.value)}
                    type="text"
                    className={inputClass}
                  />
                </div>
              </form>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg bg-button px-6 py-2.5 text-sm font-medium text-white transition hover:bg-button-hover"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                  Teaching Expertise
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-light sm:text-base">
                  Share the subjects and skills you're most confident teaching. Students will use this information to discover your courses.
                </p>
              </div>

              <form className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Specialization</label>
                  <CreatableSelect
                    value={formData.specialization
                      ? { value: formData.specialization, label: formData.specialization }
                      : null}
                    onChange={selected => updateField('specialization', selected?.value || '')}
                    isClearable
                    options={ExpertiseOpt}
                    styles={selectStyles}
                    placeholder="Choose or add your specialization"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={e => updateField('bio', e.target.value)}
                    rows={5}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </form>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:bg-page"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-lg bg-button px-6 py-2.5 text-sm font-medium text-white transition hover:bg-button-hover"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <div>
                <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                  Portfolio & Social Links
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-light sm:text-base">
                  Add links to your professional profiles and portfolio so students can learn more about your work and achievements.
                </p>
              </div>

              <form className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Website</label>
                  <input
                    value={formData.website}
                    onChange={e => updateField('website', e.target.value)}
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">LinkedIn</label>
                  <input
                    value={formData.linkdin}
                    onChange={e => updateField('linkdin', e.target.value)}
                    type="text"
                    className={inputClass}
                  />
                </div>
              </form>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:bg-page"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNew}
                  className="rounded-lg bg-button px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-button-hover"
                >
                  Submit
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default BecomeTeacher
