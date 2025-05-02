import { useNavigate } from 'react-router-dom';
import { FilePlus2, FileText } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const primaryBlue = '#1e4976'; 
  const secondaryBlue = '#e8f0f8'; 

  const options = [
    {
      title: 'Create Resume',
      description: 'Start building a new professional resume from scratch.',
      icon: <FilePlus2 className="w-10 h-10" color={primaryBlue} />,
      onClick: () => navigate('/select-template'),
    },
    {
      title: 'My Resumes',
      description: "View and download resumes you've created.",
      icon: <FileText className="w-10 h-10" color={primaryBlue} />,
      onClick: () => navigate('/my-resumes'),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-16">
      <div
        className="rounded-t-2xl px-8 pt-8 pb-4"
        style={{
          background: `linear-gradient(135deg, ${primaryBlue} 0%, #3a6ea5 100%)`,
        }}
      >
        <h1 className="text-3xl font-bold text-white">Resume Builder Dashboard</h1>
        <p className="text-white opacity-90 mt-2">
          Build professional resumes with our easy-to-use tools
        </p>
      </div>

      <div className="bg-white border border-gray-200 px-6 py-6 rounded-b-2xl space-y-4">
        {options.map((option, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg rounded-2xl bg-white border border-gray-200 overflow-hidden"
            onClick={option.onClick}
          >
            <div className="flex items-center gap-6 p-6">
              <div
                className="flex items-center justify-center rounded-full w-16 h-16 transition-colors"
                style={{ backgroundColor: secondaryBlue }}
              >
                {option.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: primaryBlue }}>
                  {option.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Choose an option above to get started with your resume
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;