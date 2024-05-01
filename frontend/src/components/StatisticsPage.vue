<template>
  <div class="container" style="background-color: #f5f5f5; padding: 20px;">
    <h1 class="text-center mt-5 mb-4">Shelter Statistics</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Animals: {{ statistics.totalAnimals }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Dogs: {{ statistics.totalDogs }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Cats: {{ statistics.totalCats }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Oldest Age: {{ statistics.oldestAge }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Adoption Percentage: {{ statistics.adoptionPercentage }}%</h6>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <canvas id="adoptionChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto'; // Change import statement to include 'auto'

export default {
  data() {
    return {
      statistics: null
    };
  },
  mounted() {
    this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        const response = await axios.get('http://localhost:3000/animals/statistics');
        this.statistics = response.data;
        this.$nextTick(() => {
          this.renderPieChart();
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }

  },
    renderPieChart() {
      if (!this.statistics) return; // Ensure statistics data is available
      const adoptionPercentage = this.statistics.adoptionPercentage;
      const ctx = document.getElementById('adoptionChart');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Adopted', 'Not Adopted'],
          datasets: [{
            label: 'Adoption Percentage',
            data: [adoptionPercentage, 100 - adoptionPercentage],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-subtitle {
  font-size: 1rem;
  margin-bottom: 5px;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


