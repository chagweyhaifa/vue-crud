import { createStore } from "vuex";
import { Student } from "@/types";


export default createStore({
  state: {
    students : [
      {
        id: 1700447751303,
        firstName:'Haifa',
        lastName:'Chagwey',
        email:'haifachagwey@gmail.com',
        phone:'94880003'
      }
    ] as Student[],
  },
  getters: {
    getStudents: (state) => state.students,
  },
  mutations: {
    addStudent(state, stud) {
      const student = {
        id: Date.now(),
        ...stud,
      };
      state.students.push(student);
    },

    editStudent(state, stud) {
      const foundIndex = state.students.findIndex((x) => x.id == stud.id)
      state.students[foundIndex] = stud
    },
    
    deleteStudent(state, id) {
      const index = state.students
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.students.splice(index, 1);
    },

  },
  actions: {},
  modules: {},
});
