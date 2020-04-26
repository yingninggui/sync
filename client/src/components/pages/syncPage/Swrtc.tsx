import React from 'react';
import { Row } from 'reactstrap';
import * as SWRTC from '@andyet/simplewebrtc';

import { currentUsername } from '../../../utils/Auth';
import SyncPage from './SyncPage';
import Spinner from '../../common/Spinner';

const API_KEY = '3276cf5e7a165e35130996ad';

const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const Swrtc: React.FC<any> = (props) => {
  const { syncID } = props.match.params;

  const username: string = currentUsername();
  return (
    <SWRTC.Provider configUrl={CONFIG_URL} userData={username}>
      {/* Render based on the connection state */}
      <SWRTC.Connecting>
        <Row style={{ justifyContent: 'center' }}>
          <Spinner />
        </Row>
      </SWRTC.Connecting>

      <SWRTC.Connected>
        {/* Request the user's media */}
        <SWRTC.RequestUserMedia audio video auto />

        {/* Enable playing remote audio. */}
        <SWRTC.RemoteAudioPlayer />

        {/* Connect to a room with a name and optional password */}
        <SWRTC.Room name={syncID}>
          <SWRTC.PeerList
            room={syncID}
            render={({ peers }) => <SyncPage {...props} peers={peers} />}
          />
        </SWRTC.Room>
      </SWRTC.Connected>
    </SWRTC.Provider>
  );
};

export default Swrtc;
