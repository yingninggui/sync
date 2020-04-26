import React from 'react';
import { Row } from 'reactstrap';
import * as SWRTC from '@andyet/simplewebrtc';

import SyncPage from './SyncPage';
import Spinner from '../../common/Spinner';

const API_KEY = '3276cf5e7a165e35130996ad';

const ROOM_NAME = 'YOUR_ROOM_NAME';
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD';
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const Swrtc: React.FC<any> = (props) => {
  return (
    <SWRTC.Provider configUrl={CONFIG_URL}>
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
        <SWRTC.Room name={ROOM_NAME} password={ROOM_PASSWORD}>
          <SyncPage {...props} />;
        </SWRTC.Room>
      </SWRTC.Connected>
    </SWRTC.Provider>
  );
};

export default Swrtc;
