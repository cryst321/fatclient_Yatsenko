<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
      <li class="nav-item"><router-link to="/animals" class="nav-link">Our Animals</router-link></li>
      <li class="nav-item"><router-link to="/add-animal" class="nav-link">Add Animal</router-link></li>
      <li class="nav-item"><router-link to="/statistics" class="nav-link">Statistics</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>

<style scoped>
.navbar {
  padding: 30px;
  background-color: #7cb2be;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.nav-item {
  padding: 20px;
}

.nav-link {
  font-family: 'Comic Sans MS', cursive;
  font-size: 18px;
  color: #2c3e50;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #FFDDD2;
  color: #7cb2be;
  border-color: #2c3e50;
}
</style>
