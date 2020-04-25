import React from 'react';
import { Sync } from '../../../graphql/Schema';

interface SyncCardProps {
  sync: Sync;
}

const SyncCard: React.FC<SyncCardProps> = () => <div>Sync Card</div>;

export default SyncCard;
