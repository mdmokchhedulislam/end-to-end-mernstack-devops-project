"use client"

import { useState, useEffect } from "react"

type Props = {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDeleteToast = ({ onConfirm, onCancel }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(onCancel, 200)
  }

  const handleConfirm = () => {
    setIsVisible(false)
    setTimeout(onConfirm, 200)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleCancel}
      />

      {/* Toast Container */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-red-100 shadow-2xl rounded-2xl p-6 w-80 relative overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-2xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon and Header */}
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              Are you sure you want to delete this item? This will permanently remove it from your account.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </span>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-red-300/20 to-pink-300/20 rounded-full translate-y-8 -translate-x-8" />
        </div>
      </div>
    </>
  )
}

export default ConfirmDeleteToast
