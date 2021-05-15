<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <!-- <base-button link to="/auth" v-if="!isLoggedIn"
            >Login to register as Coach</base-button
          > -->
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as Coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return !this.isLoading && this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      // return this.$store.getters['coaches/coaches'];
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    }
    // ...mapGetters('coaches', {
    //   filteredCoaches: 'coaches',
    //   hasCoaches: 'hasCoaches'
    // })
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilter = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
