'use client';

import { ChangeEvent, useState } from 'react';
import ToggleButton from './ToggleButton';
import PostButton from './PostButton';

export default function Form() {
  const [htmlValue, setHtmlValue] = useState('');
  const [mdVlaue, setMdValue] = useState('');
  const [url, setUrl] = useState('');
  const [isMdToHtml, setIsMdToHtml] = useState(false);
  const [isUrl, setIsUrl] = useState(false);

  const handleMdToHtml = () => {
    setIsMdToHtml((isMdToHtml) => !isMdToHtml);
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleIsUrl = () => {
    setIsUrl((isMdToHtml) => !isMdToHtml);
  };

  const handleHtmlValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlValue(e.target.value);
  };

  const postUrl = async () => {
    const reqValues = {
      url,
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
      <div className="flex justify-start mb-2">
        <ToggleButton isUrl={true} value={isUrl} handler={handleIsUrl} />
      </div>
      <div className="w-full space-x-4 mb-4">
        {isUrl ? (
          <div className="mb-6">
            <input
              type="url"
              placeholder="URLを入力"
              defaultValue={url}
              onChange={(e) => handleUrl(e)}
              className="w-full flex-1 p-2 border border-gray-300 rounded mb-1"
            />
            <p className="text-sm text-gray-600">
              ※Webページからの変換の場合は、必ずHTML →
              Markdownへの変換になります
            </p>
          </div>
        ) : (
          <textarea
            placeholder={isMdToHtml ? 'Markdownを貼り付け' : 'HTMLを貼り付け'}
            className="w-full flex-1 p-2 border border-gray-300 rounded"
            value={htmlValue}
            onChange={(e) => handleHtmlValue(e)}
            rows={15}
          />
        )}
      </div>
      <div className="flex justify-around">
        {!!isUrl ? (
          <>
            <PostButton handler={postUrl} />
          </>
        ) : (
          <>
            <ToggleButton
              isUrl={false}
              value={isMdToHtml}
              handler={handleMdToHtml}
            />
            <PostButton handler={postHtmlValue} />
          </>
        )}
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
