import BackButton from './BackButton';
import { ReactNode } from 'react';

interface DetailLayoutProps {
  title: string;
  leftTitle: string;
  leftContent: ReactNode;
  rightTitle: string;
  rightContent: ReactNode;
}

export default function DetailLayout({
  title,
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
}: DetailLayoutProps) {
  return (


        <div className="bg-white border border-blue-300 rounded-md shadow p-4 sm:p-8 w-full max-w-full sm:max-w-[900px] min-h-[350px] sm:min-h-[450px] flex flex-col">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-start">
              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-sm sm:text-base font-semibold mb-2">{leftTitle}</h2>
                <hr className="mb-2 border-[#ededed]" />
                {leftContent}
              </div>
              <div className="w-full md:w-1/2 flex flex-col mt-4 md:mt-0">
                <h2 className="text-sm sm:text-base font-semibold mb-2">{rightTitle}</h2>
                <hr className="mb-2 border-[#ededed]" />
                {rightContent}
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-auto">
            <BackButton />
          </div>
        </div>

  );
}
