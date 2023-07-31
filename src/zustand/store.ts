import create from "zustand";

// define the store
export const useVoteStore = create((set) => ({
  courses: [],
  users: [],
  
  addCourse: (course: any) => {
    set((state: any) => ({
      courses: [course, ...state.courses],
    }));
  },
  removeCourse: (courseId) => {
    set((state: any) => ({
      courses: state.courses.filter((c:any) => c.id !== courseId),
    }));
  },
  addUser: (use: any) => {
    set((state: any) => ({
      users: [use, ...state.users],
    }));
  },
  removeUser: (useId: any) => {
    set((state: any) => ({
      users: state.users.filter((c: any) => c.id !== useId),
    }));
  },
  // updateUser: (userId: any, newMessage: any) => {
  //   set((state: any) => ({
  //     users: state.users.map((user: any) =>
  //       user.id === userId ? { ...user, title: newMessage } : user
  //     ),
  //   }));
  // },
  
  updateUser: (userId:any, newData:any) => {
    set((state:any) => ({
      users: state.users.map((user:any) =>
        user.id === userId ? { ...user, title: newData } : user
      ),
    }));
  },

}));
