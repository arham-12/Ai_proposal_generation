import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { FiClipboard, FiCheckCircle } from 'react-icons/fi'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const MakeProposal = () => {
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCreateProposal = async () => {
    try {
      setLoading(true)
      setCopied(false)

      const payload = {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          job_description: description,
          client_name: clientName.trim() || undefined
        })
      }

      const response = await axios.post(
        'https://isfpdpx519.execute-api.eu-north-1.amazonaws.com/lambda-invokation/generateProposalLambda',
        payload
      )

      if (response.data && response.data.proposal) {
        setProposal(response.data.proposal)
      } else {
        setProposal('Something went wrong. Proposal could not be generated.')
      }
    } catch (error) {
      console.error('Proposal generation failed:', error)
      setProposal('An error occurred while generating the proposal.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (proposal) {
      await navigator.clipboard.writeText(proposal)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 px-4 py-6 sm:py-10">
      <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-600 dark:text-blue-400 mb-6">
          Create Proposal
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Client Name (optional)
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your services or proposal details..."
            />
          </div>

          <button
            onClick={handleCreateProposal}
            disabled={loading || !description.trim()}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-200 ${
              loading || !description.trim()
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Generating...
              </div>
            ) : (
              'Create Proposal'
            )}
          </button>

          {proposal && (
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-700 relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-gray-800 dark:text-gray-100">
                  Generated Proposal
                </h3>
                <button
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <FiCheckCircle className="text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiClipboard />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                <ReactMarkdown>{proposal}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MakeProposal
