

<template>
  <div class="container" style="background-color: #f5f5f5; padding: 20px;">
    <h1 class="text-center mt-5 mb-4">All Animals</h1>

    <div class="filter-container mb-4" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
      <div class="form-group mr-3">
        <label for="species" style="font-family: Arial, sans-serif; font-size: 14px;">Species:</label>
        <select v-model="selectedSpecies" id="species" class="form-control" style="font-family: Arial, sans-serif;">
          <option value="">All</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>
      </div>
      <div class="form-group mr-3">
        <label for="ageMin" style="font-family: Arial, sans-serif; font-size: 14px;">Age Min:</label>
        <input v-model.number="ageMin" type="number" id="ageMin" class="form-control" style="font-family: Arial, sans-serif;">
      </div>
      <div class="form-group mr-3">
        <label for="ageMax" style="font-family: Arial, sans-serif; font-size: 14px;">Age Max:</label>
        <input v-model.number="ageMax" type="number" id="ageMax" class="form-control" style="font-family: Arial, sans-serif;">
      </div>
      <div class="form-group mr-3">
        <label for="gender" style="font-family: Arial, sans-serif; font-size: 14px;">Gender:</label>
        <select v-model="selectedGender" id="gender" class="form-control" style="font-family: Arial, sans-serif;">
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      <div class="form-group mr-3">
        <label for="size" style="font-family: Arial, sans-serif; font-size: 14px;">Size:</label>
        <select v-model="selectedSize" id="size" class="form-control" style="font-family: Arial, sans-serif;">
          <option value="">All</option>
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div class="form-group mr-3">
        <label for="putForAdoption" style="font-family: Arial, sans-serif; font-size: 14px;">Put for Adoption:</label>
        <input type="checkbox" v-model="putForAdoption" id="putForAdoption">
      </div>
      <!-- Random Animal Button -->
      <div class="form-group mr-3">
        <button @click="fetchRandomAnimal" class="btn btn-primary">Random Animal</button>
      </div>

    </div>



    <div class="row justify-content-center">
      <div class="col-md-2 mb-4" v-for="animal in filteredAnimals" :key="animal._id">
        <!-- Use router-link to navigate to AnimalPage.vue -->
        <router-link :to="{ path: '/animals/' + animal._id }" class="text-decoration-none">
          <div class="card animal-card">
            <img :src="animal.photo || 'https://i.ibb.co/XJnnNJ0/placeholder.jpg'" class="card-img-top" alt="Animal Photo" style="width: 150px; height: 150px;">
            <div class="card-body">
              <h5 class="card-title animal-name">{{ animal.name }}</h5>
              <p class="card-text animal-details">{{ animal.gender }}, {{ animal.age }} y.o.</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>




  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      animals: [],
      selectedSpecies: '',
      ageMin: 0,
      ageMax: 100,
      selectedGender: '',
      selectedSize: '',
      putForAdoption: false,
      searchQuery: ''
    };
  },
  computed: {
    filteredAnimals() {
      return this.animals.filter(animal => {
        return (
            (this.selectedSpecies === '' || animal.species === this.selectedSpecies) &&
            (this.ageMin <= animal.age && animal.age <= this.ageMax) &&
            (this.selectedGender === '' || animal.gender === this.selectedGender) &&
            (this.selectedSize === '' || animal.size === this.selectedSize) &&
            (!this.putForAdoption || animal.putForAdoption === this.putForAdoption)
        );
      });
    },
  }
  ,
  mounted() {
    this.fetchAnimals();
  },
  methods: {
    async fetchAnimals() {
      try {
        const response = await axios.get('http://localhost:3000/animals');
        this.animals = response.data;
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    },
    async searchAnimals() {
      try {
        const response = await axios.get('http://localhost:3000/animals/search', {
          params: {
            q: this.searchQuery
          }
        });
        this.filteredAnimals = response.data;
      } catch (error) {
        console.error('Error searching animals:', error);
      }
    },
    async fetchRandomAnimal() {
      try {
        const response = await axios.get('http://localhost:3000/animals/random');
        const randomAnimalId = response.data._id;
        this.$router.push({ path: `/animals/${randomAnimalId}` });
      } catch (error) {
        console.error('Error fetching random animal:', error);
      }
    }

  }
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-container .form-group {
  margin-bottom: 10px;
}

.filter-container label {
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-right: 5px;
}

.filter-container select,
.filter-container input[type="number"],
.filter-container input[type="checkbox"] {
  font-family: Arial, sans-serif;
}

.animal-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-right: 10px;
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
