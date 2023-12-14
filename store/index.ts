import { create } from 'zustand';

export const useStore = create((set) => ({

   TimeStamp:[],

   SetTimestamp : (stamp:any) =>{
     set((state:any)=>(
      {TimeStamp:[...state.TimeStamp,stamp] } 
      ))
   },
   ResetTimeStamp: () => {
    set(() => ({
      TimeStamp: [],
    }));
  },
}));