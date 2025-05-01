import React from 'react';
import { useMeQuery } from '../services/api';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import {
  FileText,
  Download,
  Eye,
  AlertCircle,
  FileIcon,
  Loader2,
} from 'lucide-react';

const MyResume = () => {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="mt-4 text-gray-500">Loading your resumes...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <AlertCircle className="w-16 h-16 text-red-500 mb-2" />
        <h2 className="text-xl font-semibold text-red-500">Failed to load resumes</h2>
        <p className="text-gray-500 mt-1">Please check your connection and try again</p>
      </div>
    );
  }

  const pdfs = data.data.pdf || [];

  const truncateUrl = (url) => {
    return url.length > 60 ? url.substring(0, 30) + '...' + url.slice(-30) : url;
  };

  const getFileName = (url, index) => {
    try {
      const pathParts = new URL(url).pathname.split('/');
      return pathParts[pathParts.length - 1] || `Resume ${index + 1}`;
    } catch {
      return `Resume ${index + 1}`;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-16 px-4">
      <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white rounded-t-2xl p-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <p className="text-white/90 mt-1">View and download your saved resume documents</p>
      </div>

      <div className="bg-white rounded-b-2xl p-6 shadow-sm">
        {pdfs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-blue-50 rounded-xl">
            <FileIcon className="w-16 h-16 text-gray-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-500">No resumes saved yet</h3>
            <p className="text-sm text-gray-400 mt-1">Create your first resume to see it here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pdfs.map((url, index) => {
              const fileName = getFileName(url, index);
              return (
                <div
                  key={index}
                  className="rounded-xl border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FileText className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium">{fileName}</h4>
                      <span className="text-sm text-gray-500">Resume {index + 1}</span>
                    </div>
                  </div>

                  <div className="my-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-xs bg-gray-100 p-2 rounded font-mono truncate cursor-default">
                            {truncateUrl(url)}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5}>
                          <span className="text-xs break-all max-w-[250px] inline-block">{url}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" /> View
                    </a>
                    <a
                      href={url}
                      download
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResume;
