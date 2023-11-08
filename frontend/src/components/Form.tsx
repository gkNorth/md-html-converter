'use client';

import { ChangeEvent, useState } from 'react';

export default function Form() {
  const [htmlValue, setHtmlValue] = useState('');
  const [mdVlaue, setMdValue] = useState('');
  const [isMdToHtml, setIsMdToHtml] = useState(false);

  const handleMdToHtml = () => {
    setIsMdToHtml((isMdToHtml) => !isMdToHtml);
  };

  const handleHtmlValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlValue(e.target.value);
  };
  const postHtmlValue = async () => {
    const reqValues = {
      htmlValue,
      isMdToHtml,
    };
    const res = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqValues),
    });
    const md = await res.text();
    setMdValue(md);
  };
  return (
    <>
      <div className="flex items-start space-x-4 mb-4">
        {/* <input
            type="text"
            placeholder="URLを入力"
            className="flex-1 p-2 border border-gray-300 rounded"
          /> */}
        <textarea
          placeholder="HTMLを貼り付け"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={htmlValue}
          onChange={(e) => handleHtmlValue(e)}
          rows={15}
        />
      </div>
      <div className="flex justify-around">
        <label className="relative inline-flex items-center cursor-pointer re">
          <span className="ml-3 text-xs font-medium text-gray-900 dark:text-gray-300 text-center">
            HTML
            <br />
            ↓
            <br />
            MD
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            defaultChecked={isMdToHtml}
            onClick={() => handleMdToHtml()}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative"></div>
          <span className="ml-3 text-xs font-medium text-gray-900 dark:text-gray-300 text-center">
            MD
            <br />
            ↓
            <br />
            HTML
          </span>
        </label>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={postHtmlValue}
        >
          変換
        </button>
      </div>
      <div className="flex items-start space-x-4 mt-4">
        <textarea
          className="flex-1 p-2 border border-gray-300 rounded"
          defaultValue={mdVlaue}
          rows={15}
        />
      </div>
    </>
  );
}
