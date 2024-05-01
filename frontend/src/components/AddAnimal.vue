<template>
  <div class="container" style="background-color: #f5f5f5; padding: 20px;">
    <h1 class="text-center mt-5 mb-4">Add New Animal</h1>
    <form @submit.prevent="createAnimal" class="add-animal-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" v-model="animal.name">
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select class="form-control" id="gender" v-model="animal.gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="species">Species:</label>
        <input type="text" class="form-control" id="species" v-model="animal.species">
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" class="form-control" id="age" v-model="animal.age">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea class="form-control" id="description" v-model="animal.description"></textarea>
      </div>
      <div class="form-group">
        <label for="size">Size:</label>
        <select class="form-control" id="size" v-model="animal.size">
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div class="form-group">
        <label for="putForAdoption">Put for Adoption:</label>
        <input type="checkbox" class="form-check-input" id="putForAdoption" v-model="animal.putForAdoption">
      </div>
      <div class="form-group">
        <label for="photo">Photo Link:</label>
        <input type="text" class="form-control" id="photo" v-model="animal.photo">
      </div>
      <div class="form-group">
        <label for="breed">Breed:</label>
        <input type="text" class="form-control" id="breed" v-model="animal.breed">
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      animal: {
        name: '',
        gender: 'male',
        species: '',
        age: 0,
        description: '',
        size: 'small',
        putForAdoption: false,
        photo: '',
        breed: ''
      }
    };
  },
  methods: {
    async createAnimal() {
      try {
        await axios.post('http://localhost:3000/animals', this.animal);
        // Redirect to the animals page after creating the animal
        this.$router.push('/animals');
      } catch (error) {
        console.error('Error creating animal:', error);
      }
    }
  }
};
</script>

<style scoped>
.add-animal-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
