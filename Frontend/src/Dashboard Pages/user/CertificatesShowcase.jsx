
import React from 'react'
import { FiAward } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import { useEnrolledCertificate } from '@/hooks/EnrollmentHooks/useEnrolledCourses'

const CertificatesShowcase = () => {

  const { data: certificates } = useEnrolledCertificate()

  return (
    <div className="min-h-screen w-full bg-white px-3 py-5 sm:px-5 md:px-6 lg:px-8">

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          My Certificates
        </h1>

        <p className="mt-1 text-sm sm:text-base">
          View and download your SkillNest certificates.
        </p>
      </div>

      {certificates?.length === 0 ? (

        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center">

          <FiAward className="mb-3 text-4xl text-slate-300" />

          <h2 className="text-lg font-semibold text-slate-700">
            No certificates yet
          </h2>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Complete a course to earn your first SkillNest certificate.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {certificates?.map((certificate) => (

            <div
              key={certificate?._id}
              className="flex w-full max-w-[350px] flex-col gap-2"
            >

              {/* PDF PREVIEW */}

              <div className="h-[180px] w-full overflow-hidden rounded-lg border border-black/20 bg-slate-100">

                <iframe
                  src={certificate?.pdfUrl}
                  title="Certificate Preview"
                  className="h-full w-full border-0"
                />

              </div>


              {/* CERTIFICATE INFO */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 flex-col">

                  <span className="truncate font-heading text-lg font-medium capitalize text-black/90">
                    {certificate?.enrollmentId?.courseId?.title}
                  </span>

                  <span className="text-base text-slate-600">
                    {new Date(
                      certificate?.issueDate
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>

                </div>


                {/* DOWNLOAD */}

                <a
                  href={certificate?.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-black/20 px-3 py-2 text-sm transition hover:brightness-95 sm:w-auto"
                >
                  <FaDownload className="text-sm" />
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default CertificatesShowcase

