
import { useState } from 'react'
import { FiAward, FiX } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import {
  useDownloadCertificate,
  useEnrolledCertificate
} from '@/hooks/EnrollmentHooks/useEnrolledCourses'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const CertificatePdfPreview = ({ pdfUrl, width }) => {
  return (
    <Document
      file={pdfUrl}
      loading={
        <div className="flex h-full items-center justify-center text-sm text-text-light">
          Loading certificate...
        </div>
      }
      error={
        <div className="flex h-full items-center justify-center text-sm text-error">
          Unable to load certificate
        </div>
      }
    >
      <Page
        pageNumber={1}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  )
}

const CertificatesShowcase = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)

  const { data: certificates, isLoading, isError } = useEnrolledCertificate()
  const { mutate: downloadCertificate } = useDownloadCertificate()

  const handleDownload = (certificateId) => {
    setDownloadingId(certificateId)

    downloadCertificate(
      { certificateId },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')

          link.href = url
          link.download = 'skillnest-certificate.pdf'

          document.body.appendChild(link)
          link.click()
          link.remove()

          window.URL.revokeObjectURL(url)
        },
        onSettled: () => {
          setDownloadingId(null)
        }
      }
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-6 lg:px-8">
        <DashboardPageHeader
          title="My Certificates"
          description="View and download your SkillNest certificates."
        />

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border border-border bg-card p-2.5 shadow-sm"
            >
              <div className="aspect-video animate-pulse rounded-lg bg-page" />

              <div className="mt-3 space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-page" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-page" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-6 lg:px-8">
        <DashboardPageHeader
          title="My Certificates"
          description="View and download your SkillNest certificates."
        />

        <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 text-center shadow-sm">
          <FiAward className="mb-3 text-4xl text-error" />

          <h2 className="font-heading text-lg font-semibold text-text">
            Couldn't load your certificates
          </h2>

          <p className="mt-1 max-w-sm font-body text-sm text-text-light">
            Something went wrong while fetching your certificates. Please try
            again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-6 lg:px-8">
      <DashboardPageHeader
        title="My Certificates"
        description="View and download your SkillNest certificates."
      />

      {certificates?.length === 0 ? (
        <div className="mt-6 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <FiAward className="text-3xl text-primary" />
          </div>

          <h2 className="font-heading text-lg font-semibold text-text">
            No certificates yet
          </h2>

          <p className="mt-1 max-w-sm font-body text-sm text-text-light">
            Complete a course to earn your first SkillNest certificate.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates?.map((certificate) => (
            <div
              key={certificate?._id}
              className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card p-2.5 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* PDF PREVIEW */}
              <button
                type="button"
                onClick={() => setSelectedCertificate(certificate)}
                className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border bg-page"
              >
                <div className="pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]">
                  <CertificatePdfPreview
                    pdfUrl={certificate?.pdfUrl}
                    width={340}
                  />
                </div>

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </button>

              {/* CERTIFICATE INFO */}
              <div className="flex flex-col gap-3 pt-3">
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-base font-semibold capitalize text-text">
                    {certificate?.enrollmentId?.courseId?.title}
                  </h3>

                  <p className="mt-1 font-body text-sm text-text-light">
                    {new Date(certificate?.issueDate).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      }
                    )}
                  </p>
                </div>

                {/* DOWNLOAD */}
                <button
                  type="button"
                  disabled={downloadingId === certificate?._id}
                  onClick={() => handleDownload(certificate?._id)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaDownload className="text-sm" />

                  {downloadingId === certificate?._id
                    ? 'Downloading...'
                    : 'Download Certificate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close certificate preview"
              onClick={() => setSelectedCertificate(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg text-white shadow-md transition hover:bg-primary-light"
            >
              <FiX />
            </button>

            <div className="flex h-full w-full items-center justify-center overflow-auto bg-page p-3 sm:p-5">
              <CertificatePdfPreview
                pdfUrl={selectedCertificate?.pdfUrl}
                width={Math.min(window.innerWidth - 40, 900)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificatesShowcase

