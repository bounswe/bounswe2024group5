import React from 'react';

import { notification } from 'antd';
import { IconShare } from "@tabler/icons-react";

interface CopyLinkButtonProps {
  url: string;
}

export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ url }) => {
  const [api, contextHolder] = notification.useNotification();

  const handleCopyLink = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    
    api.success({
      message: 'Link Copied',
      description: 'Quiz link has been copied to clipboard!',
      placement: 'top',
      duration: 2,
    });
  };

  return (
    <>
      {contextHolder}
      <IconShare
        className="cursor-pointer text-zinc-500 hover:text-zinc-700"
        size={20}
        onClick={handleCopyLink}
      />
    </>
  );
};