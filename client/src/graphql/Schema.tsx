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

export interface Sync {
  id: number;
  cover_photo_url: string;
  description: string;
  name: string;
  public: boolean;
  owner: User;
  invited_users: User[];
  deadline?: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
}
