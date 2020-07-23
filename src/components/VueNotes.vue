<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Vue Notes</h1>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note in notes" :key="note.id">
              <td>{{ note.id }}</td>
              <td>{{ note.title }}</td>
              <td>{{ note.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateNoteToEdit(note)">Edit</a> -
                <a href="#" @click.prevent="deleteNote(note.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Note ID#' + model.id : 'New Note')">
          <form @submit.prevent="saveNote">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Note</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      notes: [],
      model: {}
    }
  },
  async created () {
    this.refreshNotes()
  },
  methods: {
    async refreshNotes () {
      this.notes = await api.getNotes()
    },
    async populateNoteToEdit (note) {
      this.model = Object.assign({}, note)
    },
    async saveNote () {
      if (this.model.id) {
        await api.updateNote(this.model.id, this.model)
      } else {
        await api.createNote(this.model)
      }
      this.model = {} // reset form
      await this.refreshNotes()
    },
    async deleteNote (id) {
      if (confirm('Are you sure you want to delete this note?')) {
        // if we are editing a note we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteNote(id)
        await this.refreshNotes()
      }
    }
  }
}
</script>