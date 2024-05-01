<template>
  <div class="container" style="background-color: #f5f5f5; padding: 20px;">
    <h1 class="text-center mt-5 mb-4">Animal Details</h1>
    <div class="row">
      <!-- Left column for displaying animal details -->
      <div class="col-md-6">
        <div v-if="animal">
          <div class="card animal-card">
            <img :src="animal.photo || 'https://i.ibb.co/XJnnNJ0/placeholder.jpg'" class="card-img-top" alt="Animal Photo" style="width: 300px; height: 300px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title animal-name">{{ animal.name }}</h5>
              <p class="card-text animal-details">{{ animal.gender }}, {{ animal.age }} y.o.</p>
              <p class="card-text"><strong>Species:</strong> {{ animal.species }}</p>
              <p class="card-text"><strong>Breed:</strong> {{ animal.breed }}</p>
              <p class="card-text"><strong>Description:</strong> {{ animal.description }}</p>
              <p class="card-text"><strong>Size:</strong> {{ animal.size }}</p>
              <p class="card-text"><strong>Put for Adoption:</strong> {{ animal.putForAdoption ? 'Yes' : 'No' }}</p>
              <button @click="deleteAnimal" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
      <!-- Right column for updating animal details -->
      <div class="col-md-4">
        <!-- Update form -->
        <form @submit.prevent="updateAnimal">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" v-model="updateForm.name">
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <input type="text" class="form-control" id="gender" v-model="updateForm.gender">
          </div>
          <div class="form-group">
            <label for="species">Species:</label>
            <input type="text" class="form-control" id="species" v-model="updateForm.species">
          </div>
          <div class="form-group">
            <label for="breed">Breed:</label>
            <input type="text" class="form-control" id="breed" v-model="updateForm.breed">
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" class="form-control" id="age" v-model="updateForm.age">
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea class="form-control" id="description" v-model="updateForm.description"></textarea>
          </div>
          <div class="form-group">
            <label for="size">Size:</label>
            <select class="form-control" id="size" v-model="updateForm.size">
              <option value="tiny">Tiny</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="form-group">
            <label for="putForAdoption">Put for Adoption:</label>
            <select class="form-control" id="putForAdoption" v-model="updateForm.putForAdoption">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
export default {
  data() {
    return {
      animal: null,
      updateForm: {
        name: '',
        gender: '',
        // Add more properties here for updating
      }
    };
  },
  mounted() {
    this.fetchAnimal();
  },
  methods: {
    async fetchAnimal() {
      try {
        const response = await axios.get(`http://localhost:3000/animals/${this.$route.params.id}`);
        this.animal = response.data;
        // Populate updateForm with current values
        this.updateForm = {
          name: this.animal.name,
          gender: this.animal.gender,
          species: this.animal.species,
          breed: this.animal.breed,
          age: this.animal.age,
          description: this.animal.description,
          size: this.animal.size,
          putForAdoption: this.animal.putForAdoption ? 'true' : 'false'
        };
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    },
    async deleteAnimal() {
      try {
        await axios.delete(`http://localhost:3000/animals/${this.$route.params.id}`);
        // Redirect to the animals page
        this.$router.push('/animals');
      } catch (error) {
        console.error('Error deleting animal:', error);
      }
    },
    async updateAnimal() {
      try {
        await axios.put(`http://localhost:3000/animals/${this.$route.params.id}`, this.updateForm);
        // Fetch the updated animal
        this.fetchAnimal();
      } catch (error) {
        console.error('Error updating animal:', error);
      }
    }
  }
};
</script>

<style scoped>
.animal-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.animal-card:hover {
  transform: translateY(-5px);
}

.animal-name {
  font-size: 1.25rem;
}

.animal-details {
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>

