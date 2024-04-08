import React, { useCallback, useEffect, useState } from 'react';
import { AccountConnection } from '@shopify/polaris';

interface AccountConnectionHandlerProps {
  accountTiktok: any;
  fetcher: any;
}

export const AccountConnectionHandler: React.FC<AccountConnectionHandlerProps> = ({ accountTiktok, fetcher }) => {
  const [connected, setConnected] = useState<boolean>(!!accountTiktok);
  const titleProfile = connected ? String(accountTiktok?.profile?.display_name) : 'Navi tiktok app';
  const avatarUrl = String(accountTiktok?.profile?.avatar_url);

  useEffect(() => {
    if (fetcher.data?.url) {
      window.open(fetcher.data.url, "_blank");
    }
  }, [fetcher.data]);

  const handleAction = useCallback(() => {
    if (!connected) {
      fetcher.submit({ type: 'connect' }, { method: 'post' });
    } else {
      fetcher.submit({ type: 'disconnect' }, { method: 'post' });
      setConnected(false);
    }
  }, [connected, fetcher]);

  const buttonText = connected ? 'Disconnect' : 'Connect With Tiktok';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect With Tiktok</strong>, you can connect your tiktok account to our application.
    </p>
  );

  return (
    <AccountConnection
      connected={connected}
      title={titleProfile}
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
      avatarUrl={avatarUrl}
    />
  );
};
