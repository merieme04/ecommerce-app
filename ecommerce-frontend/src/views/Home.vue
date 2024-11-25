<template>
    <div>
      <h1>Welcome to the E-commerce Dashboard</h1>
      <p>Select a period to view the statistics:</p>
      <select v-model="selectedPeriod" @change="changePeriod">
        <option value="7_days">Last 7 days</option>
        <option value="30_days">Last 30 days</option>
        <option value="12_months">Last 12 months</option>
      </select>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  
  export default {
    data() {
      return {
        selectedPeriod: '7_days',
      };
    },
    methods: {
      changePeriod() {
        this.$store.dispatch('changePeriod', this.selectedPeriod);
      }
    }
  };
  </script>
  