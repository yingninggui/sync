export interface Checkpoint {
  id: number;
  name: string;
  sync_id: number;
  sync: Sync;
  users_completed: User[];
}

export interface Community {
  id: number;
  name: string;
  children: Community[];
  syncs: Sync[];
  users: User[];
}

export interface LogInResponse {
  access_token: string;
  user_id: number;
  username: string;
  swrtc_token: string;
}

export interface Sync {
  id: number;
  cover_photo_url?: string;
  description?: string;
  name: string;
  public: boolean;
  owner?: User;
  invited_users: User[];
  deadline?: string;
  checkpoints?: Checkpoint[];
}

export interface User {
  id: number;
  username: string;
  email?: string;
  friends: User[];
  communities: Community[];
}
