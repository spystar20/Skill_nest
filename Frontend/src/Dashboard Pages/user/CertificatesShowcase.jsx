
import React, { useState } from 'react'
import { FiAward } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import { useDownloadCertificate, useEnrolledCertificate } from '@/hooks/EnrollmentHooks/useEnrolledCourses'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()
const CertificatesShowcase = () => {
  const CertificatePdfPreview = ({ pdfUrl, width }) => {
  return (
    <Document
      file={pdfUrl}
      loading={
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Loading certificate...
        </div>
      }
      error={
        <div className="flex h-full items-center justify-center text-sm text-red-500">
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

const [selectedCertificate,setSelectedCertificate]=useState(null)
  const { data: certificates } = useEnrolledCertificate()
const { mutate:downloadCertificate}=useDownloadCertificate()
const handleDownload = (certificateId)=>{
  downloadCertificate({certificateId}
    ,{onSuccess:(data)=>{
const blob = new Blob([data],{type:'application/pdf'})
const url = window.URL.createObjectURL(blob)
const link = document.createElement('a')
link.href=url
link.download='skillnest-certificate.pdf'
 document.body.appendChild(link)
 link.click()
 link.remove()
 window.URL.revokeObjectURL(url)
    }}
  )
}
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

              <div onClick={()=>setSelectedCertificate(certificate)} className="h-[170px] w-full overflow-hidden rounded-lg border flex justify-center items-center border-black/20 bg-slate-100">
<div className="pointer-events-none">
  <CertificatePdfPreview
    pdfUrl={certificate?.pdfUrl}
    width={340}
  />
</div>

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

                <div
                  onClick={()=>handleDownload(certificate?._id)}
                  className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-black/20 px-3 py-2 text-sm transition hover:brightness-95 sm:w-auto"
                >
                  <FaDownload className="text-sm" />
                </div>

              </div>
 {selectedCertificate && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    onClick={() => setSelectedCertificate(null)}
  >
    <div
      className="relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedCertificate(null)}
        className="absolute right-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-lg text-white"
      >
        ×
      </button>
<div className="flex h-full w-full items-center justify-center overflow-auto bg-slate-100 p-4">
  <CertificatePdfPreview
    pdfUrl={selectedCertificate.pdfUrl}
    width={900}
  />
</div>
    </div>
  </div>
)}
            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default CertificatesShowcase

