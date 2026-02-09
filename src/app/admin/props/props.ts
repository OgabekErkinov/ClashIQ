export interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}


//user interface
export interface IUser {
  _id : string,
  email : string,
  username : string,
  role : 'admin' | 'user' | 'super-admin',
  status : 'active' | 'blocked',
  rating : number,
  duels : number,
  wins : number,
  draw : number,
  last_active_at : Date

}

//leaderboard response
export interface LeaderBoardResponse {
  success : boolean,
  message : IUser[]
}