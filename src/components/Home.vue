<template>
  <div id="container" class="q-mx-auto" style="width: 80%;" >
    <div id="student-info" class="q-mx-auto q-mt-xl" style="width:90%;"   >
      <q-card>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
          <q-tab name="student-list" label="Student list" />
          <q-tab name="add-student-form" label="Add Student" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="student-list">
            <q-table bordered flat :rows="students" :columns="columns" row-key="name" color="amber">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn color="primary" icon="edit" class="q-mr-sm"
                    @click="fixed = true; openModal(props.row);" />
                  <q-btn color="negative" icon="delete" @click="deleteStudent(props.row.id)" />
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="add-student-form" style="text-align: right">
            <q-form>
              <div class="row justify-between">
                <q-input class="col q-mr-md" rounded outlined dense :label="formConfig.fields[0].label"
                  :type="formConfig.fields[0].type" v-model="add_student[formConfig.fields[0].name]" />
                <q-input class="col" rounded outlined dense :label="formConfig.fields[1].label"
                  :type="formConfig.fields[1].type" v-model="add_student[formConfig.fields[1].name]" />
              </div>
              <br>
              <q-input rounded outlined dense :label="formConfig.fields[2].label" :type="formConfig.fields[2].type"
                v-model="add_student[formConfig.fields[2].name]" />
              <br>
              <q-input rounded outlined dense :label="formConfig.fields[3].label" :type="formConfig.fields[3].type"
                v-model="add_student[formConfig.fields[3].name]" />
            </q-form>
            <q-btn class="q-mt-md" color="primary" type="submit" label="Submit" @click="addStudent()"></q-btn>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
  </div>

  <q-dialog v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Student</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 55vh; width: 20rem;" class="scroll">
        <q-form>
          <div class="q-my-sm" v-for="field in formConfig.fields" :key="field.name">
            <q-input rounded outlined dense :label="field.label" :type="field.type" :readonly="field.readonly"
              v-model="edit_student[field.name]" />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn label="Update" color="primary" @click="editStudent()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style></style>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";
import { ref } from "vue";
import { Student } from "@/types";

export default class Home extends Vue {

  tab = ref("student-list");
  fixed = ref(false);
  formConfig = require("@/jsons/formConfig.json");
  edit_student?: Student;
  add_student = {};
  columns = [
    {
      name: "reference",
      required: true,
      label: "Reference",
      align: "left",
      field: "id",
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "firstName",
      required: true,
      label: "FirstName",
      align: "left",
      field: "firstName",
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: "lastName",
      required: true,
      label: "LastName",
      align: "left",
      field: "lastName",
      format: (val: string) => `${val}`,
      sortable: true,
    },
    { name: "email", align: "center", label: "Email", field: "email", sortable: true },
    { name: "phone", align: "center", label: "Phone", field: "phone", sortable: true },
    { name: "actions", align: "center", label: "Actions" },
  ];

  get students() {
    return store.state.students;
  }

  addStudent() {
    store.commit("addStudent", this.add_student);
    this.add_student = {};
  }

  openModal(student: Student) {
    this.edit_student = student;
  }

  editStudent() {
    store.commit("editStudent", this.edit_student);
  }

  deleteStudent(id: string) {
    store.commit("deleteStudent", id);
  }
}
</script>
