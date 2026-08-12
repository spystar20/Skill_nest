import React from 'react'
import { FiAward, FiX } from 'react-icons/fi'

const CertificateModal = ({ pdfUrl, closeCertificate }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fadeIn_0.25s_ease-out]">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-2xl animate-[modalIn_0.35s_ease-out] sm:p-7">

        <button
          onClick={closeCertificate}
          className="absolute right-4 top-4 rounded-full p-1 text-text-light transition hover:bg-accent/10 hover:text-accent"
        >
          <FiX className="text-xl" />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <FiAward className="text-3xl text-accent" />
        </div>

        <h2 className="font-heading text-xl font-bold text-primary sm:text-2xl">
          Congratulations!
        </h2>

        <p className="mt-2 text-sm text-text-light sm:text-base">
          You have successfully completed this course.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={closeCertificate}
            className="w-full rounded-lg border border-border px-5 py-3 text-sm font-medium text-text transition hover:bg-accent/10"
          >
            Maybe Later
          </button>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            View Certificate
          </a>
        </div>

      </div>
    </div>
  )
}

export default CertificateModal