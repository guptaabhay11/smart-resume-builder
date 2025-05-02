import { useState, Suspense, ReactNode } from 'react';
import { useMeQuery } from '../services/api';
import {
  FileText,
  Download,
  Eye,
  AlertCircle,
  FileIcon,
  Loader2,
} from 'lucide-react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-2 py-1 text-xs bg-gray-900 text-white rounded shadow-lg bottom-full mb-2 left-1/2 transform -translate-x-1/2">
          <div className="break-all max-w-[250px] inline-block">{text}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

const MyResumeContent = () => {
  const { data } = useMeQuery();
  const pdfs = data?.data?.pdf || [];

  const truncateUrl = (url: string): string => {
    return url.length > 60 ? `${url.substring(0, 30)}...${url.slice(-30)}` : url;
  };

  const getFileName = (url: string, index: number): string => {
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
            {pdfs.map((url: string, index: number) => {
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
                    <Tooltip text={url}>
                      <p className="text-xs bg-gray-100 p-2 rounded font-mono truncate cursor-default">
                        {truncateUrl(url)}
                      </p>
                    </Tooltip>
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

const MyResume = () => {
  return <MyResumeContent />;
};

export default MyResume;